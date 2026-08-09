// Aggregate a huge icon set (e.g. material / fluent) into single-file bundles.
//
// npm limits tarball file count (~50000). material (65624) and fluent (118172)
// per-icon files exceed it, so we merge all per-icon modules into one index
// file per framework (vue3 / react), like react-icons does.
//
// Usage: node scripts/aggregate.js <iconSet>
//
// For <iconSet> it rewrites dist/<iconSet>/{vue3,react}:
//   es/index.js         - ESM bundle (all icons, named exports)
//   es/index.d.ts       - type declarations
//   lib/index.js        - CJS bundle (converted from ESM via esbuild)
//   index.js / index.d.ts - root CJS re-export (main entry compat)
//   async-index.*       - removed (no per-icon files to lazy-load anymore)
const fs = require('fs').promises
const path = require('path')
const execa = require('execa')

const projectDir = path.resolve(__dirname, '..')

// files whose names don't correspond to an icon component
const SKIP = new Set(['index.js', 'async-index.js'])

// esbuild is a transitive dep of vite (not linked into this package's bin),
// so locate its CLI inside the pnpm virtual store by walking up from projectDir.
async function resolveEsbuildBin() {
  let dir = projectDir
  for (;;) {
    const pnpmDir = path.join(dir, 'node_modules', '.pnpm')
    try {
      const entries = (await fs.readdir(pnpmDir)).filter((e) =>
        e.startsWith('esbuild@')
      )
      if (entries.length) {
        return path.join(
          pnpmDir,
          entries[0],
          'node_modules',
          'esbuild',
          'bin',
          'esbuild'
        )
      }
    } catch (e) {
      // node_modules/.pnpm not present at this level
    }
    const parent = path.dirname(dir)
    if (parent === dir) return null
    dir = parent
  }
}

async function readIconFiles(esDir) {
  const files = (await fs.readdir(esDir)).filter(
    (f) => f.endsWith('.js') && !SKIP.has(f)
  )
  files.sort()
  return files
}

// Collect all `import ... from 'x'` lines across files and merge them.
// Handles both `import { a, b } from 'x'` and `import * as NS from 'x'`.
function collectImports(srcs) {
  const nsByFrom = new Map() // from -> Set(alias)
  const namedByFrom = new Map() // from -> Set(symbol)
  for (const src of srcs) {
    const ns = src.match(/^import \* as ([^ ]+) from '([^']+)'\n?/)
    if (ns) {
      if (!nsByFrom.has(ns[2])) nsByFrom.set(ns[2], new Set())
      nsByFrom.get(ns[2]).add(ns[1])
      continue
    }
    const m = src.match(/^import \{ ([^}]+) \} from '([^']+)'\n?/)
    if (!m) continue
    if (!namedByFrom.has(m[2])) namedByFrom.set(m[2], new Set())
    m[1]
      .split(',')
      .map((s) => s.trim())
      .forEach((s) => namedByFrom.get(m[2]).add(s))
  }
  const lines = []
  for (const [from, aliases] of nsByFrom) {
    // multiple namespace aliases from the same module are distinct imports
    for (const alias of aliases) lines.push(`import * as ${alias} from '${from}'`)
  }
  for (const [from, syms] of namedByFrom) {
    lines.push(`import { ${[...syms].join(', ')} } from '${from}'`)
  }
  return lines.join('\n')
}

function stripImport(src) {
  return src
    .replace(/^import \* as [^ ]+ from '[^']+'\n?/, '')
    .replace(/^import \{ [^}]+ \} from '[^']+'\n?/, '')
}

// vue3: rename per-file _hoisted_N so they don't collide after merge.
// Note: `export default` appears after the _hoisted_ decls, not at line start.
function vue3Body(src, name) {
  return stripImport(src)
    .replace(/_hoisted_(\d+)/g, `${name}__hoisted_$1`)
    .replace(/export default /, `const ${name} = `)
}

// react: each file is `export default React.forwardRef(function X(...) {...})`
function reactBody(src, name) {
  return stripImport(src).replace(/export default /, `const ${name} = `)
}

async function aggregateFramework(set, framework) {
  const dir = path.resolve(projectDir, 'dist', set, framework)
  const esDir = path.join(dir, 'es')
  const libDir = path.join(dir, 'lib')

  const files = await readIconFiles(esDir)
  const names = files.map((f) => f.slice(0, -3))
  console.log(
    `${set}/${framework}: aggregating ${names.length} icons`
  )

  // already aggregated (re-run) -> keep existing bundle, nothing to do
  if (names.length === 0) {
    console.log(`${set}/${framework}: already aggregated, skipping`)
    return
  }

  const bodyFn = framework === 'vue3' ? vue3Body : reactBody
  const rawSrcs = []
  for (const f of files) {
    rawSrcs.push(await fs.readFile(path.join(esDir, f), 'utf8'))
  }

  // collect imports from RAW sources (before stripImport removes them)
  const importLine = collectImports(rawSrcs)
  const parts = rawSrcs.map((src, i) => bodyFn(src, names[i]))

  // 1. es/index.js (ESM bundle)
  const esBundle = [importLine, ...parts, `export { ${names.join(', ')} }`].join(
    '\n'
  )
  await fs.writeFile(path.join(esDir, 'index.js'), esBundle)

  // 2. es/index.d.ts
  const dts = []
  for (const name of names) {
    const d = await fs.readFile(path.join(esDir, `${name}.d.ts`), 'utf8')
    const m = d.match(/declare const _default: (.+);/)
    if (!m) throw new Error(`cannot parse d.ts for ${set}/${framework}/${name}`)
    dts.push(`export declare const ${name}: ${m[1]};`)
  }
  await fs.writeFile(path.join(esDir, 'index.d.ts'), dts.join('\n') + '\n')

  // 3. lib/index.js (CJS) via esbuild
  const esbuildBin = await resolveEsbuildBin()
  if (!esbuildBin) throw new Error('esbuild not found in pnpm store')
  await execa(
    esbuildBin,
    [
      path.join(esDir, 'index.js'),
      '--format=cjs',
      `--outfile=${path.join(libDir, 'index.js')}`
    ],
    { cwd: projectDir }
  )

  // 4. remove per-icon files from es/, lib/ and root (root = copy of lib)
  for (const f of files) {
    const base = f.replace(/\.js$/, '')
    await fs.unlink(path.join(esDir, f))
    await fs.unlink(path.join(esDir, `${base}.d.ts`))
    await fs.unlink(path.join(libDir, f))
    await fs.unlink(path.join(libDir, `${base}.d.ts`))
    await fs.unlink(path.join(dir, f)).catch(() => {})
    await fs.unlink(path.join(dir, `${base}.d.ts`)).catch(() => {})
  }

  // 5. remove async-index (no per-icon files to lazy-load)
  for (const sub of [dir, esDir, libDir]) {
    for (const suffix of ['async-index.js', 'async-index.d.ts']) {
      await fs.unlink(path.join(sub, suffix)).catch(() => {})
    }
  }

  // 6. root CJS entry (compat with other packages: main resolves to lib)
  await fs.copyFile(path.join(libDir, 'index.js'), path.join(dir, 'index.js'))
  await fs.copyFile(
    path.join(libDir, 'index.d.ts'),
    path.join(dir, 'index.d.ts')
  )

  // 7. report
  const remaining = (await fs.readdir(dir)).length
  const esRemaining = (await fs.readdir(esDir)).length
  const libRemaining = (await fs.readdir(libDir)).length
  console.log(
    `${set}/${framework}: done -> root ${remaining} files, es ${esRemaining}, lib ${libRemaining}`
  )
}

async function main() {
  const set = process.argv[2]
  if (!set) {
    console.error('usage: node scripts/aggregate.js <iconSet>')
    process.exit(1)
  }
  for (const framework of ['vue3', 'react']) {
    await aggregateFramework(set, framework)
  }
  console.log(`aggregate ${set} finished`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

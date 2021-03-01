// make sure vue template compiler do not throw error
try {
  require('vue').version = null
} catch {}

// only build vue3 esm
const FOR_SITE = process.argv[2] === '--for-site'

const fs = require('fs').promises
const fse = require('fs-extra')
const execa = require('execa')
const v2s = require('v2s')
const path = require('path')
const config = require('./config')
const {
  createSvgSanitizer
} = require('./utils')

const projectDir = path.resolve(__dirname, '..')

async function traverse (basePath, cb, depth = 0) {
  const files = await fs.opendir(basePath)
  for await (const file of files) {
    const maybeFilePath = path.resolve(basePath, file.name)
    if (file.isDirectory()) {
      await traverse(maybeFilePath, cb, depth + 1)
    } if (file.isFile()) {
      await cb(file.name, maybeFilePath, depth)
    }
  }
}

;(async () => {
  await fs.mkdir(path.resolve(__dirname, '..', 'dist'))
  for (const { name: iconSetName, src, normalizeName, filter } of config) {
    const svgPath = path.resolve(__dirname, '..', 'resources', iconSetName, src)
    const outPath = path.resolve(__dirname, '..', 'dist', iconSetName)
    if (!(await fs.stat(outPath).catch(() => false))) {
      await fs.mkdir(outPath)
    }
    console.log(`${iconSetName}`)
    console.log(`${iconSetName}.svgPath: ${svgPath}`)
    const icons = []
    await traverse(svgPath, async (name, filePath, depth) => {
      // depth starts from 0
      const dir = path.dirname(filePath)
      const baseName = name.replace('.svg', '')
      if (filter && !filter({ depth, name: baseName, dir })) return
      if (name.endsWith('.svg')) {
        const normalizedName = normalizeName(
          baseName,
          dir
        )
        const svgSanitizer = createSvgSanitizer(
          (await fs.readFile(filePath) ).toString()
        )
        svgSanitizer
          .removeComment()
          .removeUselessTags()
          .removeAttr('id')
          .removeSvgAttr('width', 'height')
          .refill()

        icons.push({
          name: normalizedName,
          svg: svgSanitizer.svg(),
          reactSvg: svgSanitizer.reactSvg()
        })
      }
    })
    icons.sort((v1, v2) => {
      if (v1.name < v2.name) return -1
      if (v1.name > v2.name) return 1
      return 0
    })
    const iconNames = icons.map(v => v.name)
    // generate snapshot
    const snapshot = iconNames.join('\n') + '\n'
    await fs.writeFile(
      path.resolve(__dirname, '..', 'snapshots', `${iconSetName}.snap.txt`),
      snapshot
    )
    
    if (FOR_SITE) {
      await generateVue3(icons, iconNames, outPath)
    } else {
      await generateSvg(icons, outPath)
      await generateVue2(icons, iconNames, outPath)
      await generateVue3(icons, iconNames, outPath)
      await generateReact(icons, iconNames, outPath)    
    }
  }
})()

async function generateIndex (names, indexExt, componentExt, outPath) {
  const exportStmts = names.map(n => `export { default as ${n} } from './${n}${componentExt}'`).join('\n') + '\n'
  await fs.writeFile(
    path.resolve(outPath, `index${indexExt}`),
    exportStmts
  )
}

async function generateAsyncIndex (names, indexExt, componentExt, outPath) {
  const asyncExportStmts = names.map(n => `export const ${n} = () => import('./${n}${componentExt}')`).join('\n') + '\n'
  await fs.writeFile(
    path.resolve(outPath, `async-index${indexExt}`),
    asyncExportStmts
  )
}

async function tsc (config, outPath) {
  const tsConfigPath = path.resolve(outPath, 'tsconfig.json')
  await fse.writeFile(
    tsConfigPath,
    JSON.stringify(config, 0, 2)
  )
  const { stdout, stderr } = await execa('npx', [
    'tsc', '-p', tsConfigPath
  ], {
    cwd: projectDir
  })
  console.log(stdout)
  if (stderr) {
    console.error(stderr)
  }
  await fse.unlink(tsConfigPath)
}

// svg
async function generateSvg (icons, basePath) {
  console.log('make svg')
  // create svg
  const outPath = path.resolve(basePath, 'svg')
  await fs.mkdir(outPath)
  // svg
  for (const { name, svg } of icons) {
    await fs.writeFile(
      path.resolve(outPath, `${name}.svg`),
      svg
    )
  }
}

// tsx => js + d.ts
// index + async-index
// +devDeps @types/react
async function generateReact (icons, names, basePath) {
  console.log('make react')
  console.log('  make .tsx')
  // create _react
  const tempPath = path.resolve(basePath, '_react')
  await fs.mkdir(tempPath)
  // generate .tsx
  for (const { name, reactSvg } of icons) {
    await fs.writeFile(
      path.resolve(tempPath, `${name}.tsx`),
      `import * as React from 'react'\n\n` +
      `export default React.forwardRef<SVGSVGElement, React.SVGProps<SVGElement>>(function ${name} (props, ref) {\n` +
      '  return (\n' +
      reactSvg.replace(/(<svg[^>]*)(>)/, '$1 {...props} ref={ref} $2') +
      '  )\n' +
      '})\n'
    )
  }
  // generate index.ts
  await generateIndex(names, '.ts', '', tempPath)
  // gererate async-index.ts
  await generateAsyncIndex(names, '.ts', '', tempPath)
  // tsc to react
  console.log('  tsc to react (cjs)')
  const compilerOptionsBase = {
    forceConsistentCasingInFileNames: true,
    jsx: 'react',
    moduleResolution: 'node',
    target: 'ES6',
    lib: ['ESNext', 'DOM'],
    declaration: true
  }
  await tsc({
    include: ['_react/**/*'],
    compilerOptions: {
      ...compilerOptionsBase,
      outDir: 'react/lib',
      module: 'CommonJS'
    }
  }, basePath)
  console.log('  copy cjs output to root')
  const cjsDir = await fse.readdir(
    path.resolve(basePath, 'react/lib')
  )
  for (const file of cjsDir) {
    await fse.copy(
      path.resolve(basePath, 'react/lib', file),
      path.resolve(basePath, 'react', file)
    )
  }
  console.log('  tsc to react (esm)')
  await tsc({
    include: ['_react/**/*'],
    compilerOptions: {
      ...compilerOptionsBase,
      outDir: 'react/es',
      module: 'ESNext'
    }
  }, basePath)
  console.log('  remove _react')
  await fse.remove(tempPath)
}

// vue => ts => js + d.ts
// index + async-index
// TODO: SSR?
async function generateVue3 (icons, names, basePath) {
  console.log('make vue3')
  console.log(' make .vue')
  // create _vue3
  const tempPath = path.resolve(basePath, '_vue3')
  await fse.mkdir(tempPath)
  // generate .vue (lang = ts)
  for (const { name, svg } of icons) {
    await fse.writeFile(
      path.resolve(tempPath, `${name}.vue`),
      '<template>\n' +
      svg + '\n' +
      '</template>\n' +
      '<script lang="ts">\n' +
      `import { defineComponent } from 'vue'\n` +
      'export default defineComponent({\n' +
      `  name: '${name}'\n` +
      '})\n' +
      '</script>'
    )
  }
  // generate index.ts
  await generateIndex(names, '.ts', '.vue', tempPath)
  // generate async-index.ts
  await generateAsyncIndex(names, '.ts', '.vue', tempPath)
  // v2s
  console.log('  transform to .ts')
  const dir = await fse.readdir(tempPath)
  const paths = dir.map(fileName => path.resolve(tempPath, fileName))
  await v2s(paths, {
    deleteSource: true,
    refactorVueImport: true
  })
  const compilerOptionsBase = {
    forceConsistentCasingInFileNames: true,
    moduleResolution: 'node',
    target: 'ES6',
    lib: ['ESNext', 'DOM'],
    types: [], // ignore @types/react, which causes error
    declaration: true
  }
  // tsc to vue3
  if (!FOR_SITE) {
    console.log('  tsc to vue3 (cjs)')
    await tsc({
      include: ['_vue3/**/*'],
      compilerOptions: {
        ...compilerOptionsBase,
        outDir: 'vue3/lib',
        module: 'CommonJS'
      }
    }, basePath)
    console.log('  copy cjs output to root')
    const cjsDir = await fse.readdir(
      path.resolve(basePath, 'vue3/lib')
    )
    for (const file of cjsDir) {
      await fse.copy(
        path.resolve(basePath, 'vue3/lib', file),
        path.resolve(basePath, 'vue3', file)
      )
    }
  }
  console.log('  tsc to vue3 (esm)')
  await tsc({
    include: ['_vue3/**/*'],
    compilerOptions: {
      ...compilerOptionsBase,
      outDir: 'vue3/es',
      module: 'ESNext'
    }
  }, basePath)
  // remove _vue3
  console.log('  remove _vue3')
  await fse.remove(tempPath)
}

// vue => js
// index + async-index
async function generateVue2 (icons, names, basePath) {
  console.log('make vue2')
  console.log(' make .vue')
  // create _vue3
  const tempPath = path.resolve(basePath, '_vue2')
  await fse.mkdir(tempPath)
  // generate .vue (lang = js, vue2)
  for (const { name, svg } of icons) {
    await fse.writeFile(
      path.resolve(tempPath, `${name}.vue`),
      '<template>\n' +
      svg + '\n' +
      '</template>\n' +
      '<script>\n' +
      'export default {\n' +
      `  name: '${name}'\n` +
      '}\n' +
      '</script>'
    )
  }
  // generate index.js
  await generateIndex(names, '.js', '.vue', tempPath)
  // generate async-index.js
  await generateAsyncIndex(names, '.js', '.vue', tempPath)
  // v2s
  console.log('  transform .vue to .js')
  const dir = await fse.readdir(tempPath)
  const paths = dir.map(fileName => path.resolve(tempPath, fileName))
  await v2s(paths, {
    deleteSource: true,
    refactorVueImport: true,
    vue2: true
  })
  const compilerOptionsBase = {
    forceConsistentCasingInFileNames: true,
    moduleResolution: 'node',
    target: 'ES6',
    lib: ['ESNext', 'DOM'],
    allowJs: true,
    checkJs: false
  }
  console.log('  tsc to vue2 (cjs)')
  await tsc({
    include: ['_vue2/**/*'],
    compilerOptions: {
      ...compilerOptionsBase,
      outDir: 'vue2/lib',
      module: 'CommonJS'
    }
  }, basePath)
  console.log('  copy cjs output to root')
  const cjsDir = await fse.readdir(
    path.resolve(basePath, 'vue2/lib')
  )
  for (const file of cjsDir) {
    await fse.copy(
      path.resolve(basePath, 'vue2/lib', file),
      path.resolve(basePath, 'vue2', file)
    )
  }
  console.log('  tsc to vue2 (esm)')
  await tsc({
    include: ['_vue2/**/*'],
    compilerOptions: {
      ...compilerOptionsBase,
      outDir: 'vue2/es',
      module: 'ESNext'
    }
  }, basePath)
  // remove _vue2
  console.log('  remove _vue2')
  await fse.remove(tempPath)
}


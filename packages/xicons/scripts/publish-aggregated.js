// Publish the aggregated (single-file bundle) packages that npm refuses as
// per-icon files (file count > ~50000): material & fluent for vue3/react.
//
// Generates package.json + README (mirroring release.js metadata) and runs
// `npm publish` for each of the 4 packages.
//
// Usage: node scripts/publish-aggregated.js
const path = require('path')
const fse = require('fs-extra')
const execa = require('execa')
const { version } = require('../version')

const projectDir = path.resolve(__dirname, '..')

const packages = [
  {
    set: 'material',
    framework: 'vue3',
    name: '@nicons/material',
    description:
      'Vue3 SVG icon components integrated from [`material-design-icons`](https://github.com/google/material-design-icons)',
    license: 'Apache 2.0',
    keywords: ['icon', 'vue-next', 'vue', 'svg', 'material']
  },
  {
    set: 'material',
    framework: 'react',
    name: '@nicons/material-react',
    description:
      'React SVG icon components integrated from [`material-design-icons`](https://github.com/google/material-design-icons)',
    license: 'Apache 2.0',
    keywords: ['icon', 'react', 'svg', 'material']
  },
  {
    set: 'fluent',
    framework: 'vue3',
    name: '@nicons/fluent',
    description:
      'Vue3 SVG icon components integrated from [`fluentui-system-icons`](https://github.com/microsoft/fluentui-system-icons)',
    license: 'MIT',
    keywords: ['icon', 'vue-next', 'vue', 'svg', 'fluent']
  },
  {
    set: 'fluent',
    framework: 'react',
    name: '@nicons/fluent-react',
    description:
      'React SVG icon components integrated from [`fluentui-system-icons`](https://github.com/microsoft/fluentui-system-icons)',
    license: 'MIT',
    keywords: ['icon', 'react', 'svg', 'fluent']
  }
]

const metaTemplate = {
  repository: {
    type: 'git',
    url: 'https://github.com/n1anchen/xicons.git'
  },
  author: 'n1anchen',
  dependencies: {},
  sideEffects: false,
  main: 'lib/index.js',
  module: 'es/index.js',
  types: 'es/index.d.ts'
}

;(async () => {
  for (const p of packages) {
    const dir = path.resolve(projectDir, 'dist', p.set, p.framework)
    const meta = JSON.stringify(
      {
        name: p.name,
        version,
        description: p.description,
        ...metaTemplate,
        license: p.license,
        keywords: p.keywords
      },
      0,
      2
    )
    await fse.writeFile(path.resolve(dir, 'package.json'), meta)
    await fse.writeFile(
      path.resolve(dir, 'README.md'),
      `# ${p.name}\n\n` +
        p.description +
        '\n\n' +
        'A part of [`xicons`](https://github.com/n1anchen/xicons) project.'
    )
    console.log('publishing:', p.name)
    try {
      const result = await execa('npm', ['publish', '--access=public'], {
        cwd: dir
      })
      const summary = result.stdout
        .split('\n')
        .filter(
          (l) => l.startsWith('+ @nicons/') || l.toLowerCase().includes('error')
        )
        .join('\n')
      console.log(summary || 'published OK')
    } catch (e) {
      console.log('FAILED:', e.message.split('\n').slice(0, 6).join('\n'))
    }
  }
})()

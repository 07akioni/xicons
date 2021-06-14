const path = require('path')
const fse = require('fs-extra')
const execa = require('execa')
const config = require('./config')
const { repository } = require('../package.json')
const { version } = require('../version')

const frameworks = [
  {
    dir: 'react',
    scope: 'ricons',
    descriptionPrefix: 'React SVG icon components',
    keywords: ['react', 'svg']
  },
  {
    dir: 'vue3',
    scope: 'vicons',
    descriptionPrefix: 'Vue3 SVG icon components',
    keywords: ['vue-next', 'vue', 'svg']
  },
  {
    dir: 'vue2',
    scope: 'v2icons',
    descriptionPrefix: 'Vue2 SVG icon components',
    keywords: ['vue', 'svg']
  },
  {
    dir: 'SVG',
    scope: 'sicons',
    descriptionPrefix: 'SVG icons',
    keywords: ['svg']
  }
]

const metaTemplate = {
  keywords: ['icon'],
  author: '07akioni',
  license: 'MIT',
  dependencies: {},
  sideEffects: false,
  main: 'lib/index.js',
  module: 'es/index.js',
  types: 'es/index.d.ts'
}

;(async () => {
  for (const iconSetConfig of config) {
    for (const {
      dir: frameworkDir,
      scope,
      descriptionPrefix,
      keywords
    } of frameworks) {
      const scopedPackageName = `@${scope}/${iconSetConfig.name}`
      const scopedPackagePath = path.resolve(
        __dirname,
        '..',
        'dist',
        iconSetConfig.name,
        frameworkDir
      )
      const description = iconSetConfig.description(descriptionPrefix)
      const meta = JSON.stringify(
        {
          name: scopedPackageName,
          version,
          description,
          repository,
          ...metaTemplate,
          keywords: metaTemplate.keywords
            .concat(keywords)
            .concat(iconSetConfig.keywords)
        },
        0,
        2
      )

      if (frameworkDir === 'vue2') {
        delete meta.types
      }

      if (frameworkDir === 'SVG') {
        delete meta.types
        delete meta.main
        delete meta.module
        delete meta.sideEffects
      }

      await fse.writeFile(path.resolve(scopedPackagePath, 'package.json'), meta)
      await fse.writeFile(
        path.resolve(scopedPackagePath, 'README.md'),
        `# ${scopedPackageName}\n\n` +
          description +
          '\n\n' +
          'A part of [`xicons`](https://github.com/07akioni/xicons) project.'
      )
      console.log('release:', scopedPackageName)
      try {
        const result = await execa('npm', ['publish', '--access=public'], {
          cwd: scopedPackagePath
        })
        console.log(result.stdout)
      } catch (error) {
        console.log(error)
      }
    }
  }
})()

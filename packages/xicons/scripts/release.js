const path = require('path')
const fse = require('fs-extra')
const execa = require('execa')
const config = require('./config')
const { repository } = require('../package.json')
const { version } = require('../version')

// All packages are published under the @nicons scope (npm org owned by
// n1anchen). The framework is encoded in the package name suffix; vue3 keeps
// the plain package name.
const frameworks = [
  {
    dir: 'react',
    scope: 'nicons',
    packageSuffix: '-react',
    descriptionPrefix: 'React SVG icon components',
    keywords: ['react', 'svg']
  },
  {
    dir: 'vue3',
    scope: 'nicons',
    packageSuffix: '',
    descriptionPrefix: 'Vue3 SVG icon components',
    keywords: ['vue-next', 'vue', 'svg']
  },
  {
    dir: 'vue2',
    scope: 'nicons',
    packageSuffix: '-vue2',
    descriptionPrefix: 'Vue2 SVG icon components',
    keywords: ['vue', 'svg']
  },
  {
    dir: 'SVG',
    scope: 'nicons',
    packageSuffix: '-svg',
    descriptionPrefix: 'SVG icons',
    keywords: ['svg']
  }
]

const metaTemplate = {
  keywords: ['icon'],
  author: 'n1anchen',
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
      packageSuffix,
      descriptionPrefix,
      keywords
    } of frameworks) {
      const scopedPackageName = `@${scope}/${iconSetConfig.name}${packageSuffix}`
      const scopedPackagePath = path.resolve(
        __dirname,
        '..',
        'dist',
        iconSetConfig.name,
        frameworkDir
      )
      const description = iconSetConfig.description(descriptionPrefix)
      const { iconify } = iconSetConfig
      if (iconify && !iconify.info.license.title) {
        throw Error('No license in iconify')
      }
      const meta = JSON.stringify(
        {
          name: scopedPackageName,
          version,
          description,
          repository,
          ...metaTemplate,
          license: iconify ? iconify.info.license.title : metaTemplate.license,
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
          'A part of [`xicons`](https://github.com/n1anchen/xicons) project.'
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

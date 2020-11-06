const path = require('path')
const fs = require('fs')
const execa = require('execa')
const config = require('./config')
const { name, version } = require('../package.json')

const metaTemplate = {
  "description": "SVG Vue components integrated from [`fluentui-system-icons`](https://github.com/microsoft/fluentui-system-icons) and [`ionicons`](https://github.com/ionic-team/ionicons).",
  "keywords": [
    "vue",
    "svg",
    "icon"
  ],
  "module": "index.esm.js",
  "main": "index.cjs.js",
  "author": "07akioni",
  "license": "MIT",
  "dependencies": {
    "vue": "^3.0.2"
  }
}


;(async () => {
  for (const iconSetConfig of config) {
    const scopedPackageName = `@${name}/${iconSetConfig.name}`
    const scopedPackagePath = path.resolve(__dirname, '..', iconSetConfig.name)
    const meta = JSON.stringify({
      name: scopedPackageName,
      version,
      ...metaTemplate
    }, 0, 2)
    fs.writeFileSync(path.resolve(scopedPackagePath, 'package.json'), meta)
    console.log('release:', scopedPackageName)
    try {
      const result = await execa('npm', [
        'publish',
        '--access=public'
      ], {
        cwd: scopedPackagePath
      })
      console.log(result.stdout)
    } catch (error) {
      console.log(error)
    }
  }
})()

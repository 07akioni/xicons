const path = require('path')
const fs = require('fs')
const execa = require('execa')
const config = require('./config')
const { name, version, repository } = require('../package.json')

const metaTemplate = {
  "keywords": [
    "vue",
    "svg",
    "icon"
  ],
  "files": [
    "react",
    "vue2",
    "vue3",
    "svg"
  ],
  "author": "07akioni",
  "license": "MIT",
  "dependencies": {},
  "sideEffects": false
}

;(async () => {
  for (const iconSetConfig of config) {
    const scopedPackageName = `@${name}/${iconSetConfig.name}`
    const scopedPackagePath = path.resolve(__dirname, '..', 'dist', iconSetConfig.name)
    const meta = JSON.stringify({
      name: scopedPackageName,
      version,
      description: iconSetConfig.description,
      repository,
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

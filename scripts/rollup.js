const fs = require('fs').promises
const path = require('path')
const rollup = require('rollup')
const vuePlugin = require('rollup-plugin-vue')()

const config = require('./config')

async function build () {
  for (const { name } of config) {
    const baseDir = path.resolve(__dirname, '..', name)
    const files = await fs.readdir(baseDir)
    for (const file of files) {
      if (file.endsWith('.vue')) {
        console.log(file)
        const bundle = await rollup.rollup({
          input: path.resolve(baseDir, file),
          plugins: [
            vuePlugin
          ],
          external: [
            'vue'
          ]
        })
        await bundle.write({
          file: path.resolve(baseDir, file.replace('.vue', '.js'))
        })
      }
    }
  }
}

build()
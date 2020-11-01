const vuePlugin = require('rollup-plugin-vue')

module.exports = {
  input: 'fluent/index.js',
  output: {
    format: 'esm',
    dir: 'es'
  },
  plugins: [
    vuePlugin()
  ]
}
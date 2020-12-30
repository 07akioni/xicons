const { camelCase, upperFirst } = require("lodash")

module.exports = [
  {
    name: 'fluent',
    src: 'assets',
    description: 'SVG Vue/React components integrated from [`fluentui-system-icons`](https://github.com/microsoft/fluentui-system-icons)',
    normalizeName: name => {
      return upperFirst(camelCase(name.replace('ic_fluent_', '')))
    },
    filter: info => {
      const { depth } = info
      if (depth === 2) return true
      return false
    }
  },
  {
    name: 'ionicons5',
    src: 'src/svg',
    description: 'SVG Vue/React components integrated from [`ionicons5`](https://ionicons.com/)',
    normalizeName: name => {
      return upperFirst(camelCase(name))
    }
  },
  {
    name: 'ionicons4',
    src: 'src/svg',
    description: 'SVG Vue/React components integrated from [`ionicons4`](https://ionicons.com/v4/)',
    normalizeName: name => {
      return upperFirst(camelCase(name))
    }
  }
]
const { camelCase } = require("lodash")

module.exports = [
  {
    name: 'fluent',
    src: 'assets',
    normalizeName: name => {
      return camelCase(name.replace('ic_fluent_', ''))
    },
    filter: info => {
      const { depth } = info
      if (depth === 2) return true
      return false
    }
  },
  {
    name: 'ionicons-v5',
    src: 'src/svg',
    normalizeName: name => {
      return camelCase(name)
    }
  },
  {
    name: 'ionicons-v4',
    src: 'src/svg',
    normalizeName: name => {
      return camelCase(name)
    }
  }
]
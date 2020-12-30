const { camelCase, upperFirst } = require("lodash")

module.exports = [
  {
    name: 'fluent',
    src: 'assets',
    description: (prefix) => `${prefix} integrated from [\`fluentui-system-icons\`](https://github.com/microsoft/fluentui-system-icons)`,
    normalizeName: name => {
      return upperFirst(camelCase(name.replace('ic_fluent_', '')))
    },
    filter: info => {
      const { depth } = info
      if (depth === 2) return true
      return false
    },
    keywords: ['fluent']
  },
  {
    name: 'ionicons5',
    src: 'src/svg',
    description: (prefix) => `${prefix} integrated from [\`ionicons5\`](https://ionicons.com/)`,
    normalizeName: name => {
      return upperFirst(camelCase(name))
    },
    keywords: ['ionicons', 'ionicons5']
  },
  {
    name: 'ionicons4',
    src: 'src/svg',
    description: (prefix) => `${prefix} integrated from [\`ionicons4\`](https://ionicons.com/v4/)`,
    normalizeName: name => {
      return upperFirst(camelCase(name))
    },
    keywords: ['ionicons', 'ionicon4']
  }
]
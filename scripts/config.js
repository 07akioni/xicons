const { camelCase, upperFirst } = require("lodash")

module.exports = [
  {
    name: 'material',
    src: 'src',
    description: (prefix) => `${prefix} integrated from [\`material-design-icons\`](https://github.com/google/material-design-icons)`,
    normalizeName: (name, dir) => {
      let type
      if (dir.endsWith('materialicons')) {
        type = 'Filled'
      } else if (dir.endsWith('materialiconsoutlined')) {
        type = 'Outlined'
      } else if (dir.endsWith('materialiconsround')) {
        type = 'Round'
      } else if (dir.endsWith('materialiconssharp')) {
        type = 'Sharp'
      } else {
        throw Error('invalid path for material icons', name, dir)
      }
      const size = name.match(/^\d+/)[0]
      const iconName = dir.match(/\/([^/]+)\/[^/]+$/)[1]
      const normalizedName = upperFirst(camelCase(iconName + size + type))
      return /^\d/.test(normalizedName) ? 'Md' + normalizedName : normalizedName
    },
    filter: ({ name, dir }) => {
      // corner case
      // material icons have duplicate icons for
      // - resources/material/src/action/addchart
      // - resources/material/src/editor/add_chart
      // just ignore the later one since it lacks different types
      if (dir.includes('/add_chart/')) return false
      if (dir.endsWith('/materialiconstwotone')) return false
      return true
    },
    keywords: ['material']
  },
  {
    name: 'antd',
    src: 'packages/icons-svg/svg',
    description: (prefix) => `${prefix} integrated from [\`ant-design-icons\`](https://github.com/ant-design/ant-design-icons)`,
    normalizeName: (name, dir) => {
      if (dir.endsWith('/filled')) {
        return upperFirst(camelCase(name + 'Filled'))
      }
      if (dir.endsWith('/outlined')) {
        return upperFirst(camelCase(name + 'Outlined'))
      }
      throw Error('invalid path for antd icons')
    },
    filter: ({ dir }) => {
      if (dir.endsWith('/twotone')) return false
      return true
    },
    keywords: ['antd']
  },
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
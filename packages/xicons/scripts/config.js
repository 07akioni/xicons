const { camelCase, upperFirst } = require('lodash')
const { locate } = require('@iconify/json')

module.exports = [
  {
    name: 'fa',
    description: (prefix) =>
      `${prefix} integrated from [\`font-awesome\`](https://github.com/FortAwesome/Font-Awesome)`,
    normalizeName: (name) => {
      const normalizedName = upperFirst(camelCase(name))
      if (/^\d/.test(normalizedName)) return 'Fa' + normalizedName
      return normalizedName
    },
    iconify: (() => {
      function appendSize(iconify) {
        const { icons, width, height } = iconify
        Object.keys(icons).forEach((key) => {
          if (icons[key].width === undefined) {
            icons[key].width = width
          }
          if (icons[key].height === undefined) {
            icons[key].height = height
          }
        })
      }
      const regularIconify = require(locate('fa-regular'))
      const regular = Object.keys(regularIconify.icons).reduce(
        (mockedIconify, key) => {
          mockedIconify.icons[key + '-regular'] = regularIconify.icons[key]
          return mockedIconify
        },
        { icons: {} }
      )
      const solid = require(locate('fa-brands'))
      const brands = require(locate('fa-solid'))
      ;[regular, solid, brands].forEach(appendSize)
      return {
        icons: {
          ...regular.icons,
          ...solid.icons,
          ...brands.icons
        }
      }
    })()
  },
  {
    name: 'material',
    description: (prefix) =>
      `${prefix} integrated from [\`material-design-icons\`](https://github.com/google/material-design-icons)`,
    normalizeName: (name) => {
      let normalizedName
      if (name.startsWith('outline-')) {
        normalizedName = upperFirst(camelCase(name.slice(8) + '-outlined'))
      } else if (name.startsWith('twotone-')) {
        normalizedName = upperFirst(camelCase(name.slice(8) + '-twotone'))
      } else if (name.startsWith('baseline-')) {
        normalizedName = upperFirst(camelCase(name.slice(9) + '-filled'))
      } else if (name.startsWith('sharp-')) {
        normalizedName = upperFirst(camelCase(name.slice(6) + '-sharp'))
      } else if (name.startsWith('round-')) {
        normalizedName = upperFirst(camelCase(name.slice(6) + '-round'))
      } else {
        throw new Error('unexpected md name')
      }
      if (/^\d/.test(normalizedName)) {
        return 'Md' + normalizedName
      }
      return normalizedName
    },
    iconify: require(locate('ic')),
    keywords: ['material']
  },
  {
    name: 'antd',
    description: (prefix) =>
      `${prefix} integrated from [\`ant-design-icons\`](https://github.com/ant-design/ant-design-icons)`,
    normalizeName: (name) => upperFirst(camelCase(name)),
    iconify: require(locate('ant-design')),
    keywords: ['antd']
  },
  {
    name: 'fluent',
    description: (prefix) =>
      `${prefix} integrated from [\`fluentui-system-icons\`](https://github.com/microsoft/fluentui-system-icons)`,
    normalizeName: (name) => upperFirst(camelCase(name)),
    iconify: require(locate('fluent')),
    keywords: ['fluent']
  },
  {
    name: 'ionicons5',
    description: (prefix) =>
      `${prefix} integrated from [\`ionicons5\`](https://ionicons.com/)`,
    normalizeName: (name) => {
      return upperFirst(camelCase(name))
    },
    iconify: (() => {
      const iconify = require(locate('ion'))
      const filteredIcons = {}
      Object.keys(iconify.icons).forEach((iconName) => {
        if (iconName.startsWith('ios-') || iconName.startsWith('md-')) return
        filteredIcons[iconName] = iconify.icons[iconName]
      })
      return { ...iconify, icon: filteredIcons }
    })(),
    keywords: ['ionicons', 'ionicons5']
  },
  {
    name: 'ionicons4',
    src: 'src/svg',
    description: (prefix) =>
      `${prefix} integrated from [\`ionicons4\`](https://ionicons.com/v4/)`,
    normalizeName: (name) => {
      return upperFirst(camelCase(name))
    },
    keywords: ['ionicons', 'ionicon4']
  },
  {
    name: 'tabler',
    description: (prefix) =>
      `${prefix} integrated from [\`tabler\`](https://github.com/tabler/tabler-icons)`,
    normalizeName: (name) => {
      const normalizedName = upperFirst(camelCase(name))
      if (/^\d/.test(normalizedName)) return 'Tabler' + normalizedName
      return normalizedName
    },
    iconify: require(locate('tabler')),
    keywords: ['tabler-icons']
  }
]

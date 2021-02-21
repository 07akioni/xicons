import { h, ref, computed, defineAsyncComponent } from 'vue'
import { VirtualList, VXScroll } from 'vueuc'
import { debounce } from 'lodash-es'
import { useBreakpoints, useMemo } from 'vooks'
import Icon from './Icon'
import Tab from './Tab'
import Logo from './Logo'
import * as fluentIcons from '../dist/fluent/vue3/es/async-index'
import * as ionV5Icons from '../dist/ionicons5/vue3/es/async-index'
import * as ionV4Icons from '../dist/ionicons4/vue3/es/async-index'
import * as antdIcons from '../dist/antd/vue3/es/async-index'
import * as materialIcons from '../dist/material/vue3/es/async-index'
import * as faIcons from '../dist/fa/vue3/es/async-index'

const nsMap = new Map()
nsMap.set(fluentIcons, 'fluent')
nsMap.set(ionV5Icons, 'ionicons5')
nsMap.set(ionV4Icons, 'ionicons4')
nsMap.set(antdIcons, 'antd')
nsMap.set(materialIcons, 'material')
nsMap.set(faIcons, 'fa')

function createMergedEntries (...objs) {
  const entries = []
  objs.forEach(obj => {
    const ns = nsMap.get(obj)
    const nsPrefix = ns + '-'
    Object.keys(obj).forEach(key => {
      entries.push([nsPrefix + key, ns, key, defineAsyncComponent(obj[key])])
    })
  })
  return entries
}

function pack (list, size = 8) {
  const packs = []
  for (let i = 0; i < list.length; i += size) {
    const row = list.slice(i, i + size)
    for (let j = row.length; j < size; ++j) {
      row.push([null, null])
    }
    packs.push(
      row
    )
  }
  return packs
}

const iconSets = {
  all: createMergedEntries(
    fluentIcons,
    ionV4Icons,
    ionV5Icons,
    antdIcons,
    faIcons,
    materialIcons
  ).sort((v1, v2) => {
    if (v1[2] > v2[2]) return 1
    if (v1[2] < v2[2]) return -1
    return 0
  }),
  fluent: createMergedEntries(fluentIcons),
  ionicons4: createMergedEntries(ionV4Icons),
  ionicons5: createMergedEntries(ionV5Icons),
  antd: createMergedEntries(antdIcons),
  fa: createMergedEntries(faIcons),
  material: createMergedEntries(materialIcons)
}

export default {
  name: 'App',
  setup () {
    const patternRef = ref('')
    const displayedSetKeyRef = ref(Object.keys(iconSets)[0])
    const showNsRef = computed(() => displayedSetKeyRef.value === 'all')
    const handleInput = debounce(
      e => { patternRef.value = e.target.value },
      800
    )
    const breakpointsRef = useBreakpoints()
    const packSizeRef = useMemo(() => {
      const breakpoints = breakpointsRef.value
      if (breakpoints.includes('l')) return 5
      if (breakpoints.includes('m')) return 4
      if (breakpoints.includes('s')) return 3
      if (breakpoints.includes('xs')) return 2
    })
    const showPrefixRef = useMemo(() => breakpointsRef.value.includes('m'))
    return {
      showPrefix: showPrefixRef,
      handleInput,
      pattern: patternRef,
      displayedSetKey: displayedSetKeyRef,
      showNs: showNsRef,
      filteredPacks: computed(() => {
        return pack(iconSets[displayedSetKeyRef.value].filter((iconInfo) => {
          return iconInfo[2].toLowerCase().includes(patternRef.value.toLowerCase())
        }), packSizeRef.value)
      })
    }
  },
  render () {
    return h('div', [
      h('div', {
        class: 'nav-container'
      }, [
        this.showPrefix ? h('div', {
          class: 'nav-prefix'
        }, [
          h(Logo, {
            class: 'logo'
          })
        ]) : null,
        h('div', {
          class: 'nav-main'
        }, [
          h('input', {
            placeholder: 'Search Icons',
            class: 'search',
            value: this.pattern,
            onInput: this.handleInput
          })
        ]),
        this.showPrefix ? h('div', {
          class: 'nav-suffix'
        }, [
          h('a', {
            class: 'link',
            href: 'https://github.com/07akioni/xicons#installation',
            target: '_blank',
            style: {
              float: 'right'
            }
          }, [
            'Installation'
          ]),
          h('a', {
            class: 'link',
            href: 'https://github.com/07akioni/xicons#usage',
            target: '_blank',
            style: {
              float: 'right'
            }
          }, [
            'Usage'
          ]),
          h('a', {
            class: 'link',
            href: 'https://github.com/07akioni/xicons',
            target: '_blank',
            style: {
              float: 'right'
            }
          }, [
            'Github'
          ])
        ]) : null
      ]),
      h(VXScroll, null, {
        default: () => h(Tab, {
          value: this.displayedSetKey,
          options: Object.keys(iconSets),
          onValueChange: value => {
            this.displayedSetKey = value
          }
        })
      }),
      h(VirtualList, {
        paddingTop: 16,
        paddingBottom: 24,
        key: this.displayedSetKey,
        items: this.filteredPacks,
        itemSize: 80
      }, {
        default: ({ item: fragment }) => {
          const { showNs } = this
          return h('div', {
            key: fragment[0][0],
            style: {
              height: '64px',
              display: 'flex',
              flexWrap: 'nowrap',
              paddingBottom: '16px'
            }
          }, [
            // 0 key
            // 1 ns
            // 2 id
            // 3 component
            fragment.map(item => {
              return h(Icon, {
                key: item[0],
                showNs,
                ns: item[1],
                id: item[2],
                icon: item[3],
              })
            })
          ])
        },
        empty () {
          return h('div', {
            class: 'empty'
          }, [
            'No Icon Matched'
          ])
        }
      })
    ])
  }
}

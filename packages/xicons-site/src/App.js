import { h, ref, computed, defineAsyncComponent, provide, reactive } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { VirtualList, VXScroll } from 'vueuc'
import { debounce } from 'lodash-es'
import { useBreakpoints, useMemo } from 'vooks'
import Icon from './Icon'
import Tab from './Tab'
import Logo from './Logo'
import * as fluentIcons from 'xicons/dist/fluent/vue3/es/async-index'
import * as ionV5Icons from 'xicons/dist/ionicons5/vue3/es/async-index'
import * as ionV4Icons from 'xicons/dist/ionicons4/vue3/es/async-index'
import * as antdIcons from 'xicons/dist/antd/vue3/es/async-index'
import * as materialIcons from 'xicons/dist/material/vue3/es/async-index'
import * as faIcons from 'xicons/dist/fa/vue3/es/async-index'
import * as tablerIcons from 'xicons/dist/tabler/vue3/es/async-index'
import * as carbonIcons from 'xicons/dist/carbon/vue3/es/async-index'

const nsMap = new Map()
nsMap.set(antdIcons, 'antd')
nsMap.set(carbonIcons, 'carbon')
nsMap.set(faIcons, 'fa')
nsMap.set(fluentIcons, 'fluent')
nsMap.set(ionV4Icons, 'ionicons4')
nsMap.set(ionV5Icons, 'ionicons5')
nsMap.set(materialIcons, 'material')
nsMap.set(tablerIcons, 'tabler')

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
      row.push([null, null, null, null])
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
    materialIcons,
    tablerIcons,
    carbonIcons
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
  material: createMergedEntries(materialIcons),
  tabler: createMergedEntries(tablerIcons),
  carbon: createMergedEntries(carbonIcons)
}

export default {
  name: 'App',
  setup () {
    const router = useRouter()
    const route = useRoute()

    const isZhRef = computed(() => {
      console.log(route.path)
      return route.path === '/zh-CN'
    })

    provide('locale', reactive({
      isZh: isZhRef
    }))

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
      isZh: isZhRef,
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
            placeholder: this.isZh ? '搜索图标' : 'Search Icons',
            class: 'search',
            value: this.pattern,
            onInput: this.handleInput
          })
        ]),
        this.showPrefix ? h('div', {
          class: 'nav-suffix'
        }, [
          h(RouterLink, {
            class: 'link',
            to:  this.isZh ? '/' : '/zh-CN'
          }, {
            default: () => this.isZh ? 'English' : '中文'
          }),
          h('a', {
            class: 'link',
            href: this.isZh
              ? 'https://github.com/07akioni/xicons/blob/main/README.zh-CN.md#%E5%AE%89%E8%A3%85'
              : 'https://github.com/07akioni/xicons#installation',
            target: '_blank',
            style: {
              float: 'right'
            }
          }, [
            this.isZh ? '安装' : 'Installation'
          ]),
          h('a', {
            class: 'link',
            href: this.isZh 
              ? 'https://github.com/07akioni/xicons/blob/main/README.zh-CN.md#%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F'
              : 'https://github.com/07akioni/xicons#usage',
            target: '_blank',
            style: {
              float: 'right'
            }
          }, [
            this.isZh ? '使用教程' : 'Usage'
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
        empty: () => {
          return h('div', {
            class: 'empty'
          }, [
            this.isZh ? '无匹配图标' : 'No Icon Matched'
          ])
        }
      })
    ])
  }
}

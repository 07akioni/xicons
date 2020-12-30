import { h, ref, computed, defineAsyncComponent } from 'vue'
import { VirtualList } from 'vueuc'
import { debounce } from 'lodash-es'
import { useBreakpoints, useMemo } from 'vooks'
import Icon from './Icon'
import Tab from './Tab'
import Logo from './Logo'
import * as fluentIcons from '../dist/fluent/vue3/async-index'
import * as ionV5Icons from '../dist/ionicons5/vue3/async-index'
import * as ionV4Icons from '../dist/ionicons4/vue3/async-index'

function createMergedEntries (...objs) {
  const entries = []
  objs.forEach(obj => {
    Object.keys(obj).forEach(key => {
      entries.push([key, defineAsyncComponent(obj[key])])
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
  fluent: createMergedEntries(fluentIcons),
  ionicons4: createMergedEntries(ionV4Icons),
  ionicons5: createMergedEntries(ionV5Icons)
}

export default {
  name: 'App',
  setup () {
    const patternRef = ref('')
    const displayedSetKeyRef = ref(Object.keys(iconSets)[0])
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
      filteredPacks: computed(() => {
        return pack(iconSets[displayedSetKeyRef.value].filter(([key]) => {
          return key.toLowerCase().includes(patternRef.value.toLowerCase())
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
            href: 'https://github.com/07akioni/xicons',
            target: '_blank',
            style: {
              float: 'right'
            }
          }, [
            'Installation'
          ]),
          h('a', {
            class: 'link',
            href: 'https://github.com/07akioni/xicons',
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
      h(Tab, {
        value: this.displayedSetKey,
        options: Object.keys(iconSets),
        onValueChange: value => {
          this.displayedSetKey = value
        }
      }),
      h(VirtualList, {
        paddingTop: 16,
        paddingBottom: 24,
        key: this.displayedSetKey,
        items: this.filteredPacks,
        itemSize: 80
      }, {
        default ({ item: fragment }) {
          return h('div', {
            key: fragment[0][0],
            style: {
              height: '64px',
              display: 'flex',
              flexWrap: 'nowrap',
              paddingBottom: '16px'
            }
          }, [
            fragment.map(item => {
              return h(Icon, {
                icon: item[1],
                id: item[0]
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

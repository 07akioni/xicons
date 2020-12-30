import { h, onBeforeMount, ref, computed, defineAsyncComponent } from 'vue'
import { VirtualList } from 'vueuc'
import { CssRender } from 'css-render'
import { debounce } from 'lodash-es'
import { useBreakpoints } from 'vooks'
import Icon from './Icon'
import * as fluentIcons from '../dist/fluent/vue3/async-index'
import * as ionV5Icons from '../dist/ionicons5/vue3/async-index'
import * as ionV4Icons from '../dist/ionicons4/vue3/async-index'

const { c } = CssRender()
const style = c([
  c('body', {
    margin: 0,
    overflow: 'hidden',
    fontFamily: 'system-ui'
  }),
  c('.icon', {
    color: '#303030',
    width: '1em',
    height: '1em',
    display: 'inline-flex'
  }, [
    c('svg', {
      fill: 'currentColor',
      width: '1em',
      height: '1em'
    })
  ]),
  c('.v-vl', {
    height: 'calc(100vh - 80px)',
    width: '100%',
  })
])

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
  'ionicons4': createMergedEntries(ionV4Icons),
  'ionicons5': createMergedEntries(ionV5Icons)
}

export default {
  name: 'App',
  setup () {
    onBeforeMount(() => {
      style.mount({
        target: 'app',
        count: false
      })
    })
    const patternRef = ref('')
    const displayedSetKeyRef = ref(Object.keys(iconSets)[0])
    const handleInput = debounce(
      e => { patternRef.value = e.target.value },
      800
    )
    const breakpointsRef = useBreakpoints()
    const packSizeRef = computed(() => {
      const breakpoints = breakpointsRef.value
      if (breakpoints.includes('l')) return 6
      if (breakpoints.includes('m')) return 4
      if (breakpoints.includes('s')) return 3
      if (breakpoints.includes('xs')) return 2
    })
    return {
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
        style: {
          height: '80px'
        }
      }, [
        h('input', {
          value: this.pattern,
          onInput: this.handleInput
        }),
        Object.keys(iconSets).map(key => h('label', [
          h('input', {
            type: 'radio',
            checked: this.displayedSetKey === key,
            name: 'icon-set',
            onChange: () => {
              this.displayedSetKey = key
            }
          }),
          key
        ])),
        h('a', {
          href: 'https://github.com/07akioni/xicons',
          target: '_blank',
          style: {
            float: 'right'
          }
        }, [
          'Github'
        ])
      ]),
      this.filteredPacks.length ? h(VirtualList, {
        key: this.displayedSetKey,
        items: this.filteredPacks,
        itemSize: 30
      }, {
        default ({ item: fragment }) {
          return h('div', {
            key: fragment[0][0],
            style: {
              display: 'flex',
              flexWrap: 'nowrap'
            }
          }, [
            fragment.map(item => {
              return h(Icon, {
                icon: item[1],
                id: item[0]
              })
            })
          ])
        }
      }) : 'nothing matched'
    ])
  }
}

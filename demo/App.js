import { h, onBeforeMount, ref, computed, defineAsyncComponent } from 'vue'
import { VirtualList } from 'vueuc'
import { CssRender } from 'css-render'
import { debounce } from 'lodash-es'
import * as fluentIcons from '../fluent/async-index'
import * as ionV5Icons from '../ionicons-v5/async-index'
import * as ionV4Icons from '../ionicons-v4/async-index'

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
    packs.push(
      list.slice(i, i + size)
    )
  }
  return packs
}

const iconSets = {
  fluent: createMergedEntries(fluentIcons),
  'ionicons-v4': createMergedEntries(ionV4Icons),
  'ionicons-v5': createMergedEntries(ionV5Icons)
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
    return {
      handleInput,
      pattern: patternRef,
      displayedSetKey: displayedSetKeyRef,
      filteredPacks: computed(() => {
        return pack(iconSets[displayedSetKeyRef.value].filter(([key]) => {
          return key.toLowerCase().includes(patternRef.value.toLowerCase())
        }))
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
        ]))
      ]),
      this.filteredPacks.length ? h(VirtualList, {
        items: this.filteredPacks,
        itemSize: 30
      }, {
        default ({ item: fragment }) {
          return h('div', {
            key: fragment[0][0],
          }, [
            fragment.map(item => {
              return [
                h('div', {
                  style: {
                    width: '12.5%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontSize: '12px'
                  }
                }, [
                  h('div', {
                    class: 'icon',
                    style: {
                      fontSize: '30px'
                    }
                  }, [
                    h(item[1]),
                  ]),
                  item[0]
                ])
              ]
            })
          ])
        }
      }) : 'nothing matched'
    ])
  }
}

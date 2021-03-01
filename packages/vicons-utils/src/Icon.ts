import { defineComponent, renderSlot, computed, h, onBeforeMount, inject } from 'vue'
import { mountStyle } from '@xicons/utils'
import { iconConfigInjectionKey, iconConfigProviderProps } from './IconConfigProvider'
import { defaultTag } from './config'

export const Icon = defineComponent({
  name: 'Icon',
  props: iconConfigProviderProps,
  setup (props, { slots }) {
    const IconConfigProvider = inject(iconConfigInjectionKey, null)
    const mergedSizeRef = computed(() => {
      const _size = props.size ?? IconConfigProvider?.size
      if (_size === undefined) {
        return undefined
      }
      if (typeof _size === 'number' || /^\d+$/.test(_size)) return `${_size}px`
      return _size
    })
    const mergedColorRef = computed(() => {
      const { color } = props
      if (color === undefined) {
        if (IconConfigProvider) {
          return IconConfigProvider.color
        }
        return undefined
      }
      return color
    })
    const mergedTagRef = computed(() => {
      const { tag } = props
      if (tag === undefined) {
        return IconConfigProvider?.tag ?? defaultTag
      }
      return tag
    })
    onBeforeMount(() => {
      mountStyle()
    })
    return () => h(mergedTagRef.value, {
      class: 'xicon',
      style: {
        color: mergedColorRef.value,
        fontSize: mergedSizeRef.value
      }
    }, [
      renderSlot(slots, 'default')
    ])
  }
})
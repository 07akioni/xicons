import { defineComponent, renderSlot, computed, h, onBeforeMount, PropType} from 'vue'
import { mountStyle } from '../react/style'

export const Icon = defineComponent({
  name: 'Icon',
  props: {
    size: [String, Number] as PropType<string | number | undefined>,
    color: String,
    tag: {
      type: String,
      default: 'span'
    }
  },
  setup (props, { slots }) {
    const mergedSizeRef = computed(() => {
      const { size } = props
      if (size === undefined) return undefined
      if (typeof size === 'number' || /^\d+$/.test(size)) return `${size}px`
      return size
    })
    onBeforeMount(() => {
      mountStyle()
    })
    return () => h(props.tag, {
      class: 'xicon',
      style: {
        color: props.color,
        fontSize: mergedSizeRef.value
      }
    }, [
      renderSlot(slots, 'default')
    ])
  }
})
import { mountStyle } from './style'

export const Icon = {
  name: 'Icon',
  props: {
    size: [String, Number],
    color: String,
    tag: {
      type: String,
      default: 'span'
    }
  },
  computed: {
    mergedSize () {
      const { size } = this
      if (size === undefined) return undefined
      if (typeof size === 'number' || /^\d+$/.test(size)) return `${size}px`
      return size
    },
    mergedStyle () {
      return {
        color: this.color,
        fontSize: this.mergedSize
      }
    }
  },
  beforeMount () {
    mountStyle()
  },
  render (h) {
    const { tag, mergedStyle } = this
    return h(tag, {
      class: 'xicon',
      style: mergedStyle
    }, this.$slots.default)
  }
}

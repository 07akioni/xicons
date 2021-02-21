import { mountStyle } from './style'
import { defaultTag, injectionKey, iconProps } from './config'

export const Icon = {
  name: 'Icon',
  inject: {
    [injectionKey]: {
      default: null
    }
  },
  props: iconProps,
  computed: {
    mergedTag () {
      const { tag } = this
      if (tag === undefined) {
        const {
          [injectionKey]: IconConfigProvider
        } = this
        return IconConfigProvider?.tag ?? defaultTag
      }
      return tag
    },
    mergedColor () {
      const { color } = this
      if (color === undefined) {
        const {
          [injectionKey]: IconConfigProvider
        } = this
        if (IconConfigProvider) return IconConfigProvider.color
        return undefined
      }
      return color
    },
    mergedSize () {
      const _size = this.size ?? this[injectionKey]?.size
      if (_size === undefined) {
        return undefined
      }
      if (typeof _size === 'number' || /^\d+$/.test(_size)) return `${_size}px`
      return _size
    },
    mergedStyle () {
      return {
        color: this.mergedColor,
        fontSize: this.mergedSize
      }
    }
  },
  beforeMount () {
    mountStyle()
  },
  render (h) {
    const { mergedTag, mergedStyle } = this
    return h(mergedTag, {
      class: 'xicon',
      style: mergedStyle
    }, this.$slots.default)
  }
}

import Vue, { VNode } from 'vue'
import { mountStyle } from '@xicons/utils'
import { defaultTag, injectionKey, iconProps, IconProps } from './config'

interface IconThis {
  [injectionKey]: IconProps | null
}

export const Icon = Vue.extend({
  name: 'Icon',
  inject: {
    [injectionKey]: {
      default: null
    }
  },
  props: iconProps,
  computed: {
    mergedTag (): string {
      const { tag } = this
      if (tag === undefined) {
        const {
          [injectionKey]: IconConfigProvider
        } = this as unknown as IconThis
        return IconConfigProvider?.tag ?? defaultTag
      }
      return tag
    },
    mergedColor (): string | undefined {
      const { color } = this
      if (color === undefined) {
        const {
          [injectionKey]: IconConfigProvider
        } = this as unknown as IconThis
        if (IconConfigProvider) return IconConfigProvider.color
        return undefined
      }
      return color
    },
    mergedSize (): string | undefined {
      const _size = this.size ?? (this as unknown as IconThis)[injectionKey]?.size
      if (_size === undefined) {
        return undefined
      }
      if (typeof _size === 'number' || /^\d+$/.test(_size)) return `${_size}px`
      return _size
    },
    mergedStyle (): { color: string | undefined, fontSize: string | undefined } {
      return {
        color: this.mergedColor,
        fontSize: this.mergedSize
      }
    }
  },
  beforeMount () {
    mountStyle()
  },
  render (h): VNode {
    const { mergedTag, mergedStyle } = this
    return h(mergedTag, {
      class: 'xicon',
      style: mergedStyle
    }, this.$slots.default)
  }
})

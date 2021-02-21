import { iconProps, injectionKey } from "./config"

export const IconConfigProvider = {
  name: 'IconConfigProvider',
  props: iconProps,
  provide () {
    return {
      [injectionKey]: this
    }
  },
  render (h) {
    return h('div', null, this.$slots.default)
  }
}
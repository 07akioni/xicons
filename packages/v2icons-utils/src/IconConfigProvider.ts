import Vue from 'vue'
import { iconProps, injectionKey } from "./config"

export const IconConfigProvider = Vue.extend({
  name: 'IconConfigProvider',
  props: iconProps,
  provide () {
    return {
      [injectionKey]: this
    }
  },
  render (h) {
    return h('div', undefined, this.$slots.default)
  }
})

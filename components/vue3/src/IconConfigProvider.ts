import { defineComponent, renderSlot, PropType, provide, InjectionKey, ExtractPropTypes } from 'vue'

export const iconConfigProviderProps = {
  size: [String, Number] as PropType<string | number | undefined>,
  color: String,
  tag: String
} as const

type IconConfigInjection = ExtractPropTypes<typeof iconConfigProviderProps>

export const iconConfigInjectionKey: InjectionKey<IconConfigInjection> = Symbol('IconConfigInjection')

export const IconConfigProvider = defineComponent({
  name: 'IconConfigProvider',
  props: iconConfigProviderProps,
  setup (props, { slots }) {
    provide(iconConfigInjectionKey, props)
    return () => renderSlot(slots, 'default')
  }
})
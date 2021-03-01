import { h, inject } from 'vue'

export default {
  name: 'Tab',
  props: {
    value: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true  
    },
    onValueChange: {
      type: Function,
      required: true  
    }
  },
  setup () {
    const locale = inject('locale')
    return {
      locale
    }
  },
  render () {
    return h('div', {
      class: 'tab'
    }, this.options.map(value => {
      return h('div', {
        class: [
          'tab-item',
          {
            'tab-item--active': value === this.value
          }
        ],
        onClick: () => {
          if (value !== this.value) {
            this.onValueChange(value)
          }
        }
      }, [
        (this.locale.isZh && value === 'all') ? '全部图标' : value
      ])
    }))
  }
}
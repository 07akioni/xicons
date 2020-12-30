import { h } from 'vue'

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
        value
      ])
    }))
  }
}
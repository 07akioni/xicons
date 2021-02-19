import { h, ref } from 'vue'

export default {
  name: 'Icon',
  props: [
    'icon',
    'id'
  ],
  setup (props) {
    const handleClick = () => {
      const a = document.createElement('a')
      a.download = `${props.id}.svg`
      a.href = URL.createObjectURL(new Blob([
        iconRef.value.outerHTML
      ]))
      a.click()
      URL.revokeObjectURL(a.href)
    }
    const iconRef = ref(null)
    return () => h('div', {
      class: 'icon-wrapper'
    }, props.icon !== null ? [
      h('div', {
        class: 'icon',
        title: 'Click to download SVG',
        onClick: handleClick
      }, [
        h(props.icon, {
          ref: inst => inst && (iconRef.value = inst.$el)
        }),
      ]),
      h('div', {
        class: 'icon-name'
      }, [
        props.id
      ])
    ] : [])
  }
}
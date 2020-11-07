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
      style: {
        flexGrow: 1,
        flexBasis: 0,
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: '10px',
        fontFamily: 'Monaco',
        overflow: 'hidden'
      }
    }, [
      h('div', {
        class: 'icon',
        onClick: handleClick,
        style: {
          cursor: 'pointer',
          fontSize: '30px'
        }
      }, [
        h(props.icon, {
          ref: inst => inst && (iconRef.value = inst.$el)
        }),
      ]),
      props.id
    ])
  }
}
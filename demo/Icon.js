import { h, ref } from 'vue'

export default {
  name: 'Icon',
  props: [
    'icon',
    'id',
    'showNs',
    'ns'
  ],
  setup (props) {
    const svgCopiedRef = ref(false)
    const nameCopiedRef = ref(false)

    const handleClick = () => {
      const a = document.createElement('a')
      a.download = `${props.id}.svg`
      a.href = URL.createObjectURL(new Blob([
        iconRef.value.outerHTML
      ]))
      a.click()
      URL.revokeObjectURL(a.href)
    }
    const handleCopySvgClick = () => {
      if (svgCopiedRef.value) return
      svgCopiedRef.value = true
      navigator.clipboard.writeText(
        iconRef.value.outerHTML
      )
      setTimeout(() => {
        svgCopiedRef.value = false
      }, 2000)
    }
    const handleCopyNameClick = () => {
      if (nameCopiedRef.value) return
      nameCopiedRef.value = true
      navigator.clipboard.writeText(
        props.id
      )
      setTimeout(() => {
        nameCopiedRef.value = false
      }, 2000)
    }
    const iconRef = ref(null)
    return () => h('div', {
      class: 'icon-wrapper' + (props.showNs ? ' show-ns' : '')
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
        class: 'icon-info'
      }, [
        props.showNs ? h('div', {
          class: 'icon-ns'
        }, [
          props.ns
        ]) : null,
        h('div', {
          class: 'icon-name'
        }, [
          props.id
        ]),
        h('div', {
          class: 'icon-action'
        }, [
          h('div', {
            class: 'icon-action-button',
            onClick: handleCopySvgClick
          }, [
            svgCopiedRef.value ? 'SVG Copied!' : 'Copy SVG'
          ]),
          h('div', {
            class: 'icon-action-button',
            onClick: handleCopyNameClick
          }, [
            nameCopiedRef.value ? 'Name Copied!' : 'Copy Name'
          ])
        ])
      ])
    ] : [])
  }
}
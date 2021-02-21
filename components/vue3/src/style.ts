import { CssRender } from 'css-render'

const { c } = CssRender()

const style = c('.xicon', {
  width: '1em',
  height: '1em',
  display: 'inline-flex'
}, [
  c('svg', {
    width: '1em',
    height: '1em'
  }),
  c('svg:not([fill])', {
    fill: 'currentColor'
  })
])

export const mountStyle = () => {
  style.mount({ id: 'xicon' })
}
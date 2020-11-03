const {
  naiveSvg
} = require('./utils')

const nSvg = naiveSvg(`
  <svg width="100" height="900">
    <line width="1" height="1" id="10" />
  </svg>
`)

nSvg.removeComment()
nSvg.removeUselessTags()
nSvg.removeSvgAttr('width', 'height')
nSvg.removeAttr('id')
nSvg.refill()

console.log(nSvg.getSvg())
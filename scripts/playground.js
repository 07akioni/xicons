const {
  createSvgSanitizer
} = require('./utils')

const svgSanitizer = createSvgSanitizer(`
  <svg width="100" height="900">
    <line width="1" height="1" id="10" />
  </svg>
`)

svgSanitizer.removeComment()
svgSanitizer.removeUselessTags()
svgSanitizer.removeSvgAttr('width', 'height')
svgSanitizer.removeAttr('id')
svgSanitizer.refill()

console.log(svgSanitizer.svg())
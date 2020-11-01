const {
  naiveSvg
} = require('./utils')

const nSvg = naiveSvg(`
<rect width="28" height="28" fill="none"></rect>`)

nSvg.removeComment()
nSvg.removeUselessTags()
nSvg.removeAttr('width')
nSvg.removeAttr('height')
nSvg.refill()

console.log(nSvg.getSvg())
const attrRegex = {}

function ensureAttrRegex (attr) {
  return attrRegex[attr] || (attrRegex[attr] = new RegExp(`\\s${attr}="([^"]*)"`, 'g'))
}

function removeComment (src) {
  return src.replace(/<!--(.*?)-->/g, '')
}

function removeUselessTags (src) {
  return src
    .replace(
      /<\?xml(.*?)\?>/g,
      ''
    )
    .replace(
      /<!DOCTYPE(.*?)>/g,
      ''
    )
    .replace(
      /<title>(.*?)<\/title>/g,
      ''
    )
    .replace(
      /<desc>(.*?)<\/desc>/g,
      ''
    )
}

function removeSvgAttr (src, ...attrs) {
  const svgRegex = /<svg[^>]*>/
  let svgContent = src.match(svgRegex)[0]
  attrs.forEach(attr => {
    svgContent = svgContent.replace(ensureAttrRegex(attr), '')
  })
  return src.replace(
    svgRegex,
    svgContent
  )
}

function removeAttr (src, ...attrs) {
  return attrs.reduce(
    (code, attr) => code.replace(ensureAttrRegex(attr), ''),
    src
  )
}

function refill (src) {
  return src
    .replace(
      /fill="([^"n]+)"/g,
      'fill="currentColor"'
    )
    .replace(
      /stroke="([^"n]+)"/g,
      'stroke="currentColor"'
    )
    .replace(
      /fill: ([^;n]+);/g,
      'fill: currentColor;'
    )
    .replace(
      /stroke: *([^;n]+);/g,
      'stroke: currentColor;'
    )
}

exports.naiveSvg = function naiveSvg (src) {
  this.removeAttr = (...attrs) => {
    src = removeAttr(src, ...attrs)
  }
  this.removeSvgAttr = (...attrs) => {
    src = removeSvgAttr(src, ...attrs)
  }
  this.removeComment = () => {
    src = removeComment(src)
  }
  this.removeUselessTags = () => {
    src = removeUselessTags(src)
  }
  this.refill = () => {
    src = refill(src)
  }
  this.getSvg = () => src
  return this
}
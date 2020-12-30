function formatStringToCamelCase (str) {
  const splitted = str.split("-")
  if (splitted.length === 1) return splitted[0]
  return (
    splitted[0] +
    splitted
      .slice(1)
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join("")
  )
}

function getStyleObjectFromString (str) {
  const style = {}
  str.split(";").forEach(el => {
    const [property, value] = el.split(":")
    if (!property) return

    const formattedProperty = formatStringToCamelCase(property.trim())
    const trimmedValue = value.trim()
    style[formattedProperty] = /^(\d|\.)+$/.test(trimmedValue) ? Number(trimmedValue) : trimmedValue
  })

  return style
}

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
    // for corner case
    .replace(
      /style="enable-background:new 0 0 512 512;"/g,
      'enable-background="new 0 0 512 512"'
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

exports.createSvgSanitizer = function createSvgSanitizer (src) {
  this.removeAttr = (...attrs) => {
    src = removeAttr(src, ...attrs)
    return this
  }
  this.removeSvgAttr = (...attrs) => {
    src = removeSvgAttr(src, ...attrs)
    return this
  }
  this.removeComment = () => {
    src = removeComment(src)
    return this
  }
  this.removeUselessTags = () => {
    src = removeUselessTags(src)
    return this
  }
  this.refill = () => {
    src = refill(src)
    return this
  }
  this.reactSvg = () => {
    return src
      .replace(/xmlns:xlink/g, 'xmlnsXlink')
      .replace(/xml:space/g, 'xmlSpace')
      .replace(/xml:lang/g, 'xmlLang')
      .replace(/xml:base/g, 'xmlBase')
      .replace(/enable-background/g, 'enableBackground')
      .replace(/style="([^"]*)"/g, (match) => {
        const styleLiteral = match.slice(7, -1)
        return `style={${JSON.stringify(getStyleObjectFromString(styleLiteral))}}`
      })
  }
  this.svg = () => src
  return this
}
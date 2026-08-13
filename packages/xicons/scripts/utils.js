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
      /style="enable-background:([^;]+);"/g, // ionicons4, material
      'enable-background="$1"'
    )
    .replace(
      /<svg t="[^"]+"/g, // antd
      '<svg'
    )
    .replace(
      /class="[^"]+"/g, // antd
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
    return reactifySvg(src)
  }
  this.svg = () => src
  return this
}

// convert svg to the form React expects:
// - attribute names from kebab-case to camelCase (stroke-linecap => strokeLinecap)
// - colon namespaced attrs (xmlns:xlink => xmlnsXlink, xlink:href => xlinkHref)
// - style string to style object
function reactifySvg (src) {
  return src
    .replace(/xmlns:xlink/g, 'xmlnsXlink')
    .replace(/xlink:href/g, 'xlinkHref')
    .replace(/xml:space/g, 'xmlSpace')
    .replace(/xml:lang/g, 'xmlLang')
    .replace(/xml:base/g, 'xmlBase')
    .replace(/([a-zA-Z]+(?:-[a-zA-Z]+)+)=/g, (match, attr) => {
      // data-* and aria-* attrs keep kebab-case in React (JSX only accepts data-*)
      if (/^data-/i.test(attr) || /^aria-/i.test(attr)) return match
      return attr.replace(/-+([a-zA-Z])/g, (_, ch) => ch.toUpperCase()) + '='
    })
    .replace(/style="([^"]*)"/g, (match) => {
      const styleLiteral = match.slice(7, -1)
      return `style={${JSON.stringify(getStyleObjectFromString(styleLiteral))}}`
    })
}

exports.reactifySvg = reactifySvg
const { ref } = require("vue")

const attrRegex = {}

function ensureAttrRegex (attr) {
  return attrRegex[attr] || (attrRegex[attr] = new RegExp(`\s${attr}="([^"]*)"`, 'g'))
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

function removeAttr (src, attr) {
  return src.replace(
    ensureAttrRegex(attr),
    ''
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
  this.removeAttr = attr => {
    src = removeAttr(src, attr)
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
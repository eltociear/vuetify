const path = require('path')
const loader = require('style-loader')

module.exports = function () {
  console.log('hereeeee')
}

module.exports.pitch = function (request) {
  const result = loader.pitch.call(this, request)
  const index = result.indexOf('options.insert = "head";\n')

  if (index <= -1) return result
  const insertIndex = index - 1

  // eslint-disable-next-line prefer-destructuring
  const resourcePath = this.resourcePath
  const relativePath = path.relative(path.resolve(__dirname, '..'), resourcePath)

  const insertAttr = `
if (typeof options.attributes !== 'object') {
  options.attributes = {}
}

options.attributes["source-path"] = '${relativePath}' // do anything you want
  `

  const modified = result.slice(0, insertIndex) + insertAttr + result.slice(insertIndex)

  return modified
}

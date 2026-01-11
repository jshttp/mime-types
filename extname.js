'use strict'

/**
 * Return the extension of the path, from the last '.' to end of string in the last portion of the path. If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string.
 * @param  {String}    path — the path to evaluate
 * @throws {TypeError} if path is not a string
 */
module.exports = (path) => {
  if (typeof path !== 'string') {
    throw new TypeError('path is not a string')
  }

  // normalize path (win -> posix)
  // not too happy with doing this on every call, but avoids test coverage dropping
  path = path.replace(/\\/g, '/')

  let lastDotIndex = -1
  let filenameIndex = 0

  // find last /
  for (let i = path.length - 1; i >= 0; i--) {
    if (path[i] === '/') {
      filenameIndex = i + 1
      break
    }
  }

  // find last .
  for (let i = path.length - 1; i >= filenameIndex; i--) {
    if (path[i] === '.') {
      lastDotIndex = i
      break
    }
  }

  if (lastDotIndex > filenameIndex) {
    // found ext
    return path.slice(lastDotIndex)
  }

  return '' // no ext found
}

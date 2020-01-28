// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// This is sourced from the actual extname() implementation in nodejs.
// Since we only required one function, this seemed like an acceptable way to
// do it.

const isWindows =
  process && process.platform && process.platform === 'win32'

const constants = {
  // Alphabet chars.
  CHAR_UPPERCASE_A: 65, /* A */
  CHAR_LOWERCASE_A: 97, /* a */
  CHAR_UPPERCASE_Z: 90, /* Z */
  CHAR_LOWERCASE_Z: 122, /* z */

  // Non-alphabetic chars.
  CHAR_DOT: 46, /* . */
  CHAR_FORWARD_SLASH: 47, /* / */
  CHAR_BACKWARD_SLASH: 92, /* \ */
  CHAR_VERTICAL_LINE: 124, /* | */
  CHAR_COLON: 58, /* : */
  CHAR_QUESTION_MARK: 63, /* ? */
  CHAR_UNDERSCORE: 95, /* _ */
  CHAR_LINE_FEED: 10, /* \n */
  CHAR_CARRIAGE_RETURN: 13, /* \r */
  CHAR_TAB: 9, /* \t */
  CHAR_FORM_FEED: 12, /* \f */
  CHAR_EXCLAMATION_MARK: 33, /* ! */
  CHAR_HASH: 35, /* # */
  CHAR_SPACE: 32, /*   */
  CHAR_NO_BREAK_SPACE: 160, /* \u00A0 */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279, /* \uFEFF */
  CHAR_LEFT_SQUARE_BRACKET: 91, /* [ */
  CHAR_RIGHT_SQUARE_BRACKET: 93, /* ] */
  CHAR_LEFT_ANGLE_BRACKET: 60, /* < */
  CHAR_RIGHT_ANGLE_BRACKET: 62, /* > */
  CHAR_LEFT_CURLY_BRACKET: 123, /* { */
  CHAR_RIGHT_CURLY_BRACKET: 125, /* } */
  CHAR_HYPHEN_MINUS: 45, /* - */
  CHAR_PLUS: 43, /* + */
  CHAR_DOUBLE_QUOTE: 34, /* " */
  CHAR_SINGLE_QUOTE: 39, /* ' */
  CHAR_PERCENT: 37, /* % */
  CHAR_SEMICOLON: 59, /* ; */
  CHAR_CIRCUMFLEX_ACCENT: 94, /* ^ */
  CHAR_GRAVE_ACCENT: 96, /* ` */
  CHAR_AT: 64, /* @ */
  CHAR_AMPERSAND: 38, /* & */
  CHAR_EQUAL: 61, /* = */

  // Digits
  CHAR_0: 48, /* 0 */
  CHAR_9: 57, /* 9 */

  EOL: isWindows ? '\r\n' : '\n'
}

function isPathSeparator (code) {
  return code === constants.CHAR_FORWARD_SLASH ||
    code === constants.CHAR_BACKWARD_SLASH
}

function isWindowsDeviceRoot (code) {
  return (code >= constants.CHAR_UPPERCASE_A &&
    code <= constants.CHAR_UPPERCASE_Z) ||
    (code >= constants.CHAR_LOWERCASE_A &&
    code <= constants.CHAR_LOWERCASE_Z)
}

function extname (path) {
  if (typeof path !== 'string') {
    throw new Error('Invalid argument "path"')
  }
  let start = 0
  let startDot = -1
  let startPart = 0
  let end = -1
  let matchedSlash = true
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  let preDotState = 0

  // Check for a drive letter prefix so as not to mistake the following
  // path separator as an extra separator at the end of the path that can be
  // disregarded

  if (path.length >= 2 &&
    path.charCodeAt(1) === constants.CHAR_COLON &&
    isWindowsDeviceRoot(path.charCodeAt(0))) {
    start = startPart = 2
  }

  for (let i = path.length - 1; i >= start; --i) {
    const code = path.charCodeAt(i)
    if (isPathSeparator(code)) {
    // If we reached a path separator that was not part of a set of path
    // separators at the end of the string, stop now
      if (!matchedSlash) {
        startPart = i + 1
        break
      }
      continue
    }
    if (end === -1) {
    // We saw the first non-path separator, mark this as the end of our
    // extension
      matchedSlash = false
      end = i + 1
    }
    if (code === constants.CHAR_DOT) {
    // If this is our first dot, mark it as the start of our extension
      if (startDot === -1) { startDot = i } else if (preDotState !== 1) { preDotState = 1 }
    } else if (startDot !== -1) {
    // We saw a non-dot and non-path separator before our dot, so we should
    // have a good chance at having a non-empty extension
      preDotState = -1
    }
  }

  if (startDot === -1 ||
    end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    (preDotState === 1 &&
     startDot === end - 1 &&
     startDot === startPart + 1)) {
    return ''
  }
  return path.slice(startDot, end)
}

exports.extname = extname

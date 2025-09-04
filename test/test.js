var assert = require('assert')
var mimeTypes = require('..')
const extname = require('../extname')

describe('mimeTypes', function () {
  describe('.charset(type)', function () {
    it('should return "UTF-8" for "application/json"', function () {
      assert.strictEqual(mimeTypes.charset('application/json'), 'UTF-8')
    })

    it('should return "UTF-8" for "application/json; foo=bar"', function () {
      assert.strictEqual(mimeTypes.charset('application/json; foo=bar'), 'UTF-8')
    })

    it('should return "UTF-8" for "application/javascript"', function () {
      assert.strictEqual(mimeTypes.charset('application/javascript'), 'UTF-8')
    })

    it('should return "UTF-8" for "application/JavaScript"', function () {
      assert.strictEqual(mimeTypes.charset('application/JavaScript'), 'UTF-8')
    })

    it('should return "UTF-8" for "text/html"', function () {
      assert.strictEqual(mimeTypes.charset('text/html'), 'UTF-8')
    })

    it('should return "UTF-8" for "TEXT/HTML"', function () {
      assert.strictEqual(mimeTypes.charset('TEXT/HTML'), 'UTF-8')
    })

    it('should return "UTF-8" for any text/*', function () {
      assert.strictEqual(mimeTypes.charset('text/x-bogus'), 'UTF-8')
    })

    it('should return false for unknown types', function () {
      assert.strictEqual(mimeTypes.charset('application/x-bogus'), false)
    })

    it('should return false for any application/octet-stream', function () {
      assert.strictEqual(mimeTypes.charset('application/octet-stream'), false)
    })

    it('should return false for invalid arguments', function () {
      assert.strictEqual(mimeTypes.charset({}), false)
      assert.strictEqual(mimeTypes.charset(null), false)
      assert.strictEqual(mimeTypes.charset(true), false)
      assert.strictEqual(mimeTypes.charset(42), false)
    })
  })

  describe('.contentType(extension)', function () {
    it('should return content-type for "html"', function () {
      assert.strictEqual(mimeTypes.contentType('html'), 'text/html; charset=utf-8')
    })

    it('should return content-type for ".html"', function () {
      assert.strictEqual(mimeTypes.contentType('.html'), 'text/html; charset=utf-8')
    })

    it('should return content-type for "jade"', function () {
      assert.strictEqual(mimeTypes.contentType('jade'), 'text/jade; charset=utf-8')
    })

    it('should return content-type for "json"', function () {
      assert.strictEqual(mimeTypes.contentType('json'), 'application/json; charset=utf-8')
    })

    it('should return false for unknown extensions', function () {
      assert.strictEqual(mimeTypes.contentType('bogus'), false)
    })

    it('should return false for invalid arguments', function () {
      assert.strictEqual(mimeTypes.contentType({}), false)
      assert.strictEqual(mimeTypes.contentType(null), false)
      assert.strictEqual(mimeTypes.contentType(true), false)
      assert.strictEqual(mimeTypes.contentType(42), false)
    })
  })

  describe('.contentType(type)', function () {
    it('should attach charset to "application/json"', function () {
      assert.strictEqual(mimeTypes.contentType('application/json'), 'application/json; charset=utf-8')
    })

    it('should attach charset to "application/json; foo=bar"', function () {
      assert.strictEqual(mimeTypes.contentType('application/json; foo=bar'), 'application/json; foo=bar; charset=utf-8')
    })

    it('should attach charset to "TEXT/HTML"', function () {
      assert.strictEqual(mimeTypes.contentType('TEXT/HTML'), 'TEXT/HTML; charset=utf-8')
    })

    it('should attach charset to "text/html"', function () {
      assert.strictEqual(mimeTypes.contentType('text/html'), 'text/html; charset=utf-8')
    })

    it('should not alter "text/html; charset=iso-8859-1"', function () {
      assert.strictEqual(mimeTypes.contentType('text/html; charset=iso-8859-1'), 'text/html; charset=iso-8859-1')
    })

    it('should return type for unknown types', function () {
      assert.strictEqual(mimeTypes.contentType('application/x-bogus'), 'application/x-bogus')
    })
  })

  describe('.extension(type)', function () {
    it('should return extension for mime type', function () {
      assert.strictEqual(mimeTypes.extension('text/html'), 'html')
      assert.strictEqual(mimeTypes.extension(' text/html'), 'html')
      assert.strictEqual(mimeTypes.extension('text/html '), 'html')
    })

    it('should return false for unknown type', function () {
      assert.strictEqual(mimeTypes.extension('application/x-bogus'), false)
    })

    it('should return false for non-type string', function () {
      assert.strictEqual(mimeTypes.extension('bogus'), false)
    })

    it('should return false for non-strings', function () {
      assert.strictEqual(mimeTypes.extension(null), false)
      assert.strictEqual(mimeTypes.extension(undefined), false)
      assert.strictEqual(mimeTypes.extension(42), false)
      assert.strictEqual(mimeTypes.extension({}), false)
    })

    it('should return extension for mime type with parameters', function () {
      assert.strictEqual(mimeTypes.extension('text/html;charset=UTF-8'), 'html')
      assert.strictEqual(mimeTypes.extension('text/HTML; charset=UTF-8'), 'html')
      assert.strictEqual(mimeTypes.extension('text/html; charset=UTF-8'), 'html')
      assert.strictEqual(mimeTypes.extension('text/html; charset=UTF-8 '), 'html')
      assert.strictEqual(mimeTypes.extension('text/html ; charset=UTF-8'), 'html')
    })
  })

  describe('.lookup(extension)', function () {
    it('should return mime type for ".html"', function () {
      assert.strictEqual(mimeTypes.lookup('.html'), 'text/html')
    })

    it('should return mime type for ".js"', function () {
      assert.strictEqual(mimeTypes.lookup('.js'), 'text/javascript')
    })

    it('should return mime type for ".json"', function () {
      assert.strictEqual(mimeTypes.lookup('.json'), 'application/json')
    })

    it('should return mime type for ".rtf"', function () {
      assert.strictEqual(mimeTypes.lookup('.rtf'), 'application/rtf')
    })

    it('should return mime type for ".txt"', function () {
      assert.strictEqual(mimeTypes.lookup('.txt'), 'text/plain')
    })

    it('should return mime type for ".xml"', function () {
      assert.strictEqual(mimeTypes.lookup('.xml'), 'application/xml')
    })

    it('should return mime type for ".mp4"', function () {
      assert.strictEqual(mimeTypes.lookup('.mp4'), 'video/mp4')
    })

    it('should work without the leading dot', function () {
      assert.strictEqual(mimeTypes.lookup('html'), 'text/html')
      assert.strictEqual(mimeTypes.lookup('xml'), 'application/xml')
    })

    it('should be case insensitive', function () {
      assert.strictEqual(mimeTypes.lookup('HTML'), 'text/html')
      assert.strictEqual(mimeTypes.lookup('.Xml'), 'application/xml')
    })

    it('should return false for unknown extension', function () {
      assert.strictEqual(mimeTypes.lookup('.bogus'), false)
      assert.strictEqual(mimeTypes.lookup('bogus'), false)
    })

    it('should return false for non-strings', function () {
      assert.strictEqual(mimeTypes.lookup(null), false)
      assert.strictEqual(mimeTypes.lookup(undefined), false)
      assert.strictEqual(mimeTypes.lookup(42), false)
      assert.strictEqual(mimeTypes.lookup({}), false)
    })
  })

  describe('.lookup(path)', function () {
    it('should return mime type for file name', function () {
      assert.strictEqual(mimeTypes.lookup('page.html'), 'text/html')
    })

    it('should return mime type for relative path', function () {
      assert.strictEqual(mimeTypes.lookup('path/to/page.html'), 'text/html')
      assert.strictEqual(mimeTypes.lookup('path\\to\\page.html'), 'text/html')
    })

    it('should return mime type for absolute path', function () {
      assert.strictEqual(mimeTypes.lookup('/path/to/page.html'), 'text/html')
      assert.strictEqual(mimeTypes.lookup('C:\\path\\to\\page.html'), 'text/html')
    })

    it('should be case insensitive', function () {
      assert.strictEqual(mimeTypes.lookup('/path/to/PAGE.HTML'), 'text/html')
      assert.strictEqual(mimeTypes.lookup('C:\\path\\to\\PAGE.HTML'), 'text/html')
    })

    it('should return false for unknown extension', function () {
      assert.strictEqual(mimeTypes.lookup('/path/to/file.bogus'), false)
    })

    it('should return false for path without extension', function () {
      assert.strictEqual(mimeTypes.lookup('/path/to/json'), false)
    })

    describe('path with dotfile', function () {
      it('should return false when extension-less', function () {
        assert.strictEqual(mimeTypes.lookup('/path/to/.json'), false)
      })

      it('should return mime type when there is extension', function () {
        assert.strictEqual(mimeTypes.lookup('/path/to/.config.json'), 'application/json')
      })

      it('should return mime type when there is extension, but no path', function () {
        assert.strictEqual(
          mimeTypes.lookup('.config.json'),
          'application/json'
        )
      })
    })
  })

  // Note the changes in extension->type mapping that result from using mime-score
  describe('extension conflicts', function () {
    console.warn('Mime-score logic changes extension->type mappings for the following:')
    for (var [extension, legacy, current] of mimeTypes._extensionConflicts) {
      console.warn(`* ${extension} -> ${legacy} is now ${current}`)
    }
  })
})

describe('extname', function () {
  it('should return the correct extension for a file with a valid extension', function () {
    const result = extname('file.txt')
    assert.strictEqual(result, '.txt')
  })

  it('should return an empty string if no extension exists', function () {
    const result = extname('file')
    assert.strictEqual(result, '')
  })

  it('should return an empty string for files that start with a dot but have no extension', function () {
    const result = extname('.hiddenfile')
    assert.strictEqual(result, '')
  })

  it('should return the correct extension for files with multiple dots in the name', function () {
    const result = extname('archive.tar.gz')
    assert.strictEqual(result, '.gz')
  })

  it('should return the correct extension for a file with mixed case extension', function () {
    const result = extname('file.TXT')
    assert.strictEqual(result, '.TXT')
  })

  it('should return an empty string if the dot is at the start of the filename', function () {
    const result = extname('.file')
    assert.strictEqual(result, '')
  })

  // POSIX:

  it('should return the correct extension for a file in a nested directory', function () {
    const result = extname('folder/subfolder/file.txt')
    assert.strictEqual(result, '.txt')
  })

  it('should handle paths with multiple slashes correctly', function () {
    const result = extname('/home/user/file.name.ext')
    assert.strictEqual(result, '.ext')
  })

  // Windows:

  it('should return the correct extension for a Windows path with backslashes', function () {
    const result = extname('C:\\Users\\file.txt')
    assert.strictEqual(result, '.txt')
  })

  it('should return the correct extension for a Windows path with multiple backslashes', function () {
    const result = extname('C:\\Users\\Documents\\Projects\\file.tar.gz')
    assert.strictEqual(result, '.gz')
  })

  it('should return an empty string for a Windows path with no extension', function () {
    const result = extname('C:\\Users\\file')
    assert.strictEqual(result, '')
  })

  it('should return an empty string for a hidden Windows file (starts with a dot)', function () {
    const result = extname('C:\\Users\\.hiddenfile')
    assert.strictEqual(result, '')
  })

  it('should return the correct extension for a Windows path with multiple dots', function () {
    const result = extname('C:\\Users\\file.name.with.dots.ext')
    assert.strictEqual(result, '.ext')
  })

  it('should return the correct extension for a Windows path with mixed case extension', function () {
    const result = extname('C:\\Users\\file.TXT')
    assert.strictEqual(result, '.TXT')
  })

  // Test for TypeError when input is not a string
  it('should throw a TypeError if the input is not a string', function () {
    assert.throws(() => extname(123), {
      name: 'TypeError',
      message: 'path is not a string'
    })
    assert.throws(() => extname(null), {
      name: 'TypeError',
      message: 'path is not a string'
    })
    assert.throws(() => extname(undefined), {
      name: 'TypeError',
      message: 'path is not a string'
    })
    assert.throws(() => extname({}), {
      name: 'TypeError',
      message: 'path is not a string'
    })
    assert.throws(() => extname([]), {
      name: 'TypeError',
      message: 'path is not a string'
    })
  })
})

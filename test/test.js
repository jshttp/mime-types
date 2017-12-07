
const assert = require('assert')
const mimeTypes = require('..')

describe('mimeTypes', () => {
  describe('.charset(type)', () => {
    it('should return "UTF-8" for "application/json"', () => {
      assert.equal(mimeTypes.charset('application/json'), 'UTF-8')
    })

    it('should return "UTF-8" for "application/json; foo=bar"', () => {
      assert.equal(mimeTypes.charset('application/json; foo=bar'), 'UTF-8')
    })

    it('should return "UTF-8" for "application/javascript"', () => {
      assert.equal(mimeTypes.charset('application/javascript'), 'UTF-8')
    })

    it('should return "UTF-8" for "application/JavaScript"', () => {
      assert.equal(mimeTypes.charset('application/JavaScript'), 'UTF-8')
    })

    it('should return "UTF-8" for "text/html"', () => {
      assert.equal(mimeTypes.charset('text/html'), 'UTF-8')
    })

    it('should return "UTF-8" for "TEXT/HTML"', () => {
      assert.equal(mimeTypes.charset('TEXT/HTML'), 'UTF-8')
    })

    it('should return "UTF-8" for any text/*', () => {
      assert.equal(mimeTypes.charset('text/x-bogus'), 'UTF-8')
    })

    it('should return false for unknown types', () => {
      assert.strictEqual(mimeTypes.charset('application/x-bogus'), false)
    })

    it('should return false for any application/octet-stream', () => {
      assert.strictEqual(mimeTypes.charset('application/octet-stream'), false)
    })

    it('should return false for invalid arguments', () => {
      assert.strictEqual(mimeTypes.charset({}), false)
      assert.strictEqual(mimeTypes.charset(null), false)
      assert.strictEqual(mimeTypes.charset(true), false)
      assert.strictEqual(mimeTypes.charset(42), false)
    })
  })

  describe('.contentType(extension)', () => {
    it('should return content-type for "html"', () => {
      assert.equal(mimeTypes.contentType('html'), 'text/html; charset=utf-8')
    })

    it('should return content-type for ".html"', () => {
      assert.equal(mimeTypes.contentType('.html'), 'text/html; charset=utf-8')
    })

    it('should return content-type for "jade"', () => {
      assert.equal(mimeTypes.contentType('jade'), 'text/jade; charset=utf-8')
    })

    it('should return content-type for "json"', () => {
      assert.equal(mimeTypes.contentType('json'), 'application/json; charset=utf-8')
    })

    it('should return false for unknown extensions', () => {
      assert.strictEqual(mimeTypes.contentType('bogus'), false)
    })

    it('should return false for invalid arguments', () => {
      assert.strictEqual(mimeTypes.contentType({}), false)
      assert.strictEqual(mimeTypes.contentType(null), false)
      assert.strictEqual(mimeTypes.contentType(true), false)
      assert.strictEqual(mimeTypes.contentType(42), false)
    })
  })

  describe('.contentType(type)', () => {
    it('should attach charset to "application/json"', () => {
      assert.equal(mimeTypes.contentType('application/json'), 'application/json; charset=utf-8')
    })

    it('should attach charset to "application/json; foo=bar"', () => {
      assert.equal(mimeTypes.contentType('application/json; foo=bar'), 'application/json; foo=bar; charset=utf-8')
    })

    it('should attach charset to "TEXT/HTML"', () => {
      assert.equal(mimeTypes.contentType('TEXT/HTML'), 'TEXT/HTML; charset=utf-8')
    })

    it('should attach charset to "text/html"', () => {
      assert.equal(mimeTypes.contentType('text/html'), 'text/html; charset=utf-8')
    })

    it('should not alter "text/html; charset=iso-8859-1"', () => {
      assert.equal(mimeTypes.contentType('text/html; charset=iso-8859-1'), 'text/html; charset=iso-8859-1')
    })

    it('should return type for unknown types', () => {
      assert.equal(mimeTypes.contentType('application/x-bogus'), 'application/x-bogus')
    })
  })

  describe('.extension(type)', () => {
    it('should return extension for mime type', () => {
      assert.equal(mimeTypes.extension('text/html'), 'html')
      assert.equal(mimeTypes.extension(' text/html'), 'html')
      assert.equal(mimeTypes.extension('text/html '), 'html')
    })

    it('should return false for unknown type', () => {
      assert.strictEqual(mimeTypes.extension('application/x-bogus'), false)
    })

    it('should return false for non-type string', () => {
      assert.strictEqual(mimeTypes.extension('bogus'), false)
    })

    it('should return false for non-strings', () => {
      assert.strictEqual(mimeTypes.extension(null), false)
      assert.strictEqual(mimeTypes.extension(undefined), false)
      assert.strictEqual(mimeTypes.extension(42), false)
      assert.strictEqual(mimeTypes.extension({}), false)
    })

    it('should return extension for mime type with parameters', () => {
      assert.equal(mimeTypes.extension('text/html;charset=UTF-8'), 'html')
      assert.equal(mimeTypes.extension('text/HTML; charset=UTF-8'), 'html')
      assert.equal(mimeTypes.extension('text/html; charset=UTF-8'), 'html')
      assert.equal(mimeTypes.extension('text/html; charset=UTF-8 '), 'html')
      assert.equal(mimeTypes.extension('text/html ; charset=UTF-8'), 'html')
    })
  })

  describe('.lookup(extension)', () => {
    it('should return mime type for ".html"', () => {
      assert.equal(mimeTypes.lookup('.html'), 'text/html')
    })

    it('should return mime type for ".js"', () => {
      assert.equal(mimeTypes.lookup('.js'), 'application/javascript')
    })

    it('should return mime type for ".json"', () => {
      assert.equal(mimeTypes.lookup('.json'), 'application/json')
    })

    it('should return mime type for ".rtf"', () => {
      assert.equal(mimeTypes.lookup('.rtf'), 'application/rtf')
    })

    it('should return mime type for ".txt"', () => {
      assert.equal(mimeTypes.lookup('.txt'), 'text/plain')
    })

    it('should return mime type for ".xml"', () => {
      assert.equal(mimeTypes.lookup('.xml'), 'application/xml')
    })

    it('should work without the leading dot', () => {
      assert.equal(mimeTypes.lookup('html'), 'text/html')
      assert.equal(mimeTypes.lookup('xml'), 'application/xml')
    })

    it('should be case insensitive', () => {
      assert.equal(mimeTypes.lookup('HTML'), 'text/html')
      assert.equal(mimeTypes.lookup('.Xml'), 'application/xml')
    })

    it('should return false for unknown extension', () => {
      assert.strictEqual(mimeTypes.lookup('.bogus'), false)
      assert.strictEqual(mimeTypes.lookup('bogus'), false)
    })

    it('should return false for non-strings', () => {
      assert.strictEqual(mimeTypes.lookup(null), false)
      assert.strictEqual(mimeTypes.lookup(undefined), false)
      assert.strictEqual(mimeTypes.lookup(42), false)
      assert.strictEqual(mimeTypes.lookup({}), false)
    })
  })

  describe('.lookup(path)', () => {
    it('should return mime type for file name', () => {
      assert.equal(mimeTypes.lookup('page.html'), 'text/html')
    })

    it('should return mime type for relative path', () => {
      assert.equal(mimeTypes.lookup('path/to/page.html'), 'text/html')
      assert.equal(mimeTypes.lookup('path\\to\\page.html'), 'text/html')
    })

    it('should return mime type for absolute path', () => {
      assert.equal(mimeTypes.lookup('/path/to/page.html'), 'text/html')
      assert.equal(mimeTypes.lookup('C:\\path\\to\\page.html'), 'text/html')
    })

    it('should be case insensitive', () => {
      assert.equal(mimeTypes.lookup('/path/to/PAGE.HTML'), 'text/html')
      assert.equal(mimeTypes.lookup('C:\\path\\to\\PAGE.HTML'), 'text/html')
    })

    it('should return false for unknown extension', () => {
      assert.strictEqual(mimeTypes.lookup('/path/to/file.bogus'), false)
    })

    it('should return false for path without extension', () => {
      assert.strictEqual(mimeTypes.lookup('/path/to/json'), false)
    })

    describe('path with dotfile', () => {
      it('should return false when extension-less', () => {
        assert.strictEqual(mimeTypes.lookup('/path/to/.json'), false)
      })

      it('should return mime type when there is extension', () => {
        assert.strictEqual(mimeTypes.lookup('/path/to/.config.json'), 'application/json')
      })

      it('should return mime type when there is extension, but no path', () => {
        assert.strictEqual(mimeTypes.lookup('.config.json'), 'application/json')
      })
    })
  })
})


var assert = require('assert')
var mimeTypes = require('..')

describe('mimeTypes', function () {
  describe('.glob(pattern)', function () {
    it('should Test glob searching', function () {
      assert.deepEqual(['application/octet-stream'], mimeTypes.glob('*/*'));
      assert.notEqual(mimeTypes.glob('application/*').indexOf('application/json'), -1);
      assert.equal(mimeTypes.glob('application/*').length > 1, true);
      assert.deepEqual([], mimeTypes.glob('qwerty/*'));
      assert.deepEqual(['qwerty/qwerty'], mimeTypes.glob('qwerty/qwerty'));
    })
  })
  describe('.charset(type)', function () {
    it('should return "utf-8" for "application/json"', function () {
      assert.equal(mimeTypes.charset('application/json'), 'utf-8')
    })

    it('should return "utf-8" for "application/json; foo=bar"', function () {
      assert.equal(mimeTypes.charset('application/json; foo=bar'), 'utf-8')
    })

    it('should return "utf-8" for "application/javascript"', function () {
      assert.equal(mimeTypes.charset('application/javascript'), 'utf-8')
    })

    it('should return "utf-8" for "application/JavaScript"', function () {
      assert.equal(mimeTypes.charset('application/JavaScript'), 'utf-8')
    })

    it('should return "utf-8" for "text/html"', function () {
      assert.equal(mimeTypes.charset('text/html'), 'utf-8')
    })

    it('should return "utf-8" for "TEXT/HTML"', function () {
      assert.equal(mimeTypes.charset('TEXT/HTML'), 'utf-8')
    })

    it('should return "utf-8" for any text/*', function () {
      assert.equal(mimeTypes.charset('text/x-bogus'), 'utf-8')
    })

    it('should return undefined for unknown types', function () {
      assert.strictEqual(mimeTypes.charset('application/x-bogus'), undefined)
    })

    it('should return undefined for any application/octet-stream', function () {
      assert.strictEqual(mimeTypes.charset('application/octet-stream'), undefined)
    })

    it('should return undefined for invalid arguments', function () {
      assert.strictEqual(mimeTypes.charset({}), undefined)
      assert.strictEqual(mimeTypes.charset(null), undefined)
      assert.strictEqual(mimeTypes.charset(true), undefined)
      assert.strictEqual(mimeTypes.charset(42), undefined)
    })
  })

  describe('.contentType(extension)', function () {
    it('should return content-type for "html"', function () {
      assert.equal(mimeTypes.contentType('html'), 'text/html; charset=utf-8')
    })

    it('should return content-type for ".html"', function () {
      assert.equal(mimeTypes.contentType('.html'), 'text/html; charset=utf-8')
    })

    it('should return content-type for "jade"', function () {
      assert.equal(mimeTypes.contentType('jade'), 'text/jade; charset=utf-8')
    })

    it('should return content-type for "json"', function () {
      assert.equal(mimeTypes.contentType('json'), 'application/json; charset=utf-8')
    })

    it('should return undefined for unknown extensions', function () {
      assert.strictEqual(mimeTypes.contentType('bogus'), undefined)
    })

    it('should return undefined for invalid arguments', function () {
      assert.strictEqual(mimeTypes.contentType({}), undefined)
      assert.strictEqual(mimeTypes.contentType(null), undefined)
      assert.strictEqual(mimeTypes.contentType(true), undefined)
      assert.strictEqual(mimeTypes.contentType(42), undefined)
    })
  })

  describe('.contentType(type)', function () {
    it('should attach charset to "application/json"', function () {
      assert.equal(mimeTypes.contentType('application/json'), 'application/json; charset=utf-8')
    })

    it('should attach charset to "application/json; foo=bar"', function () {
      assert.equal(mimeTypes.contentType('application/json; foo=bar'), 'application/json; foo=bar; charset=utf-8')
    })

    it('should attach charset to "TEXT/HTML"', function () {
      assert.equal(mimeTypes.contentType('TEXT/HTML'), 'TEXT/HTML; charset=utf-8')
    })

    it('should attach charset to "text/html"', function () {
      assert.equal(mimeTypes.contentType('text/html'), 'text/html; charset=utf-8')
    })

    it('should not alter "text/html; charset=iso-8859-1"', function () {
      assert.equal(mimeTypes.contentType('text/html; charset=iso-8859-1'), 'text/html; charset=iso-8859-1')
    })

    it('should return type for unknown types', function () {
      assert.equal(mimeTypes.contentType('application/x-bogus'), 'application/x-bogus')
    })
  })

  describe('.extension(type)', function () {
    it('should return extension for mime type', function () {
      assert.equal(mimeTypes.extension('text/html'), 'html')
      assert.equal(mimeTypes.extension(' text/html'), 'html')
      assert.equal(mimeTypes.extension('text/html '), 'html')
    })

    it('should return undefined for unknown type', function () {
      assert.strictEqual(mimeTypes.extension('application/x-bogus'), undefined)
    })

    it('should return undefined for non-type string', function () {
      assert.strictEqual(mimeTypes.extension('bogus'), undefined)
    })

    it('should return undefined for non-strings', function () {
      assert.strictEqual(mimeTypes.extension(null), undefined)
      assert.strictEqual(mimeTypes.extension(undefined), undefined)
      assert.strictEqual(mimeTypes.extension(42), undefined)
      assert.strictEqual(mimeTypes.extension({}), undefined)
    })

    it('should return extension for mime type with parameters', function () {
      assert.equal(mimeTypes.extension('text/html;charset=utf-8'), 'html')
      assert.equal(mimeTypes.extension('text/HTML; charset=utf-8'), 'html')
      assert.equal(mimeTypes.extension('text/html; charset=utf-8'), 'html')
      assert.equal(mimeTypes.extension('text/html; charset=utf-8 '), 'html')
      assert.equal(mimeTypes.extension('text/html ; charset=utf-8'), 'html')
    })
  })

  describe('.lookup(extension)', function () {
    it('should return mime type for ".html"', function () {
      assert.equal(mimeTypes.lookup('.html'), 'text/html')
    })

    it('should return mime type for ".js"', function () {
      assert.equal(mimeTypes.lookup('.js'), 'application/javascript')
    })

    it('should return mime type for ".json"', function () {
      assert.equal(mimeTypes.lookup('.json'), 'application/json')
    })

    it('should return mime type for ".rtf"', function () {
      assert.equal(mimeTypes.lookup('.rtf'), 'application/rtf')
    })

    it('should return mime type for ".txt"', function () {
      assert.equal(mimeTypes.lookup('.txt'), 'text/plain')
    })

    it('should return mime type for ".xml"', function () {
      assert.equal(mimeTypes.lookup('.xml'), 'application/xml')
    })

    it('should work without the leading dot', function () {
      assert.equal(mimeTypes.lookup('html'), 'text/html')
      assert.equal(mimeTypes.lookup('xml'), 'application/xml')
    })

    it('should be case insensitive', function () {
      assert.equal(mimeTypes.lookup('HTML'), 'text/html')
      assert.equal(mimeTypes.lookup('.Xml'), 'application/xml')
    })

    it('should return undefined for unknown extension', function () {
      assert.strictEqual(mimeTypes.lookup('.bogus'), undefined)
      assert.strictEqual(mimeTypes.lookup('bogus'), undefined)
    })

    it('should return undefined for non-strings', function () {
      assert.strictEqual(mimeTypes.lookup(null), undefined)
      assert.strictEqual(mimeTypes.lookup(undefined), undefined)
      assert.strictEqual(mimeTypes.lookup(42), undefined)
      assert.strictEqual(mimeTypes.lookup({}), undefined)
    })
  })

  describe('.lookup(path)', function () {
    it('should return mime type for file name', function () {
      assert.equal(mimeTypes.lookup('page.html'), 'text/html')
    })

    it('should return mime type for relative path', function () {
      assert.equal(mimeTypes.lookup('path/to/page.html'), 'text/html')
      assert.equal(mimeTypes.lookup('path\\to\\page.html'), 'text/html')
    })

    it('should return mime type for absolute path', function () {
      assert.equal(mimeTypes.lookup('/path/to/page.html'), 'text/html')
      assert.equal(mimeTypes.lookup('C:\\path\\to\\page.html'), 'text/html')
    })

    it('should be case insensitive', function () {
      assert.equal(mimeTypes.lookup('/path/to/PAGE.HTML'), 'text/html')
      assert.equal(mimeTypes.lookup('C:\\path\\to\\PAGE.HTML'), 'text/html')
    })

    it('should return undefined for unknown extension', function () {
      assert.strictEqual(mimeTypes.lookup('/path/to/file.bogus'), undefined)
    })

    it('should return undefined for path without extension', function () {
      assert.strictEqual(mimeTypes.lookup('/path/to/json'), undefined)
    })

    describe('path with dotfile', function () {
      it('should return undefined when extension-less', function () {
        assert.strictEqual(mimeTypes.lookup('/path/to/.json'), undefined)
      })

      it('should return mime type when there is extension', function () {
        assert.strictEqual(mimeTypes.lookup('/path/to/.config.json'), 'application/json')
      })

      it('should return mime type when there is extension, but no path', function () {
        assert.strictEqual(mimeTypes.lookup('.config.json'), 'application/json')
      })
    })
  })
})

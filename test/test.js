
var assert = require('assert')
var mimeTypes = require('..')

describe('mimeTypes', function () {
  describe('.extension(path)', function () {
    it('should return extension for mime type', function () {
      assert.equal(mimeTypes.extension('text/html'), 'html')
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
      assert.equal(mimeTypes.lookup('page.html'), 'text/html')
    })

    it('should return mime type for relative path', function () {
      assert.equal(mimeTypes.lookup('path/to/page.html'), 'text/html')
    })

    it('should return mime type for absolute path', function () {
      assert.equal(mimeTypes.lookup('/path/to/page.html'), 'text/html')
    })

    it('should be case insensitive', function () {
      assert.equal(mimeTypes.lookup('/path/to/PAGE.HTML'), 'text/html')
    })

    it('should return false for unknown extension', function () {
      assert.strictEqual(mimeTypes.lookup('/path/to/file.bogus'), false)
    })
  })
})

var charset = mimeTypes.charset
var contentType = mimeTypes.contentType

it('should pass most of node-mime\'s tests', function () {
  require('./mime')
})

describe('.charset()', function () {

  it('should not error on non-string types', function () {
    assert.doesNotThrow(function () {
      charset({ noteven: "once" })
      charset(null)
      charset(true)
      charset(Infinity)
    })
  })

  it('should return false for unknown types', function () {
    assert.equal(charset('.jalksdjflakjsdjfasdf'), false)
  })
})

describe('.contentType()', function () {

  it('html', function () {
    assert.equal(contentType('html'), 'text/html; charset=utf-8')
  })

  it('text/html; charset=ascii', function () {
    assert.equal(contentType('text/html; charset=ascii'), 'text/html; charset=ascii')
  })

  it('json', function () {
    assert.equal(contentType('json'), 'application/json; charset=utf-8')
  })

  it('application/json', function () {
    assert.equal(contentType('application/json'), 'application/json; charset=utf-8')
  })

  it('jade', function () {
    assert.equal(contentType('jade'), 'text/jade; charset=utf-8')
  })

  it('should not error on non-string types', function () {
    assert.doesNotThrow(function () {
      contentType({ noteven: "once" })
      contentType(null)
      contentType(true)
      contentType(Infinity)
    })
  })

  it('should return false for unknown types', function () {
    assert.equal(contentType('.jalksdjflakjsdjfasdf'), false)
  })
})


var assert = require('assert')

var mime = require('..')

var set = mime.contentType

describe('.lookup()', function () {
  it('jade', function () {
    assert.equal(mime.lookup('jade'), 'text/jade')
    assert.equal(mime.lookup('.jade'), 'text/jade')
    assert.equal(mime.lookup('file.jade'), 'text/jade')
    assert.equal(mime.lookup('folder/file.jade'), 'text/jade')
  })
})

describe('.contentType()', function () {
  it('html', function () {
    assert.equal(set('html'), 'text/html; charset=utf-8')
  })

  it('text/html; charset=ascii', function () {
    assert.equal(set('text/html; charset=ascii'), 'text/html; charset=ascii')
  })

  it('json', function () {
    assert.equal(set('json'), 'application/json; charset=utf-8')
  })

  it('application/json', function () {
    assert.equal(set('application/json'), 'application/json; charset=utf-8')
  })

  it('jade', function () {
    assert.equal(set('jade'), 'text/jade; charset=utf-8')
  })

  it('should not error on non-string types.', function () {
    assert.doesNotThrow(function () {
      mime.lookup({ noteven: "once" })
      mime.lookup(null)
      mime.lookup(true)
      mime.lookup(Infinity)
    })
  })
})

# mime-types

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

The ultimate javascript content-type utility.

### Install

```sh
$ npm install mime-types
```

#### Similar to [node-mime](https://github.com/broofa/node-mime), except:

- __No fallbacks.__ Instead of naively returning the first available type, `mime-types` simply returns `false`,
  so do `var type = mime.lookup('unrecognized') || 'application/octet-stream'`.
- No `new Mime()` business, so you could do `var lookup = require('mime-types').lookup`.
- Additional mime types are added such as jade and stylus via [mime-db](https://github.com/jshttp/mime-db)

Otherwise, the API is compatible.

### Adding Types

All mime types are based on [mime-db](https://github.com/jshttp/mime-db),
so open a PR there if you'd like to add mime types.

## API

```js
var mime = require('mime-types')
```

All functions return `false` if input is invalid or not found.

### mime.lookup(path)

Lookup the content-type associated with a file.

```js
mime.lookup('json')           // 'application/json'
mime.lookup('.md')            // 'text/x-markdown'
mime.lookup('file.html')      // 'text/html'
mime.lookup('folder/file.js') // 'application/javascript'

mime.lookup('cats') // false
```

### mime.contentType(type)

Create a full content-type header given a content-type or extension.

```js
mime.contentType('markdown')  // 'text/x-markdown; charset=utf-8'
mime.contentType('file.json') // 'application/json; charset=utf-8'
```

### mime.extension(type)

Get the default extension for a content-type.

```js
mime.extension('application/octet-stream') // 'bin'
```

### mime.charset(type)

Lookup the implied default charset of a content-type.

```js
mime.charset('text/x-markdown') // 'UTF-8'
```

### var type = mime.types[extension]

A map of content-types by extension.

### [extensions...] = mime.extensions[type]

A map of extensions by content-type.

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/mime-types.svg?style=flat-square
[npm-url]: https://npmjs.org/package/mime-types
[github-tag]: http://img.shields.io/github/tag/jshttp/mime-types.svg?style=flat-square
[github-url]: https://github.com/jshttp/mime-types/tags
[travis-image]: https://img.shields.io/travis/jshttp/mime-types.svg?style=flat-square
[travis-url]: https://travis-ci.org/jshttp/mime-types
[coveralls-image]: https://img.shields.io/coveralls/jshttp/mime-types.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/jshttp/mime-types?branch=master
[david-image]: http://img.shields.io/david/jshttp/mime-types.svg?style=flat-square
[david-url]: https://david-dm.org/jshttp/mime-types
[license-image]: http://img.shields.io/npm/l/mime-types.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/mime-types.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/mime-types
[gittip-image]: https://img.shields.io/gittip/jonathanong.svg?style=flat-square
[gittip-url]: https://www.gittip.com/jonathanong/

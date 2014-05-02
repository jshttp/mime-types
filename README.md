# mime-types [![Build Status](https://travis-ci.org/expressjs/mime-types.svg)](https://travis-ci.org/expressjs/mime-types) [![NPM version](https://badge.fury.io/js/mime-types.svg)](https://badge.fury.io/js/mime-types)


The ultimate content-type utility.
Similar to [mime](https://github.com/broofa/node-mime) except:

- No `new Mime()` business, so you could do `var lookup = require('mime-types').lookup`
- No fallbacks, so do `var type = mime.lookup('unrecognized') || 'application/octet-stream'`
- Additional mime types are added such as jade and stylus. Feel free to add more!
- Browser support via Browserify and Component by converting lists to JSON files

Otherwise, the API is compatible.

## Adding Types

If you'd like to add additional types,
simply create a PR with a link to where it's defined.

Do __NOT__ edit `mime.json` or `node.json`.
Those are pulled using `build.js`.
You should only touch `custom.json`.

## API

### mime.lookup(path)

Lookup the mime type associated with a file.
If no type is found, returns `false`.

### mime.extension(type)

Get the default extension for the type

### mime.charsets.lookup(type)

Lookup the given charset of a mime type.

### mime.contentType(type)

Create a full `content-type` header given a mime-type or extension.

### mime.types[extension] = type

Lookup a type via extension.

### mime.extensions[type] = [extensions]

Lookup all the associated extensions of a mime type.

### mime.define(types)

Globally add definitions.
`types` must be an object of the form:

```js
{
  "<mime-type>": [extensions...],
  "<mime-type>": [extensions...]
}
```

See the `.json` files in `lib/` for examples.

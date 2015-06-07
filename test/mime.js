/**
 * Usage: node test.js
 */

var mime = require("..");
var assert = require('assert');
var path = require('path');

function eq(a, b) {
  console.log('Test: ' + a + ' === ' + b);
  assert.strictEqual.apply(null, arguments);
}

console.log(Object.keys(mime.extensions).length + ' types');
console.log(Object.keys(mime.types).length + ' extensions\n');

//
// Test extensions
//

eq('txt', mime.extension(mime.types.text));
eq('html', mime.extension(mime.types.htm));
eq('bin', mime.extension('application/octet-stream '));
eq('html', mime.extension(' text/html; charset=UTF-8'));
eq('html', mime.extension('text/html; charset=UTF-8 '));
eq('html', mime.extension('text/html; charset=UTF-8'));
eq('html', mime.extension('text/html ; charset=UTF-8'));
eq('html', mime.extension('text/html;charset=UTF-8'));
eq('html', mime.extension('text/Html;charset=UTF-8'));

//
// Test charsets
//

eq('UTF-8', mime.charset('text/plain'));
eq('UTF-8', mime.charset(mime.types.js));
eq('UTF-8', mime.charset('application/json'))
eq('UTF-8', mime.charsets.lookup('text/something'));
eq(false, mime.charsets.lookup('application/octet-stream'));
// eq('fallback', mime.charset('application/octet-stream', 'fallback'));

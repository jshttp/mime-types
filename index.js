/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

var db = require('mime-db')
var MimeTypes = require('./lib/mime-types')

module.exports = MimeTypes(db)
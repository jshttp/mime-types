###
# Module variables.
# @private
###
mediaTyper  = require('media-typer')
minimatch   = require('minimatch')
isArray     = require('util-ex/lib/is/type/array')
isString    = require('util-ex/lib/is/type/string')
defineProperty = require('util-ex/lib/defineProperty')
extname     = require('path').extname

extractTypeRegExp = /^\s*([^;\s]*)(?:;|\s|$)/
textTypeRegExp = /^text\//i

###
# Module exports.
# @public
###
module.exports = class MimeTypes
  'use strict'

  constructor: (db, duplicationProcessWay)->
    return new MimeTypes db if not (this instanceof MimeTypes)
    defineProperty @, 'types', {}
    defineProperty @, 'mimes', {}

    defineProperty @, 'dupDefault', 0
    defineProperty @, 'dupSkip', 1
    defineProperty @, 'dupOverwrite', 2
    defineProperty @, 'dupAppend', 3
    defineProperty @, 'dup', @dupDefault
    if duplicationProcessWay and duplicationProcessWay in [0..3]
      @dup = duplicationProcessWay
    @_load(db) if db

  ###
  # Get the default charset for a MIME type.
  #
  # @param {string} type
  # @return {boolean|string}
  ###
  charset: (type) ->
    if type and isString type
      try
        obj = mediaTyper.parse(type)
        result = obj.parameters.charset
        if not result
          obj.parameters = undefined
          type = mediaTyper.format(obj)
          result = @mimes[type] and @mimes[type].charset
        # default text/* to utf-8
        result = 'utf-8' if !result and obj.type is 'text'
    result

  ###
  # Create a full Content-Type header given a MIME type or extension.
  #
  # @param {string} str
  # @return {boolean|string}
  ###
  contentType: (str) ->
    `var charset`
    # TODO: should this even be in this module?
    if str and isString str
      mime = if str.indexOf('/') == -1 then @lookup(str) else str
      if mime
        # TODO: use content-type or other module
        if mime.indexOf('charset') == -1
          charset = @charset(mime)
          if charset
            mime += '; charset=' + charset.toLowerCase()
    mime

  ###
  # Get the default extension for a MIME type.
  #
  # @param {string} type
  # @return {boolean|string}
  ###
  extension: (type) ->
    if type and isString type
      # TODO: use media-typer
      result = extractTypeRegExp.exec(type)
      # get extensions
      result = result and @mimes[result[1].toLowerCase()]
      if result
        result = result.defaultExtension or result.extensions[0]
    result

  ###
  # Lookup the MIME types for a file path/extension.
  #
  # @param {string} path
  # @return {undefined|string|array}
  ###
  lookup: (path) ->
    if path and isString path
      # get the extension ("ext" or ".ext" or full path)
      extension = extname('x.' + path).toLowerCase().substr(1)
      result = @types[extension] if extension
    result
  ###
  # Return all MIME types which matching a pattern
  #   [spec](http://tools.ietf.org/html/rfc2616#section-14.1)
  # @param {string} pattern the mime type pattern, For example "video/*", "audio/*", ..
  # @return {array}
  ###
  glob: (pattern)->
    return [ 'application/octet-stream' ] if pattern == '*/*'
    result = Object.keys(@mimes).filter (name)->
      minimatch(name, pattern)
    result

  ###
  # Whether the mime type is exist.
  # @param {string} type the mime type
  # @return {boolean}
  ###
  exist: (type)-> @mimes.hasOwnProperty type

  # source preference (least -> most)
  refSources = [
    'nginx'
    'apache'
    undefined
    'iana'
  ]

  ###
  # Add a custom mime/extension mapping
  # @param (string) type:  mime type
  # @param (object) mime:  mime object
  #  * "source": "iana",
  #  * "charset": "UTF-8",
  #  * "compressible": true,
  #  * "extensions": ["js"]
  ###
  define: (type, mime, dup)->
    return unless type and mime and mime.extensions and
      !@mimes.hasOwnProperty type
    dup = @dup unless dup?
    exts = mime.extensions
    mime.extensions = [exts] unless isArray exts
    exts = []
    mime.charset = mime.charset.toLowerCase() if mime.charset
    for extension in mime.extensions
      t = @types[extension]
      if t
        switch dup
          when @dupSkip
            continue
          when @dupAppend
            t = [t] if isString t
            t.push type unless type in t
          when @dupOverwrite
            t = type
          when @dupDefault
            t = t[0] if isArray t
            from = refSources.indexOf(@mimes[t].source)
            to = refSources.indexOf(mime.source)
            # skip the remapping
            if t != 'application/octet-stream' and
               from > to or from == to and t.substr(0, 12) == 'application/'
              if process.env.DEBUG_MIME
                console.warn """
                   defineMime(#{type}): the #{extension} extension is exists on
                   #{t} skipped it.
                """
              continue
            else
              t = type
      else
        t = type
      # set the extension -> mime type name
      @types[extension] = t
      exts.push extension
    if exts.length
      mime.extensions = exts
      @mimes[type] = mime
    exts
  ###
  # Populate the extensions and types maps from db.
  # @private
  ###
  _load: (db) ->
    Object.keys(db).forEach (type) =>
      @define type, db[type]

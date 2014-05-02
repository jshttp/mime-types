
/**
 * http://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types
 * https://github.com/broofa/node-mime/blob/master/types/node.types
 *
 * Convert these text files to JSON for browser usage.
 */

var co = require('co')
var fs = require('fs')
var path = require('path')
var cogent = require('cogent')

function* get(url) {
  var res = yield* cogent(url, {
    string: true
  })

  if (res.statusCode !== 200)
    throw new Error('got status code ' + res.statusCode + ' from ' + url)

  var text = res.text
  var json = {}
  // http://en.wikipedia.org/wiki/Internet_media_type#Naming
  var re = /^(?:# )?([\w-]+\/[\w\+\.-]+)(?:\s+\w+)*$/
  text = text.split('\n')
  .filter(Boolean)
  .forEach(function (line) {
    line = line.trim()
    if (!line) return
    var match = re.exec(line)
    if (!match) return
    json[match[1]] = line.replace(/^(?:# )?([\w-]+\/[\w\+\.-]+)/, '').split(/\s+/).filter(Boolean)
  })
  fs.writeFileSync('lib/' + path.basename(url).split('.')[0] + '.json',
    JSON.stringify(json, null, 2))
}

co(function* () {
  yield [
    get('http://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types'),
    get('https://raw.githubusercontent.com/broofa/node-mime/master/types/node.types')
  ]
})()

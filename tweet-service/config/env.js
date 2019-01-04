const yaml = require('js-yaml')
const fs = require('fs')
const paths = require('./paths')
// Get document, or throw exception on error
global.CONFIG = {}
try {
  var doc = yaml.safeLoad(fs.readFileSync(paths.configYaml, 'utf8'))
  Object.keys(doc).forEach(function (key, index) {
    if (global.CONFIG[key]) {
      throw `env name is exist check key name in ${paths.configYaml} file`
    } else {
      global.CONFIG[key] = doc[key]
    }
  })
} catch (e) {
  console.log(e)
}

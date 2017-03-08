var fs = require('fs')
var path = require('path')
var test = require('tape')

var remark = require('remark')
var html = require('remark-html')
var bel = require('bel')

var mdComponents = require('../index')

test('basic', function (t) {
  var input = fs.readFileSync(path.join(__dirname, 'fixtures', 'basic.md'), 'utf8')
  var expected = fs.readFileSync(path.join(__dirname, 'fixtures', 'basic.html'), 'utf8')

  var components = {
    'component-name': function (data) {
      var el = bel`<div id="${data.properties.id}" class="${data.properties.class}">${data.body}</div>`
      el.dataset = data.attributes
      return el.toString()
    }
  }

  var actual = remark()
    .use(mdComponents, { components: components })
    .use(html)
    .processSync(input).contents.trim()

  t.equal(actual, expected)
  t.end()
})

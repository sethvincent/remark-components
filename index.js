var visit = require('unist-util-visit')
var remove = require('unist-util-remove')
var parseClass = require('parse-class')

module.exports = function remarkComponents (options) {
  options = options || {}
  var components = options.components || {}

  return function transformer (tree) {
    visit(tree, 'paragraph', function visitor (node, i, parent) {
      if (!node.children) return

      var child = node.children[0]
      if (child.type !== 'text') return
      if (child.value.indexOf(':::') !== 0) return

      var data = {}

      var lines = child.value.split('\n')

      if (lines.length > 1) {
        if (lines[lines.length -1] === ':::') {
          lines.pop()
        }
      }

      var head = lines[0].split(' ')
      head.shift()
      lines.shift()

      data.component = head[0]
      head.shift()

      if (head[0].indexOf('.') >= 0 || head[0].indexOf('#') >= 0) {
        data.properties = parseProperties(head[0])
        head.shift()
      }

      data.attributes = {}

      var i = 0
      var l = head.length
      for (i; i < l; i++) {
        var arg = head[i]
        if (arg.indexOf('=') >= 0) {
          var arr = arg.split('=')
          data.attributes[arr[0]] = arr[1]
        } else {
          data.attributes[arg] = true
        }
      }

      data.body = lines.join('\n')

      if (components[data.component]) {
        var el = components[data.component](data)
        node.type = 'html'
        node.value = el
      }
    })
  }
}

function parseProperties (str) {
  var props = {}
  var arr = str.split(/([\.#]?[^\s#.]+)/)
  var i = 0
  var l = arr.length

  for (i; i < l; i++) {
    var item = arr[i]
    var val = item.substring(1, item.length)

    if (item.length) {
      if (item[0] === '#') {
        props.id = val
      } else if (item[0] === '.') {
        props.class = props.class ? props.class + ' ' + val : val
      }
    }
  }

  return props
}

# remark-components

Turn simple markdown component syntax into arbitrary html.

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]
[![conduct][conduct]][conduct-url]

[npm-image]: https://img.shields.io/npm/v/remark-components.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/remark-components
[travis-image]: https://img.shields.io/travis/sethvincent/remark-components.svg?style=flat-square
[travis-url]: https://travis-ci.org/sethvincent/remark-components
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard
[conduct]: https://img.shields.io/badge/code%20of%20conduct-contributor%20covenant-green.svg?style=flat-square
[conduct-url]: CONDUCT.md

## About

remark-components might be helpful for embedding interactive elements, graphics, or any custom html into a markdown document.

## Work in progress

This is currently a sketch of an idea. Very open to feedback and contributions!

## Install

```sh
npm install --save sethvincent/remark-components
```

## Usage

```js
var remark = require('remark')
var html = require('remark-html')
var bel = require('bel')

var remarkComponents = require('remark-components')

var md = `::: example
example body
:::`

var components = {
  'example': function (data) {
    return bel`<div>${data.body}</div>`.toString()
  }
}

var file = remark()
  .use(remarkComponents, { components: components })
  .use(html)
  .processSync(md)

console.log(file.contents)
// => <div>example body</div>
```

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## Conduct

It's important that this project contributes to a friendly, safe, and welcoming environment for all, particularly for folks that are historically underrepresented in technology. Read this project's [code of conduct](CONDUCT.md)

## Change log

Read about the changes to this project in [CHANGELOG.md](CHANGELOG.md). The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## Contact

- **chat** – You can chat about this project at [http://gitter.im/sethvincent/ask](http://gitter.im/sethvincent/ask)
- **issues** – Please open issues in the [issues queue](https://github.com/sethvincent/remark-components/issues)
- **twitter** – [@sethdvincent](https://twitter.com/sethdvincent)

## License

[ISC](LICENSE.md)

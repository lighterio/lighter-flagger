# lighter-flagger
[![Chat](https://badges.gitter.im/chat.svg)](//gitter.im/lighterio/public)
[![Version](https://img.shields.io/npm/v/lighter-flagger.svg)](//www.npmjs.com/package/lighter-flagger)
[![Downloads](https://img.shields.io/npm/dm/lighter-flagger.svg)](//www.npmjs.com/package/lighter-flagger)
[![Build](https://img.shields.io/travis/lighterio/lighter-flagger.svg)](//travis-ci.org/lighterio/lighter-flagger)
[![Coverage](https://img.shields.io/codecov/c/github/lighterio/lighter-flagger/master.svg)](//codecov.io/gh/lighterio/lighter-flagger)
[![Style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](//www.npmjs.com/package/standard)

The `lighter-flagger` module is a lightweight event emitter with flags which
allow listeners to fire in the present or in the future, depending on whether
a flag is already set to a specified value or not.

## Installation

From your project directory, install and save as a dependency:
```bash
npm install --save lighter-flagger
```

## API

The `lighter-flagger` module exports a constructor that extends the Emitter
constructor from [`lighter-emitter`](//www.npmjs.com/package/lighter-emitter)
which extends [`lighter-type`](//www.npmjs.com/package/lighter-type). When
a Type (such as **Flagger**) is uppercased in documentation, it refers to the
constructor or its constructor properties. And when a type is lowercased (such
as **flagger**), it refers to an instance and its prototype properties.

###
Flagger.prototype.at
Flagger.prototype.get
Flagger.prototype.ready
Flagger.prototype.set
Flagger.prototype.then
Flagger.prototype.unwait
Flagger.prototype.waitFor
Flagger.prototype.wait
Flagger.prototype.when

## More on lighter-flagger...
* [Contributing](//github.com/lighterio/lighter-flagger/blob/master/CONTRIBUTING.md)
* [License (ISC)](//github.com/lighterio/lighter-flagger/blob/master/LICENSE.md)
* [Change Log](//github.com/lighterio/lighter-flagger/blob/master/CHANGELOG.md)
* [Roadmap](//github.com/lighterio/lighter-flagger/blob/master/ROADMAP.md)

# lighter-flagger
[![Chat](https://badges.gitter.im/chat.svg)](//gitter.im/lighterio/public)
[![Version](https://img.shields.io/npm/v/lighter-flagger.svg)](//www.npmjs.com/package/lighter-flagger)
[![Downloads](https://img.shields.io/npm/dm/lighter-flagger.svg)](//www.npmjs.com/package/lighter-flagger)
[![Build](https://img.shields.io/travis/lighterio/lighter-flagger.svg)](//travis-ci.org/lighterio/lighter-flagger)
[![Coverage](https://img.shields.io/coveralls/lighterio/lighter-flagger/master.svg)](//coveralls.io/r/lighterio/lighter-flagger)
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

### Emitter
The `lighter-flagger` module exports a constructor that extends the Emitter
constructor from [`lighter-emitter`](//www.npmjs.com/package/lighter-type)
which extends [`lighter-type`](//www.npmjs.com/package/lighter-type). When
a Type (such as **Flagger**) is uppercased in documentation, it refers to the
constructor or its constructor properties. And when a type is lowercased (such
as **flagger**), it refers to an instance and its prototype properties.

### Flagger Constructor
A new flagger object can be constructed simply with the `new` keyword.

```js
var Flagger = require('lighter-flagger')

// Create a brand new Flagger object.
var flagger = new Flagger()
```

#### Flagger.init(object)
Alternatively, a plain JavaScript object can be made into a flagger
by running the `init` method on it, thereby decorating it with
`Flagger.prototype` methods, and executing the Flagger constructor on
it. However, it does not become an instance of Flagger.

```js
var Flagger = require('lighter-flagger')

var flagger = new Flagger()
var object = {}
Flagger.init(object)

function hi (me) {
  me.on('hi', function (message) {
    console.log('Hi! ' + message + '.')
  })
  if (me instanceof Flagger) {
    me.emit('hi', 'I\'m a flagger')
  } else {
    me.emit('hi', 'I behave like a flagger')
  }
}

### Flagger Prototype

#### flagger.get(flag)
Get the value of a flag by name.

#### flagger.set(flag, value)
Set a flag, and emit its value.

#### flagger.when(flag, value, fn)
Call a function each time a flag is set to a value, including one call
immediately if the flag is already set to that value.

#### flagger.at(flag, value, fn)
Call a function once a flag is set to a value, which could happen at the
current time if the flag is already set to that value.


## More on lighter-flagger...
* [Contributing](//github.com/lighterio/lighter-flagger/blob/master/CONTRIBUTING.md)
* [License (ISC)](//github.com/lighterio/lighter-flagger/blob/master/LICENSE.md)
* [Change Log](//github.com/lighterio/lighter-flagger/blob/master/CHANGELOG.md)
* [Roadmap](//github.com/lighterio/lighter-flagger/blob/master/ROADMAP.md)

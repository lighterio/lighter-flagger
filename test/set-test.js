'use strict'
/* global describe it */

var Flagger = require('../lighter-flagger')
var is = global.is || require('exam/lib/is')

describe('Flagger.prototype.set', function () {
  it('sets a flag', function () {
    var o = {}
    Flagger.init(o)
    o.set('ready')
    is(o._flags.ready, true)
    o.set('mode', 'server')
    is(o._flags.mode, 'server')
  })

  it('does nothing if the value is unchanged', function () {
    var o = {}
    Flagger.init(o)
    o.set('ready')
    is(o._flags.ready, true)
    o.on('ready:true', is.fail)
    o.set('ready')
  })
})

'use strict'
/* global describe it */

var Flagger = require('../lighter-flagger')
var is = global.is || require('exam/lib/is')
var mock = global.mock || require('exam/lib/mock')

describe('Flagger.prototype.when', function () {
  it('runs a function when a flag becomes true', function () {
    var o = {c: ''}
    Flagger.init(o)
    o.when('ready', function () {
      o.c += 'a'
    })
    is(o.c, '')
    o.set('ready')
    is(o.c, 'a')
    o.when('ready', function () {
      o.c += 'b'
    })
    is(o.c, 'ab')
  })

  it('runs a function when a flag takes a specified value', function () {
    var o = new Flagger()
    var status = 'waiting'
    o.when('ready', false, function () {
      status = 'waiting'
    })
    o.when('ready', true, function () {
      status = 'ready'
    })
    is(status, 'waiting')
    o.set('ready', true)
    is(status, 'ready')
    o.set('ready', false)
    is(status, 'waiting')
  })

  it('runs immediately if a flag already has the specified value', function () {
    var o = new Flagger()
    var f = mock.count()
    o.set('ok', true)
    o.when('ok', true, f)
    is(f.value, 1)
  })

  it('supports object values', function () {
    var o = new Flagger()
    var f = mock.count()
    o.when('o', {a: 1}, f)
    o.set('o', {a: 1})
    is(f.value, 1)
  })
})

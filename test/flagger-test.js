'use strict'
/* global describe it */

var Flagger = require('../lighter-flagger')
var is = global.is || require('exam/lib/is')
var mock = global.mock || require('exam/lib/mock')

describe('Flagger', function () {
  it('has all expected methods', function () {
    var o = {}
    Flagger.init(o)
    is.function(o.on)
    is.function(o.off)
    is.function(o.emit)
    is.function(o.once)
    is.function(o.get)
    is.function(o.set)
    is.function(o.when)
    is.function(o.at)
  })

  describe('.prototype.set', function () {
    it('sets a flag', function () {
      var o = {}
      Flagger.init(o)
      o.set('ready')
      is(o._flags.ready, true)
      o.set('mode', 'server')
      is(o._flags.mode, 'server')
    })

    it('has no effect when called twice', function () {
      var o = {}
      Flagger.init(o)
      o.set('ready')
      is(o._flags.ready, true)
      o.set('ready')
      is(o._flags.ready, true)
    })
  })

  describe('.prototype.get', function () {
    it('returns undefined when flags haven\'t been set', function () {
      var o = new Flagger()
      var flag = o.get('nonexistent')
      is(flag, undefined)
    })

    it('gets the value of a flag', function () {
      var o = {}
      Flagger.init(o)
      o.set('phase', 1)
      is(o.get('phase'), 1)
    })
  })

  describe('.prototype.when', function () {
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

  describe('.prototype.at', function () {
    it('runs a function when a flag becomes true', function () {
      var o = new Flagger()
      var f = mock.count()
      o.at('ready', f)
      is(f.value, 0)
      o.set('ready')
      is(f.value, 1)
    })

    it('does not re-run when a flag becomes true again', function () {
      var o = new Flagger()
      var f = mock.count()
      o.at('ready', f)
      o.set('ready')
      is(f.value, 1)
      o.set('ready', false)
      o.set('ready')
      is(f.value, 1)
    })

    it('runs immediately if a flag already has the specified value', function () {
      var o = new Flagger()
      var f = mock.count()
      o.set('ok', true)
      o.at('ok', true, f)
      is(f.value, 1)
    })

    it('supports object values', function () {
      var o = new Flagger()
      var f = mock.count()
      o.at('o', {a: 1}, f)
      o.set('o', {a: 1})
      is(f.value, 1)
    })
  })
})

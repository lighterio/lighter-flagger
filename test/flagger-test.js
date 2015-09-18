var Flagger = require('../lighter-flagger')
var is = global.is || require('exam/lib/is')

describe('Flagger', function () {

  it('has all expected methods', function () {
    var o = {}
    Flagger.decorate(o, Flagger.prototype)
    is.function(o.on)
    is.function(o.emit)
    is.function(o.removeListener)
    is.function(o.removeAllListeners)
    is.function(o.once)
    is.function(o.getFlag)
    is.function(o.setFlag)
    is.function(o.when)
  })

  describe('.prototype.setFlag', function () {

    it('sets a flag', function () {
      var o = {}
      Flagger.decorate(o, Flagger.prototype)
      o.setFlag('ready')
      is(o._flags.ready, true)
      o.setFlag('mode', 'server')
      is(o._flags.mode, 'server')
    })

    it('has no effect when called twice', function () {
      var o = {}
      Flagger.decorate(o, Flagger.prototype)
      o.setFlag('ready')
      is(o._flags.ready, true)
      o.setFlag('ready')
      is(o._flags.ready, true)
    })

  })

  describe('.prototype.getFlag', function () {

    it('returns undefined when flags haven\'t been set', function () {
      var o = new Flagger()
      var flag = o.getFlag('nonexistent')
      is(flag, undefined)
    })

    it('gets the value of a flag', function () {
      var o = {}
      Flagger.decorate(o, Flagger.prototype)
      o.setFlag('phase', 1)
      is(o.getFlag('phase'), 1)
    })

  })

  describe('.prototype.when', function () {

    it('runs a function when a flag becomes true', function () {
      var o = {c: ''}
      Flagger.decorate(o, Flagger.prototype)
      o.when('ready', function () {
        o.c += 'a'
      })
      is(o.c, '')
      o.setFlag('ready')
      is(o.c, 'a')
      o.when('ready', function () {
        o.c += 'b'
      })
      is(o.c, 'ab')
    })

    it('runs a function when a flag takes a specified value', function () {
      var o = {status: 'waiting'}
      Flagger.decorate(o, Flagger.prototype)
      o.when('ready', false, function () {
        o.status = 'waiting'
      })
      o.when('ready', true, function () {
        o.status = 'ready'
      })
      is(o.status, 'waiting')
      o.setFlag('ready', true)
      is(o.status, 'ready')
      o.setFlag('ready', false)
      is(o.status, 'waiting')
    })

    it('runs immediately if a flag already has the specified value', function () {
      var o = new Flagger()
      Flagger.decorate(o, Flagger.prototype)
      o.setFlag('ok', true)
      o.when('ok', true, function () {
        o.ok = true
      })
      is(o.ok, true)
    })

  })

})

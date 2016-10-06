'use strict'
/* global describe it */

var Flagger = require('../lighter-flagger')
var is = global.is || require('exam-is')
var mock = global.mock || require('exam-mock')

describe('Flagger.prototype.at', function () {
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

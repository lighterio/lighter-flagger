'use strict'
/* global describe it */

var Flagger = require('../lighter-flagger')
var is = global.is || require('exam/lib/is')

describe('Flagger.prototype.unwait', function () {
  it('should decrement', function () {
    var f = new Flagger()
    f._waitCount = 1
    f.unwait()
    is(f._waitCount, 0)
  })

  it('should decrement parents', function () {
    var p = new Flagger()
    p._waitCount = 1
    var c = new Flagger(p)
    c._waitCount = 1
    c.unwait()
    is(p._waitCount, 0)
  })

  it('can be called more than once', function () {
    var f = new Flagger()
    f.wait(3)
    f.unwait(2)
    f.unwait(1)
    is(f._waitCount, 0)
  })
})

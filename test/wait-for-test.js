'use strict'
/* global describe it */

var Flagger = require('../lighter-flagger')
var is = global.is || require('exam/lib/is')

describe('Flagger.prototype.waitFor', function () {
  it('adds the child count', function () {
    var p = new Flagger()
    var c = new Flagger()
    c.wait(9)
    p.waitFor(c)
    is(p._waitCount, 9)
  })
})

'use strict'
/* global describe it */

var Flagger = require('../lighter-flagger')
var is = global.is || require('exam-is')

describe('Flagger.prototype.wait', function () {
  it('should increment', function () {
    var f = new Flagger()
    is(f._waitCount, 0)
    f.wait()
    is(f._waitCount, 1)
  })

  it('should increment parents', function () {
    var p = new Flagger()
    var c = new Flagger(p)
    is(p._waitCount, 0)
    c.wait()
    is(p._waitCount, 1)
  })
})

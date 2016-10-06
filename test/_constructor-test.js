'use strict'
/* global describe it */

var Flagger = require('../lighter-flagger')
var is = global.is || require('exam-is')

describe('Flagger', function () {
  it('has all expected methods', function () {
    var f = new Flagger()
    is.function(f.on)
    is.function(f.off)
    is.function(f.emit)
    is.function(f.once)
    is.function(f.get)
    is.function(f.set)
    is.function(f.when)
    is.function(f.at)
    is.function(f.wait)
    is.function(f.unwait)
    is.function(f.waitFor)
    is.function(f.then)
    is.function(f.ready)
  })

  it('ensures that parents have expected methods', function (done) {
    var p = {}
    var c = new Flagger(p)
    is.function(p.wait)
    is.function(p.unwait)
    is.function(p.waitFor)
    p.ready(done)
    c.wait()
    c.unwait()
  })
})

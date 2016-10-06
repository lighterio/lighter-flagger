'use strict'
/* global describe it */

var Flagger = require('../lighter-flagger')
var is = global.is || require('exam-is')
var mock = global.mock || require('exam-mock')

describe('Flagger.prototype.then', function () {
  it('calls a function once ready', function () {
    var f = new Flagger()
    var t = mock.count()
    f.then(t)
    f.wait()
    f.unwait()
    is(t.value, 1)
    f.wait()
    f.unwait()
    is(t.value, 1)
  })
})

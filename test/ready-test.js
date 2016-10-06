'use strict'
/* global describe it */

var Flagger = require('../lighter-flagger')
var is = global.is || require('exam-is')
var mock = global.mock || require('exam-mock')

describe('Flagger.prototype.ready', function () {
  it('calls a function when ready', function () {
    var f = new Flagger()
    var r = mock.count()
    f.ready(r)
    f.wait()
    f.unwait()
    is(r.value, 1)
    f.wait()
    f.unwait()
    is(r.value, 2)
  })
})

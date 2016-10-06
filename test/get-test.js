'use strict'
/* global describe it */

var Flagger = require('../lighter-flagger')
var is = global.is || require('exam-is')

describe('Flagger.prototype.get', function () {
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

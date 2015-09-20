/**
 * Flagger is an EventEmitter with the ability to store flag values and run
 * listener functions immediately if a flag already has the target value,
 * or listen for a change if it doesn't.
 */

var Emitter = require('lighter-emitter')
module.exports = Emitter.extend({

  /**
   * Empty constructor (for speed).
   */
  init: function () {},

  /**
   * Get the value of a flag.
   */
  getFlag: function (flag) {
    return (this._flags || 0)[flag]
  },

  /**
   * Set a flag, like "ready" and emit its value.
   */
  setFlag: function (flag, value) {
    var flags = this._flags || (this._flags = {})
    if (arguments.length < 2) {
      value = true
    }
    if (flags[flag] !== value) {
      flags[flag] = value
      this.emit(flag, value)
      this.emit(flag + ':' + value)
    }
    return this
  },

  /**
   * Fire an event when a flag is set (even if it was set in the past).
   */
  when: function (flag, value, fn) {
    var flags = this._flags || 0
    if (typeof value === 'function') {
      fn = value
      value = true
    }
    if (flags[flag] === value) {
      fn.call(this, value)
    }
    this.on(flag + ':' + value, fn)
    return this
  }

})

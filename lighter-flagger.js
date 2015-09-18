/**
 * Flagger is an EventEmitter with the ability to store flag values and run
 * listener functions immediately if a flag already has the target value,
 * or listen for a change if it doesn't.
 */

var Emitter = require('lighter-emitter')
module.exports = Emitter.extend({

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
    var self = this
    var flags = self._flags || (self._flags = {})
    if (arguments.length < 2) {
      value = true
    }
    if (flags[flag] !== value) {
      flags[flag] = value
      self.emit(flag, value)
      self.emit(flag + ':' + value)
    }
    return self
  },

  /**
   * Fire an event when a flag is set (even if it was set in the past).
   */
  when: function (flag, value, fn) {
    var self = this
    var flags = self._flags || 0
    if (arguments.length < 3) {
      fn = value
      value = true
    }
    if (flags[flag] === value) {
      fn.call(self, value)
      return self
    }
    self.on(flag + ':' + value, fn)
    return self
  }

})

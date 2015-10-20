'use strict'

/**
 * Flagger is an EventEmitter with the ability to store flag values and run
 * listener functions immediately if a flag already has the target value,
 * or listen for a change if it doesn't.
 */
var Emitter = require('lighter-emitter')
module.exports = Emitter.extend({

  /**
   * Set up an emitter with flags.
   */
  init: function Flagger () {
    Emitter.call(this)
    this._flags = {}
  },

  /**
   * Get the value of a flag.
   *
   * @param  {String} flag  A flag name.
   * @return {Object}       The value of the flag.
   */
  get: function get (flag) {
    return this._flags[flag]
  },

  /**
   * Set a flag, and emit its value.
   *
   * @param  {String} flag    A flag name.
   * @param  {Object} value   A flag value.
   * @return {Object}         The value of the flag.
   */
  set: function set (flag, value) {
    if (arguments.length < 2) {
      value = true
    }
    if (this._flags[flag] !== value) {
      this._flags[flag] = value
      this.emit(flag, value)
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      this.emit(flag + '==' + value)
    }
    return value
  },

  /**
   * Call a function each time a flag is set to a value, including one call
   * immediately if the flag is already set to that value.
   *
   * @param  {String}   flag   A flag name.
   * @param  {Object}   value  A value to listen for (default: `true`).
   * @param  {Function} fn     A function to call with `fn(value)`.
   * @return {Flagger}         Itself.
   */
  when: function when (flag, value, fn) {
    if (typeof value === 'function') {
      fn = value
      value = true
    }
    if (this._flags[flag] === value) {
      fn.call(this, value)
    }
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    this.on(flag + '==' + value, fn)
    return this
  },

  /**
   * Call a function once a flag is set to a value, which could happen at the
   * current time if the flag is already set to that value.
   *
   * @param  {String}   flag   A flag name.
   * @param  {Object}   value  A value to listen for (default: `true`).
   * @param  {Function} fn     A function to call with `fn(value)`.
   * @return {Flagger}         Itself.
   */
  at: function at (flag, value, fn) {
    if (typeof value === 'function') {
      fn = value
      value = true
    }
    if (this._flags[flag] === value) {
      fn.call(this, value)
    } else {
      if (typeof value === 'object') {
        value = JSON.stringify(value)
      }
      this.once(flag + '==' + value, fn)
    }
    return this
  }

})

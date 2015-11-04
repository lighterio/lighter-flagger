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
  init: function Flagger (waitParent) {
    Emitter.call(this)
    this._flags = {}
    this._waitCount = 0
    this._waitParents = []
    this._waitChildren = 0
    if (waitParent) {
      if (!waitParent.waitFor) {
        this.constructor.init(waitParent)
      }
      waitParent.waitFor(this)
    }
  },

  /**
   * Get the value of a flag.
   *
   * @param  {String} flag  A flag name.
   * @return {Any}          The value of the flag.
   */
  get: function get (flag) {
    return this._flags[flag]
  },

  /**
   * Set a flag, and emit its value.
   *
   * @param  {String} flag    A flag name.
   * @param  {Any}    value   A flag value.
   * @return {Any}            The value of the flag.
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
   * @param  {Any}      value  A value to listen for (default: `true`).
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
   * @param  {Any}      value  A value to listen for (default: `true`).
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
  },

  /**
   * Increment the number of waiting operations in progress.
   */
  wait: function (count) {
    count = count || 1
    var parents = this._waitParents
    for (var i = 0, l = parents.length; i < l; i++) {
      var parent = parents[i]
      parent.wait(count)
    }
    this._waitCount += count
    this.set('ready', false)
  },

  /**
   * Decrement the number of waiting operations in progress.
   * If no operations are in progress, run the next queued action.
   */
  unwait: function (count) {
    count = count || 1
    this._waitCount -= count
    if (!this._waitCount) {
      this.set('ready', true)
    }
    var parents = this._waitParents
    for (var i = 0, l = parents.length; i < l; i++) {
      var parent = parents[i]
      parent.unwait(count)
    }
  },

  /**
   * Wait for a child Flagger.
   */
  waitFor: function (child) {
    child._waitParents.push(this)
    if (child._waitCount) {
      this.wait(child._waitCount)
    }
  },

  /**
   * Add a function to the queue of runnable actions (without duplication).
   * If we're not waiting for something, run the function now.
   */
  ready: function (fn) {
    return this.when('ready', fn)
  },

  /**
   * Add a function to the queue of runnable actions (without duplication).
   * If we're not waiting for something, run the function now.
   */
  then: function (fn) {
    return this.at('ready', fn)
  }
})

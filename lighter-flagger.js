'use strict'

/**
 * # Flagger
 * Flagger is an EventEmitter with the ability to store flag values and run
 * listener functions immediately if a flag already has the target value,
 * or listen for a change if it doesn't.
 */
var Emitter = require('lighter-emitter')
module.exports = Emitter.extend({

  /**
   * ### Constructor
   * When used with the `new` keyword, the `Flagger` constructor creates an
   * event emitter with flags. In addition, `Flagger` extends `Emitter`, which
   * extends `Type`, so it inherits constructor and prototype methods from:
   * * [lighter-stream](https://github.com/lighterio/lighter-stream) and
   * * [lighter-emitter](https://github.com/lighterio/lighter-emitter)
   *
   * Example:
   * ```
   * // A Flagger can be extended.
   * var Reader = Flagger.extend({
   *
   * })
   * var reader = new Flagger()
   *
   * // So we can do something when it's ready.
   * thenable.then(function () {
   *   console.log('Ready!')
   * })
   *
   * // If it's waiting for stuff, it's not ready.
   * thenable.wait()
   *
   * // If it stops waiting, then it's ready.
   * thenable.unwait()
   * > Ready!
   * ```
   */
  init: function Flagger (waitParent) {
    Emitter.call(this)
    this._flags = {}
    this._waitCount = 0
    this._waitParents = []
    if (waitParent) {
      if (!waitParent.waitFor) {
        this.constructor.init(waitParent)
      }
      waitParent.waitFor(this)
    }
  },

  /**
   * ### Flagger.prototype.get
   * Get the value of a flag.
   *
   * @param  {String} flag  A flag name.
   * @return {Any}          The value of the flag.
   */
  get: function get (flag) {
    return this._flags[flag]
  },

  /**
   * ### Flagger.prototype.set
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
   * ### Flagger.prototype.when
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
   * ### Flagger.prototype.at
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
   * ### Flagger.prototype.wait
   * Increment the number of waiting operations in progress.
   *
   * @param  {Number}  count  An optional decrement (otherwise 1).
   * @return {Flagger}        Itself.
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
    return this
  },

  /**
   * ### Flagger.prototype.unwait
   * Decrement the number of waiting operations in progress.
   * If no operations are in progress, declare this flagger to be "ready".
   *
   * @param  {Number}  count  An optional decrement (otherwise 1).
   * @return {Flagger}        Itself.
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
    return this
  },

  /**
   * ### Flagger.prototype.waitFor
   * Wait for a child Flagger to become "ready" before declaring this flagger
   * to be "ready".
   *
   * @param  {Flagger} child  A new child flagger.
   * @return {Flagger}        Itself.
   */
  waitFor: function (child) {
    child._waitParents.push(this)
    if (child._waitCount) {
      this.wait(child._waitCount)
    }
    return this
  },

  /**
   * ### Flagger.prototype.ready
   * Run a callback function each time this flagger enters its "ready" state,
   * and run immediately if the flagger is already "ready".
   *
   * @param  {Function} fn  A callback function.
   * @return {Object}       Itself.
   */
  ready: function (fn) {
    return this.when('ready', fn)
  },

  /**
   * ### Flagger.prototype.then
   * Run a callback function once when this flagger enters its "ready" state,
   * or run immediately if the flagger is already "ready".
   *
   * @param  {Function} fn  A callback function.
   * @return {Object}       Itself.
   */
  then: function (fn) {
    return this.at('ready', fn)
  }
})

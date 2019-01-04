const vec3 = require('../vec3')

const clone = require('./clone')
const create = require('./create')
const fromData = require('./fromData')

/**
 * Create a new line in the opposite direction as the given.
 *
 * @param {line3} [out] - receiving line
 * @param {line3} line the 3D line to reverse
 * @returns {line3} a new unbounded 3D line
 */
const reverse = (...params) => {
  let out
  let line
  if (params.length === 1) {
    out = create()
    line = params[0]
  } else {
    out = params[0]
    line = params[1]
  }

  let point = vec3.clone(line[0])
  let direction = vec3.negate(line[1])
  return clone(out, fromData(point, direction))
}

module.exports = reverse

const create = require('./create')

/**
 * Rotates a vec2 by an angle
 *
 * @param {Number} angle the angle of rotation (in radians)
 * @param {vec2} vector the vector to rotate
 * @returns {vec2} out
 */
const rotate = (angle, vector) => {
  let out = create()

  const c = Math.cos(angle)
  const s = Math.sin(angle)
  const x = vector[0]
  const y = vector[1]

  out[0] = x * c - y * s
  out[1] = x * s + y * c

  return out
}

module.exports = rotate

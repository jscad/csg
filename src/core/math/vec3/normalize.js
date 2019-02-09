const create = require('./create')

/**
 * Normalize a vec3
 *
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
const normalize = (a) => {
  const out = create()
  const x = a[0]
  const y = a[1]
  const z = a[2]
  let len = x * x + y * y + z * z
  if (len > 0) {
    // TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len)
    out[0] = a[0] * len
    out[1] = a[1] * len
    out[2] = a[2] * len
  }
  return out
}

module.exports = normalize

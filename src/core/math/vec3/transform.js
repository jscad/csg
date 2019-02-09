const create = require('./create')

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {mat4} matrix - matrix matrix to transform with
 * @param {vec3} vector - vector the vector to transform
 * @returns {vec3} out
 */
const transform = (matrix, vector) => {
  const out = create()
  const x = vector[0]
  const y = vector[1]
  const z = vector[2]
  let w = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15]
  w = w || 1.0
  out[0] = (matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12]) / w
  out[1] = (matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13]) / w
  out[2] = (matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14]) / w
  return out
}

module.exports = transform

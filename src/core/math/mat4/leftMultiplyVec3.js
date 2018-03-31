const fromValues = require('../vec3/fromValues')

// Multiply a Vector3 (interpreted as 3 column, 1 row) by this matrix
// (result = v*M)
// Fourth element is taken as 1
const lefttMultiplyVec3 = (matrix, vector) => {
  const [v0, v1, v2] = vector
  const v3 = 1
  let x = v0 * matrix[0] + v1 * matrix[4] + v2 * matrix[8] + v3 * matrix[12]
  let y = v0 * matrix[1] + v1 * matrix[5] + v2 * matrix[9] + v3 * matrix[13]
  let z = v0 * matrix[2] + v1 * matrix[6] + v2 * matrix[10] + v3 * matrix[14]
  let w = v0 * matrix[3] + v1 * matrix[7] + v2 * matrix[11] + v3 * matrix[15]
    // scale such that fourth element becomes 1:
  if (w !== 1) {
    let invw = 1.0 / w
    x *= invw
    y *= invw
    z *= invw
  }
  return fromValues(x, y, z)
}

module.exports = lefttMultiplyVec3
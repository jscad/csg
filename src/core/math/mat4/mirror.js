const create = require('./create')
const fromValues = require('./fromValues')

/**
 * m the mat4 by the dimensions in the given vec3
 * create an affine matrix for mirroring into an arbitrary plane:
 *
 * @param {mat4} out the receiving matrix (optional)
 * @param {vec3} v the vec3 to mirror the matrix by
 * @param {mat4} a the matrix to mirror
 * @returns {mat4} out
 */
const mirror = (...params) => {
  let out
  let a
  let v
  if (params.length === 2) {
    out = create()
    v = params[0]
    a = params[1]
  } else {
    out = params[0]
    v = params[1]
    a = params[2]
  }

  const x = v[0]
  const y = v[1]
  const z = v[2]

  out[0] = a[0] * x
  out[1] = a[1] * x
  out[2] = a[2] * x
  out[3] = a[3] * x
  out[4] = a[4] * y
  out[5] = a[5] * y
  out[6] = a[6] * y
  out[7] = a[7] * y
  out[8] = a[8] * z
  out[9] = a[9] * z
  out[10] = a[10] * z
  out[11] = a[11] * z
  out[12] = a[12]
  out[13] = a[13]
  out[14] = a[14]
  out[15] = a[15]
  return out
}

/**
 * m the mat4 by the dimensions in the given vec3
 * create an affine matrix for mirroring into an arbitrary plane:
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to mirror
 * @param {vec4} plane the vec4 to mirror the matrix by
 * @returns {mat4} out
 */
const mirroring = (...params) => {
  let out
  let a
  let plane
  if (params.length === 2) {
    out = create()
    plane = params[0]
    a = params[1]
  } else {
    out = params[0]
    plane = params[1]
    a = params[2]
  }
  const [nx, ny, nz, w] = plane
  const elements = [
    (1.0 - 2.0 * nx * nx), (-2.0 * ny * nx), (-2.0 * nz * nx), 0,
    (-2.0 * nx * ny), (1.0 - 2.0 * ny * ny), (-2.0 * nz * ny), 0,
    (-2.0 * nx * nz), (-2.0 * ny * nz), (1.0 - 2.0 * nz * nz), 0,
    (2.0 * nx * w), (2.0 * ny * w), (2.0 * nz * w), 1
  ]
  return fromValues(...elements)
}

module.exports = mirror

const {CAG} = require('../../csg')// we have to import from top level otherwise prototypes are not complete..
const {fromPoints} = require('../core/CAGFactories')

/** Construct a square/rectangle
 * @param {Object} [options] - options for construction
 * @param {Float} [options.size=1] - size of the square, either as array or scalar
 * @param {Boolean} [options.center=true] - wether to center the square/rectangle or not
 * @returns {CAG} new square
 *
 * @example
 * let square1 = square({
 *   size: 10
 * })
 */
function square () {
  let v = [1, 1]
  let off
  let a = arguments
  let params = a[0]

  if (params && Number.isFinite(params)) v = [params, params]
  if (params && params.length) {
    v = a[0]
    params = a[1]
  }
  if (params && params.size && params.size.length) v = params.size

  off = [v[0] / 2, v[1] / 2]
  if (params && params.center === true) off = [0, 0]

  return CAG.rectangle({center: off, radius: [v[0] / 2, v[1] / 2]})
}

/** Construct a circle
 * @param {Object} [options] - options for construction
 * @param {Float} [options.r=1] - radius of the circle
 * @param {Integer} [options.fn=32] - segments of circle (ie quality/ resolution)
 * @param {Boolean} [options.center=true] - wether to center the circle or not
 * @returns {CAG} new circle
 *
 * @example
 * let circle1 = circle({
 *   r: 10
 * })
 */
function circle (params) {
  const defaults = {
    r: 1,
    fn: 32,
    center: false
  }
  let {r, fn, center} = Object.assign({}, defaults, params)
  if (params && !params.r && !params.fn && !params.center) r = params
  let offset = center === true ? [0, 0] : [r, r]
  return CAG.circle({center: offset, radius: r, resolution: fn})
}

/** Construct a polygon either from arrays of paths and points, or just arrays of points
 * nested paths (multiple paths) and flat paths are supported
 * @param {Object} [options] - options for construction
 * @param {Array} [options.paths] - paths of the polygon : either flat or nested array
 * @param {Array} [options.points] - points of the polygon : either flat or nested array
 * @returns {CAG} new polygon
 *
 * @example
 * let poly = polygon([0,1,2,3,4])
 * or
 * let poly = polygon({path: [0,1,2,3,4]})
 * or
 * let poly = polygon({path: [0,1,2,3,4], points: [2,1,3]})
 */
function polygon (params) { // array of po(ints) and pa(ths)
  let points = [ ]
  if (params.paths && params.paths.length && params.paths[0].length) { // pa(th): [[0,1,2],[2,3,1]] (two paths)
    for (let j = 0; j < params.paths.length; j++) {
      for (let i = 0; i < params.paths[j].length; i++) {
        points[i] = params.points[params.paths[j][i]]
      }
    }
  } else if (params.paths && params.paths.length) { // pa(th): [0,1,2,3,4] (single path)
    for (let i = 0; i < params.paths.length; i++) {
      points[i] = params.points[params.paths[i]]
    }
  } else { // pa(th) = po(ints)
    if (params.length) {
      points = params
    } else {
      points = params.points
    }
  }
  // -> single path in points list
  if (typeof points[0][0] !== 'object') {
    return fromPoints(points)
  }
  // -> multiple paths in points list
  // First pass: create a collection of CAG paths
  let paths = []
  points.forEach(path => {
    paths.push(fromPoints(path))
  })
  // Second pass: make a three of paths
  let three = {}
  let point = null
  // for each polygon extract parents and childs polygons
  paths.forEach((p1, i) => {
    // only check for first point in polygon
    point = p1.sides[0].vertex0.pos
    // check for intersection
    paths.forEach((p2, y) => {
      if (p1 !== p2) {
        // create default node
        three[i] || (three[i] = { parents: [], isHole: false })
        three[y] || (three[y] = { parents: [], isHole: false })
        // check if point in poylgon
        if (p2.hasPointInside(point)) {
          // push parent and child
          three[i].parents.push(y)

          // odd parents number ==> hole
          three[i].isHole = !! (three[i].parents.length % 2)
          three[y].isHole = !! (three[y].parents.length % 2)
        }
      }
    })
  })
  // Third pass: subtract holes
  let path = null
  for (key in three) {
    path = three[key]
    if (path.isHole) {
      delete three[key] // remove holes for final pass
      path.parents.forEach(parentKey => {
        paths[parentKey] = paths[parentKey].subtract(paths[key])
      })
    }
  }
  // Fourth and last pass: create final CAG object
  let cag = new CAG()
  for (key in three) {
    cag = cag.union(paths[key])
  }
  return cag
}

// FIXME: errr this is kinda just a special case of a polygon , why do we need it ?
/** Construct a triangle
 * @returns {CAG} new triangle
 *
 * @example
 * let triangle = trangle({
 *   length: 10
 * })
 */
function triangle () {
  let a = arguments
  if (a[0] && a[0].length) a = a[0]
  return fromPoints(a)
}

module.exports = {
  circle,
  square,
  polygon,
  triangle
}

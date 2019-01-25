const FuzzyFactory3 = require('../fuzzyfactory/FuzzyFactory3')

const reTesselateCoplanarPolygons = require('./reTesselateCoplanarPolygons')
const fromPolygons = require('./fromPolygons')

/*
  After boolean operations all coplanar polygon fragments are joined by a retesselating
  operation. geom3.reTesselate(geom).
  Retesselation is done through a linear sweep over the polygon surface.
  The sweep line passes over the y coordinates of all vertices in the polygon.
  Polygons are split at each sweep line, and the fragments are joined horizontally and vertically into larger polygons
  (making sure that we will end up with convex polygons).
*/
const retessellate = (geometry) => {
console.log('***** retessellate')
  if (!geometry.isCanonicalized) {
    new Error('geometry must be canonical, call canonicalize first')
  }

  if (geometry.isRetesselated) {
    return geometry
  } else {
    let isCanonicalized = geometry.isCanonicalized

    let polygonsPerPlane = new Map()
    geometry.polygons.map( (polygon) => {
      let values = polygonsPerPlane.get(polygon.plane)
      if (values === undefined) {
        values = [polygon]
        polygonsPerPlane.set(polygon.plane, values)
      } else {
        values.push(polygon)
      }
    })

    let destpolygons = []
    polygonsPerPlane.forEach( (sourcepolygons) => {
console.log(sourcepolygons.length)
      if (sourcepolygons.length < 2) {
        destpolygons = destpolygons.concat(sourcepolygons)
      } else {
        const retesselayedpolygons = reTesselateCoplanarPolygons(sourcepolygons)
        destpolygons = destpolygons.concat(retesselayedpolygons)
      }
    })

    let result = fromPolygons(destpolygons)
    result.isCanonicalized = true
    result.isRetesselated = true
    // TODO result.properties = geometry.properties // keep original properties

    polygonsPerPlane.clear()
    return result
  }
}

module.exports = retessellate

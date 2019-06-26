const test = require('ava')

const comparePolygonsAsPoints = require('../../../test/helpers/comparePolygonsAsPoints')

const { geom2, geom3 } = require('../../geometry')

const { circle, rectangle, sphere, cuboid } = require('../../primitives')

const { subtract } = require('./index')

// test('subtract: subtract of a path produces expected changes to points', t => {
//   let geometry = path.fromPoints({}, [[0, 1, 0], [1, 0, 0]])
//
//   geometry = subtract({normal: [1, 0, 0]}, geometry)
//   let obs = path.toPoints(geometry)
//   let exp = [ { _x: 0, _y: 1, _z: 0 }, { _x: -1, _y: 0, _z: 0 } ]
//
//   t.deepEqual(obs, exp)
// })

test('subtract: subtract of one or more geom2 objects produces expected geometry', t => {
  let geometry1 = circle({ radius: 2, segments: 8 })

  // subtract of one object
  let result1 = subtract(geometry1)
  let obs = geom2.toPoints(result1)
  let exp = [
    new Float32Array([ 2, 0 ]),
    new Float32Array([ 1.4142135381698608, 1.4142135381698608 ]),
    new Float32Array([ 1.2246468525851679e-16, 2 ]),
    new Float32Array([ -1.4142135381698608, 1.4142135381698608 ]),
    new Float32Array([ -2, 2.4492937051703357e-16 ]),
    new Float32Array([ -1.4142135381698608, -1.4142135381698608 ]),
    new Float32Array([ -3.6739402930577075e-16, -2 ]),
    new Float32Array([ 1.4142135381698608, -1.4142135381698608 ])
  ]
  t.is(obs.length, 8)
  t.deepEqual(obs, exp)

  // subtract of two non-overlapping objects
  let geometry2 = rectangle({ size: [2, 2], center: [10, 10] })

  let result2 = subtract(geometry1, geometry2)
  obs = geom2.toPoints(result2)
  exp = [
    new Float32Array([ 2, 0 ]),
    new Float32Array([ 1.4142135381698608, 1.4142135381698608 ]),
    new Float32Array([ 1.2246468525851679e-16, 2 ]),
    new Float32Array([ -1.4142135381698608, 1.4142135381698608 ]),
    new Float32Array([ -2, 2.4492937051703357e-16 ]),
    new Float32Array([ -1.4142135381698608, -1.4142135381698608 ]),
    new Float32Array([ -3.6739402930577075e-16, -2 ]),
    new Float32Array([ 1.4142135381698608, -1.4142135381698608 ])
  ]
  t.is(obs.length, 8)
  t.deepEqual(obs, exp)

  // subtract of two partially overlapping objects
  let geometry3 = rectangle({ size: [9, 9] })

  let result3 = subtract(geometry2, geometry3)
  obs = geom2.toPoints(result3)
  exp = [
    new Float32Array([ 12, 12 ]),
    new Float32Array([ 9, 9 ]),
    new Float32Array([ 8, 9 ]),
    new Float32Array([ 8, 12 ]),
    new Float32Array([ 9, 8 ]),
    new Float32Array([ 12, 8 ])
  ]
  t.is(obs.length, 6)
  t.deepEqual(obs, exp)

  // subtract of two completely overlapping objects
  let result4 = subtract(geometry1, geometry3)
  obs = geom2.toPoints(result4)
  exp = [
  ]
  t.is(obs.length, 0)
  t.deepEqual(obs, exp)
})

test('subtract: subtract of one or more geom3 objects produces expected geometry', t => {
  let geometry1 = sphere({ radius: 2, segments: 8 })

  // subtract of one object
  let result1 = subtract(geometry1)
  let obs = geom3.toPoints(result1)
  let exp = [
    [ [2, 0, 0], [1.4142135381698608, -1.4142135381698608, 0],
      [1, -1, -1.4142135381698608], [1.4142135381698608, 0, -1.4142135381698608] ],
    [ [1.4142135381698608, 0, 1.4142135381698608], [1, -1, 1.4142135381698608],
      [1.4142135381698608, -1.4142135381698608, 0], [2, 0, 0] ],
    [ [1.4142135381698608, 0, -1.4142135381698608], [1, -1, -1.4142135381698608],
      [1.2246468525851679e-16, 0, -2] ],
    [ [1.2246468525851679e-16, 0, 2], [1, -1, 1.4142135381698608],
      [1.4142135381698608, 0, 1.4142135381698608] ],
    [ [1.4142135381698608, -1.4142135381698608, 0], [1.2246468525851679e-16, -2, 0],
      [8.659561265171044e-17, -1.4142135381698608, -1.4142135381698608], [1, -1, -1.4142135381698608] ],
    [ [1, -1, 1.4142135381698608], [8.659561265171044e-17, -1.4142135381698608, 1.4142135381698608],
      [1.2246468525851679e-16, -2, 0], [1.4142135381698608, -1.4142135381698608, 0] ],
    [ [1, -1, -1.4142135381698608], [8.659561265171044e-17, -1.4142135381698608, -1.4142135381698608],
      [8.659560603426554e-17, -8.659560603426554e-17, -2] ],
    [ [8.659560603426554e-17, -8.659560603426554e-17, 2],
      [8.659561265171044e-17, -1.4142135381698608, 1.4142135381698608], [1, -1, 1.4142135381698608] ],
    [ [1.2246468525851679e-16, -2, 0], [-1.4142135381698608, -1.4142135381698608, 0],
      [-1, -1, -1.4142135381698608], [8.659561265171044e-17, -1.4142135381698608, -1.4142135381698608] ],
    [ [8.659561265171044e-17, -1.4142135381698608, 1.4142135381698608], [-1, -1, 1.4142135381698608],
      [-1.4142135381698608, -1.4142135381698608, 0], [1.2246468525851679e-16, -2, 0] ],
    [ [8.659561265171044e-17, -1.4142135381698608, -1.4142135381698608], [-1, -1, -1.4142135381698608],
      [7.49879952078994e-33, -1.2246468525851679e-16, -2] ],
    [ [7.49879952078994e-33, -1.2246468525851679e-16, 2], [-1, -1, 1.4142135381698608],
      [8.659561265171044e-17, -1.4142135381698608, 1.4142135381698608] ],
    [ [-1.4142135381698608, -1.4142135381698608, 0], [-2, -2.4492937051703357e-16, 0],
      [-1.4142135381698608, -1.7319122530342089e-16, -1.4142135381698608], [-1, -1, -1.4142135381698608] ],
    [ [-1, -1, 1.4142135381698608], [-1.4142135381698608, -1.7319122530342089e-16, 1.4142135381698608],
      [-2, -2.4492937051703357e-16, 0], [-1.4142135381698608, -1.4142135381698608, 0] ],
    [ [-1, -1, -1.4142135381698608], [-1.4142135381698608, -1.7319122530342089e-16, -1.4142135381698608],
      [-8.659560603426554e-17, -8.659560603426554e-17, -2] ],
    [ [-8.659560603426554e-17, -8.659560603426554e-17, 2],
      [-1.4142135381698608, -1.7319122530342089e-16, 1.4142135381698608], [-1, -1, 1.4142135381698608] ],
    [ [-2, -2.4492937051703357e-16, 0], [-1.4142135381698608, 1.4142135381698608, 0],
      [-1, 1, -1.4142135381698608], [-1.4142135381698608, -1.7319122530342089e-16, -1.4142135381698608] ],
    [ [-1.4142135381698608, -1.7319122530342089e-16, 1.4142135381698608], [-1, 1, 1.4142135381698608],
      [-1.4142135381698608, 1.4142135381698608, 0], [-2, -2.4492937051703357e-16, 0] ],
    [ [-1.4142135381698608, -1.7319122530342089e-16, -1.4142135381698608], [-1, 1, -1.4142135381698608],
      [-1.2246468525851679e-16, -1.499759904157988e-32, -2] ],
    [ [-1.2246468525851679e-16, -1.499759904157988e-32, 2], [-1, 1, 1.4142135381698608],
      [-1.4142135381698608, -1.7319122530342089e-16, 1.4142135381698608] ],
    [ [-1.4142135381698608, 1.4142135381698608, 0], [-3.6739402930577075e-16, 2, 0],
      [-2.5978680486790683e-16, 1.4142135381698608, -1.4142135381698608], [-1, 1, -1.4142135381698608] ],
    [ [-1, 1, 1.4142135381698608], [-2.5978680486790683e-16, 1.4142135381698608, 1.4142135381698608],
      [-3.6739402930577075e-16, 2, 0], [-1.4142135381698608, 1.4142135381698608, 0] ],
    [ [-1, 1, -1.4142135381698608], [-2.5978680486790683e-16, 1.4142135381698608, -1.4142135381698608],
      [-8.659560603426554e-17, 8.659560603426554e-17, -2] ],
    [ [-8.659560603426554e-17, 8.659560603426554e-17, 2],
      [-2.5978680486790683e-16, 1.4142135381698608, 1.4142135381698608], [-1, 1, 1.4142135381698608] ],
    [ [-3.6739402930577075e-16, 2, 0], [1.4142135381698608, 1.4142135381698608, 0],
      [1, 1, -1.4142135381698608], [-2.5978680486790683e-16, 1.4142135381698608, -1.4142135381698608] ],
    [ [-2.5978680486790683e-16, 1.4142135381698608, 1.4142135381698608], [1, 1, 1.4142135381698608],
      [1.4142135381698608, 1.4142135381698608, 0], [-3.6739402930577075e-16, 2, 0] ],
    [ [-2.5978680486790683e-16, 1.4142135381698608, -1.4142135381698608], [1, 1, -1.4142135381698608],
      [-2.2496396358317913e-32, 1.2246468525851679e-16, -2] ],
    [ [-2.2496396358317913e-32, 1.2246468525851679e-16, 2], [1, 1, 1.4142135381698608],
      [-2.5978680486790683e-16, 1.4142135381698608, 1.4142135381698608] ],
    [ [1.4142135381698608, 1.4142135381698608, 0], [2, 4.898587410340671e-16, 0],
      [1.4142135381698608, 3.4638245060684178e-16, -1.4142135381698608], [1, 1, -1.4142135381698608] ],
    [ [1, 1, 1.4142135381698608], [1.4142135381698608, 3.4638245060684178e-16, 1.4142135381698608],
      [2, 4.898587410340671e-16, 0], [1.4142135381698608, 1.4142135381698608, 0] ],
    [ [1, 1, -1.4142135381698608], [1.4142135381698608, 3.4638245060684178e-16, -1.4142135381698608],
      [8.659560603426554e-17, 8.659560603426554e-17, -2] ],
    [ [8.659560603426554e-17, 8.659560603426554e-17, 2],
      [1.4142135381698608, 3.4638245060684178e-16, 1.4142135381698608], [1, 1, 1.4142135381698608] ]
  ]
  t.is(obs.length, 32)
  t.true(comparePolygonsAsPoints(obs, exp))

  // subtract of two non-overlapping objects
  let geometry2 = cuboid({ size: [2, 2, 2], center: [10, 10, 10] })

  let result2 = subtract(geometry1, geometry2)
  obs = geom3.toPoints(result2)
  t.is(obs.length, 32)

  // subtract of two partially overlapping objects
  let geometry3 = cuboid({ size: [9, 9, 9] })

  let result3 = subtract(geometry2, geometry3)
  obs = geom3.toPoints(result3)
  exp = [
    [ [ 12, 8, 8 ], [ 12, 12, 8 ], [ 12, 12, 12 ], [ 12, 8, 12 ] ],
    [ [ 8, 12, 8 ], [ 8, 12, 12 ], [ 12, 12, 12 ], [ 12, 12, 8 ] ],
    [ [ 8, 8, 12 ], [ 12, 8, 12 ], [ 12, 12, 12 ], [ 8, 12, 12 ] ],
    [ [ 9, 8, 8 ], [ 9, 8, 9 ], [ 9, 9, 9 ], [ 9, 9, 8 ] ],
    [ [ 8, 9, 8 ], [ 9, 9, 8 ], [ 9, 9, 9 ], [ 8, 9, 9 ] ],
    [ [ 8, 8, 9 ], [ 8, 9, 9 ], [ 9, 9, 9 ], [ 9, 8, 9 ] ],
    [ [ 8, 12, 12 ], [ 8, 12, 9 ], [ 8, 8, 9 ], [ 8, 8, 12 ] ],
    [ [ 8, 12, 9 ], [ 8, 12, 8 ], [ 8, 9, 8 ], [ 8, 9, 9 ] ],
    [ [ 12, 8, 8 ], [ 12, 8, 9 ], [ 9, 8, 9 ], [ 9, 8, 8 ] ],
    [ [ 12, 8, 9 ], [ 12, 8, 12 ], [ 8, 8, 12 ], [ 8, 8, 9 ] ],
    [ [ 12, 12, 8 ], [ 12, 9, 8 ], [ 8, 9, 8 ], [ 8, 12, 8 ] ],
    [ [ 12, 9, 8 ], [ 12, 8, 8 ], [ 9, 8, 8 ], [ 9, 9, 8 ] ]
  ]
  t.is(obs.length, 12)
  t.true(comparePolygonsAsPoints(obs, exp))

  // subtract of two completely overlapping objects
  let result4 = subtract(geometry1, geometry3)
  obs = geom3.toPoints(result4)
  t.is(obs.length, 0)
})

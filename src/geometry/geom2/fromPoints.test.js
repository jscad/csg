const test = require('ava')

const {fromPoints} = require('./index')

test('fromPoints: Creates populated geom2', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected = {baseSides: [
                      [new Float32Array([0, 1]), new Float32Array([0, 0])],
                      [new Float32Array([0, 0]), new Float32Array([1, 0])],
                      [new Float32Array([1, 0]), new Float32Array([0, 1])]
                    ],
                    sides: [], isCanonicalized: false, transforms: new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]) }
  t.deepEqual(fromPoints(points), expected)
})
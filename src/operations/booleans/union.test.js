const test = require('ava')

const comparePolygonsAsPoints = require('../../../test/helpers/comparePolygonsAsPoints')

const {geom2, geom3} = require('../../geometry')

const {circle, rectangle, sphere, cuboid} = require('../../primitives')

const {union} = require('./index')

//test('union: union of a path produces expected changes to points', t => {
//  let geometry = path.fromPoints({}, [[0, 1, 0], [1, 0, 0]])
//
//  geometry = union({normal: [1, 0, 0]}, geometry)
//  let obs = path.toPoints(geometry)
//  let exp = [ { _x: 0, _y: 1, _z: 0 }, { _x: -1, _y: 0, _z: 0 } ]
//
//  t.deepEqual(obs, exp)
//})

test('union of one or more geom2 objects produces expected geometry', t => {
  let geometry1 = circle({radius: 2, segments: 8})

  // union of one object
  let result1 = union(geometry1)
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
  t.deepEqual(obs, exp)

  // union of two non-overlapping objects
  let geometry2 = rectangle({size: [2,2], center: [10,10]})

  let result2 = union(geometry1, geometry2)
  obs = geom2.toPoints(result2)
  exp = [
    new Float32Array([ 2, 0 ]),
    new Float32Array([ 1.4142135381698608, 1.4142135381698608 ]),
    new Float32Array([ 1.2246468525851679e-16, 2 ]),
    new Float32Array([ -1.4142135381698608, 1.4142135381698608 ]),
    new Float32Array([ -2, 2.4492937051703357e-16 ]),
    new Float32Array([ -1.4142135381698608, -1.4142135381698608 ]),
    new Float32Array([ -3.6739402930577075e-16, -2 ]),
    new Float32Array([ 8, 12 ]),
    new Float32Array([ 8, 8 ]),
    new Float32Array([ 12, 8 ]),
    new Float32Array([ 12, 12 ]),
    new Float32Array([ 1.4142135381698608, -1.4142135381698608 ])
  ]
  t.deepEqual(obs, exp)

  // union of two partially overlapping objects
  let geometry3 = rectangle({size: [9,9]})

  let result3 = union(geometry2, geometry3)
  obs = geom2.toPoints(result3)
  exp = [
    new Float32Array([ 12, 12 ]),
    new Float32Array([ 8, 12 ]),
    new Float32Array([ 9, 8 ]),
    new Float32Array([ -9, 9 ]),
    new Float32Array([ -9, -9 ]),
    new Float32Array([ 9, -9 ]),
    new Float32Array([ 8, 9 ]),
    new Float32Array([ 12, 8 ])
  ]
  t.deepEqual(obs, exp)

  // union of two completely overlapping objects
  let result4 = union(geometry1, geometry3)
  obs = geom2.toPoints(result4)
  exp = [
    new Float32Array([ -9, -9 ]),
    new Float32Array([ 9, -9 ]),
    new Float32Array([ 9, 9 ]),
    new Float32Array([ -9, 9 ])
  ]
  t.deepEqual(obs, exp)
})

test('union of one or more geom3 objects produces expected geometry', t => {
  let geometry1 = sphere({radius: 2, segments: 8})

  // union of one object
  let result1 = union(geometry1)
  let obs = geom3.toPoints(result1)
  let exp = [
    [[2, 0, 0], [1.4142135381698608, -1.4142135381698608, 0],
     [1, -1, -1.4142135381698608], [1.4142135381698608, 0, -1.4142135381698608] ],
    [[1.4142135381698608, 0, 1.4142135381698608], [1, -1, 1.4142135381698608],
     [1.4142135381698608, -1.4142135381698608, 0], [2, 0, 0] ],
    [[1.4142135381698608, 0, -1.4142135381698608], [1, -1, -1.4142135381698608],
     [1.2246468525851679e-16, 0, -2] ],
    [[1.2246468525851679e-16, 0, 2], [1, -1, 1.4142135381698608],
     [1.4142135381698608, 0, 1.4142135381698608] ],
    [[1.4142135381698608, -1.4142135381698608, 0], [1.2246468525851679e-16, -2, 0],
     [8.659561265171044e-17, -1.4142135381698608, -1.4142135381698608], [1, -1, -1.4142135381698608] ],
    [[1, -1, 1.4142135381698608], [8.659561265171044e-17, -1.4142135381698608, 1.4142135381698608],
     [1.2246468525851679e-16, -2, 0], [1.4142135381698608, -1.4142135381698608, 0] ],
    [[1, -1, -1.4142135381698608], [8.659561265171044e-17, -1.4142135381698608, -1.4142135381698608],
     [8.659560603426554e-17, -8.659560603426554e-17, -2] ],
    [[8.659560603426554e-17, -8.659560603426554e-17, 2],
     [8.659561265171044e-17, -1.4142135381698608, 1.4142135381698608], [1, -1, 1.4142135381698608] ],
    [[1.2246468525851679e-16, -2, 0], [-1.4142135381698608, -1.4142135381698608, 0],
     [-1, -1, -1.4142135381698608], [8.659561265171044e-17, -1.4142135381698608, -1.4142135381698608] ],
    [[8.659561265171044e-17, -1.4142135381698608, 1.4142135381698608], [-1, -1, 1.4142135381698608],
     [-1.4142135381698608, -1.4142135381698608, 0], [1.2246468525851679e-16, -2, 0] ],
    [[8.659561265171044e-17, -1.4142135381698608, -1.4142135381698608], [-1, -1, -1.4142135381698608],
     [7.49879952078994e-33, -1.2246468525851679e-16, -2] ],
    [[7.49879952078994e-33, -1.2246468525851679e-16, 2], [-1, -1, 1.4142135381698608],
     [8.659561265171044e-17, -1.4142135381698608, 1.4142135381698608] ],
    [[-1.4142135381698608, -1.4142135381698608, 0], [-2, -2.4492937051703357e-16, 0],
     [-1.4142135381698608, -1.7319122530342089e-16, -1.4142135381698608], [-1, -1, -1.4142135381698608] ],
    [[-1, -1, 1.4142135381698608], [-1.4142135381698608, -1.7319122530342089e-16, 1.4142135381698608],
     [-2, -2.4492937051703357e-16, 0], [-1.4142135381698608, -1.4142135381698608, 0] ],
    [[-1, -1, -1.4142135381698608], [-1.4142135381698608, -1.7319122530342089e-16, -1.4142135381698608],
     [-8.659560603426554e-17, -8.659560603426554e-17, -2] ],
    [[-8.659560603426554e-17, -8.659560603426554e-17, 2],
     [-1.4142135381698608, -1.7319122530342089e-16, 1.4142135381698608], [-1, -1, 1.4142135381698608] ],
    [[-2, -2.4492937051703357e-16, 0], [-1.4142135381698608, 1.4142135381698608, 0],
     [-1, 1, -1.4142135381698608], [-1.4142135381698608, -1.7319122530342089e-16, -1.4142135381698608] ],
    [[-1.4142135381698608, -1.7319122530342089e-16, 1.4142135381698608], [-1, 1, 1.4142135381698608],
     [-1.4142135381698608, 1.4142135381698608, 0], [-2, -2.4492937051703357e-16, 0] ],
    [[-1.4142135381698608, -1.7319122530342089e-16, -1.4142135381698608], [-1, 1, -1.4142135381698608],
     [-1.2246468525851679e-16, -1.499759904157988e-32, -2] ],
    [[-1.2246468525851679e-16, -1.499759904157988e-32, 2], [-1, 1, 1.4142135381698608],
     [-1.4142135381698608, -1.7319122530342089e-16, 1.4142135381698608] ],
    [[-1.4142135381698608, 1.4142135381698608, 0], [-3.6739402930577075e-16, 2, 0],
     [-2.5978680486790683e-16, 1.4142135381698608, -1.4142135381698608], [-1, 1, -1.4142135381698608] ],
    [[-1, 1, 1.4142135381698608], [-2.5978680486790683e-16, 1.4142135381698608, 1.4142135381698608],
     [-3.6739402930577075e-16, 2, 0], [-1.4142135381698608, 1.4142135381698608, 0] ],
    [[-1, 1, -1.4142135381698608], [-2.5978680486790683e-16, 1.4142135381698608, -1.4142135381698608],
     [-8.659560603426554e-17, 8.659560603426554e-17, -2] ],
    [[-8.659560603426554e-17, 8.659560603426554e-17, 2],
     [-2.5978680486790683e-16, 1.4142135381698608, 1.4142135381698608], [-1, 1, 1.4142135381698608] ],
    [[-3.6739402930577075e-16, 2, 0], [1.4142135381698608, 1.4142135381698608, 0],
     [1, 1, -1.4142135381698608], [-2.5978680486790683e-16, 1.4142135381698608, -1.4142135381698608] ],
    [[-2.5978680486790683e-16, 1.4142135381698608, 1.4142135381698608], [1, 1, 1.4142135381698608],
     [1.4142135381698608, 1.4142135381698608, 0], [-3.6739402930577075e-16, 2, 0] ],
    [[-2.5978680486790683e-16, 1.4142135381698608, -1.4142135381698608], [1, 1, -1.4142135381698608],
     [-2.2496396358317913e-32, 1.2246468525851679e-16, -2] ],
    [[-2.2496396358317913e-32, 1.2246468525851679e-16, 2], [1, 1, 1.4142135381698608],
     [-2.5978680486790683e-16, 1.4142135381698608, 1.4142135381698608] ],
    [[1.4142135381698608, 1.4142135381698608, 0], [2, 4.898587410340671e-16, 0],
     [1.4142135381698608, 3.4638245060684178e-16, -1.4142135381698608], [1, 1, -1.4142135381698608] ],
    [[1, 1, 1.4142135381698608], [1.4142135381698608, 3.4638245060684178e-16, 1.4142135381698608],
     [2, 4.898587410340671e-16, 0], [1.4142135381698608, 1.4142135381698608, 0] ],
    [[1, 1, -1.4142135381698608], [1.4142135381698608, 3.4638245060684178e-16, -1.4142135381698608],
     [8.659560603426554e-17, 8.659560603426554e-17, -2] ],
    [[8.659560603426554e-17, 8.659560603426554e-17, 2],
     [1.4142135381698608, 3.4638245060684178e-16, 1.4142135381698608], [1, 1, 1.4142135381698608] ]
  ]
  t.true(comparePolygonsAsPoints(obs, exp))

  // union of two non-overlapping objects
  let geometry2 = cuboid({size: [2,2,2], center: [10,10,10]})

  let result2 = union(geometry1, geometry2)
  obs = geom3.toPoints(result2)
  t.is(obs.length, 38)

  // union of two partially overlapping objects
  let geometry3 = cuboid({size: [9,9,9]})

  let result3 = union(geometry2, geometry3)
  obs = geom3.toPoints(result3)
  exp = [
    [ [ 12, 8, 8 ], [ 12, 12, 8 ], [ 12, 12, 12 ], [ 12, 8, 12 ] ],
    [ [ 8, 12, 8 ], [ 8, 12, 12 ], [ 12, 12, 12 ], [ 12, 12, 8 ] ],
    [ [ 8, 8, 12 ], [ 12, 8, 12 ], [ 12, 12, 12 ], [ 8, 12, 12 ] ],
    [ [ 8, 12, 12 ], [ 8, 12, 9 ], [ 8, 8, 9 ], [ 8, 8, 12 ] ],
    [ [ 8, 12, 9 ], [ 8, 12, 8 ], [ 8, 9, 8 ], [ 8, 9, 9 ] ],
    [ [ 12, 8, 8 ], [ 12, 8, 9 ], [ 9, 8, 9 ], [ 9, 8, 8 ] ],
    [ [ 12, 8, 9 ], [ 12, 8, 12 ], [ 8, 8, 12 ], [ 8, 8, 9 ] ],
    [ [ 12, 12, 8 ], [ 12, 9, 8 ], [ 8, 9, 8 ], [ 8, 12, 8 ] ],
    [ [ 12, 9, 8 ], [ 12, 8, 8 ], [ 9, 8, 8 ], [ 9, 9, 8 ] ],
    [ [ -9, -9, -9 ], [ -9, -9, 9 ], [ -9, 9, 9 ], [ -9, 9, -9 ] ],
    [ [ -9, -9, -9 ], [ 9, -9, -9 ], [ 9, -9, 9 ], [ -9, -9, 9 ] ],
    [ [ -9, -9, -9 ], [ -9, 9, -9 ], [ 9, 9, -9 ], [ 9, -9, -9 ] ],
    [ [ 9, 9, -9 ], [ 9, 9, 8 ], [ 9, -9, 8 ], [ 9, -9, -9 ] ],
    [ [ 9, 8, 8 ], [ 9, 8, 9 ], [ 9, -9, 9 ], [ 9, -9, 8 ] ],
    [ [ 8, 9, 9 ], [ 8, 9, 8 ], [ -9, 9, 8 ], [ -9, 9, 9 ] ],
    [ [ 9, 9, 8 ], [ 9, 9, -9 ], [ -9, 9, -9 ], [ -9, 9, 8 ] ],
    [ [ 9, -9, 9 ], [ 9, 8, 9 ], [ -9, 8, 9 ], [ -9, -9, 9 ] ],
    [ [ 8, 8, 9 ], [ 8, 9, 9 ], [ -9, 9, 9 ], [ -9, 8, 9 ] ]
  ]
  t.is(obs.length, 18)
  t.true(comparePolygonsAsPoints(obs, exp))

  // union of two completely overlapping objects
  let result4 = union(geometry1, geometry3)
  obs = geom3.toPoints(result4)
  exp = [
    [[ -9, -9, -9 ], [ -9, -9, 9 ], [ -9, 9, 9 ], [ -9, 9, -9 ] ],
    [[ 9, -9, -9 ], [ 9, 9, -9 ], [ 9, 9, 9 ], [ 9, -9, 9 ] ],
    [[ -9, -9, -9 ], [ 9, -9, -9 ], [ 9, -9, 9 ], [ -9, -9, 9 ] ],
    [[ -9, 9, -9 ], [ -9, 9, 9 ], [ 9, 9, 9 ], [ 9, 9, -9 ] ],
    [[ -9, -9, -9 ], [ -9, 9, -9 ], [ 9, 9, -9 ], [ 9, -9, -9 ] ],
    [[ -9, -9, 9 ], [ 9, -9, 9 ], [ 9, 9, 9 ], [ -9, 9, 9 ] ]
  ]
  t.is(obs.length, 6)
  t.true(comparePolygonsAsPoints(obs, exp))
})

test('union of geom3 with rounding issues #137', t => {
  let geometry1 = cuboid({size: [22, 13, 2.5], center: [0,0,-1]})
  let geometry2 = cuboid({size: [22, 13, 0.9], center: [0,0,-4.400001]}) // introduce percision error

  let obs = union(geometry1, geometry2)
  let pts = geom3.toPoints(obs)
  t.is(pts.length, 6) // number of polygons in union
})

test('union of geom2 with closing issues #15', t => {
  const c = geom2.create([
    [[-45.82118740347841168159, -16.85726810555620147625], [-49.30331715865012398581, -14.68093629710870118288]],
    [[-49.10586702080816223770, -15.27604177352110781385], [-48.16645938811709015681, -15.86317173589183227023]],
    [[-49.60419521731581937729, -14.89550781504266296906], [-49.42407001323204696064, -15.67605088949303393520]],
    [[-49.05727291218684626983, -15.48661638542171203881], [-49.10586702080816223770, -15.27604177352110781385]],
    [[-49.30706235399220815907, -15.81529674600091794900], [-46.00505780290426827150, -17.21108547999804727624]],
    [[-46.00505780290426827150, -17.21108547999804727624], [-45.85939703723252591772, -17.21502856394236857795]],
    [[-45.85939703723252591772, -17.21502856394236857795], [-45.74972032664388166268, -17.11909303495791334626]],
    [[-45.74972032664388166268, -17.11909303495791334626], [-45.73424573227583067592, -16.97420292661295349035]],
    [[-45.73424573227583067592, -16.97420292661295349035], [-45.82118740347841168159, -16.85726810555620147625]],
    [[-49.30331715865012398581, -14.68093629710870118288], [-49.45428884427643367871, -14.65565769658912387285]],
    [[-49.45428884427643367871, -14.65565769658912387285], [-49.57891661679624917269, -14.74453612941635327616]],
    [[-49.57891661679624917269, -14.74453612941635327616], [-49.60419521731581937729, -14.89550781504266296906]],
    [[-49.42407001323204696064, -15.67605088949303393520], [-49.30706235399220815907, -15.81529674600091794900]],
    [[-48.16645938811709015681, -15.86317173589183227023], [-49.05727291218684626983, -15.48661638542171203881]]
  ])
  const d = geom2.create([
    [[-49.03431352173912216585, -15.58610714407888764299], [-49.21443872582289458251, -14.80556406962851667686]],
    [[-68.31614651314507113966, -3.10790373951434872879], [-49.34036769611472550423, -15.79733157434056778357]],
    [[-49.58572929483430868913, -14.97552686612213790340], [-49.53755741140093959984, -15.18427183431472826669]],
    [[-49.53755741140093959984, -15.18427183431472826669], [-54.61235529924312714911, -11.79066769321313756791]],
    [[-49.30227466841120076424, -14.68159232649114187552], [-68.09792828135776687759, -2.77270756611528668145]],
    [[-49.21443872582289458251, -14.80556406962851667686], [-49.30227466841120076424, -14.68159232649114187552]],
    [[-49.34036769611472550423, -15.79733157434056778357], [-49.18823337756091262918, -15.82684012194931710837]],
    [[-49.18823337756091262918, -15.82684012194931710837], [-49.06069007212390431505, -15.73881563386780157998]],
    [[-49.06069007212390431505, -15.73881563386780157998], [-49.03431352173912216585, -15.58610714407888764299]],
    [[-68.09792828135776687759, -2.77270756611528668145], [-68.24753735887460948106, -2.74623350179570024920]],
    [[-68.24753735887460948106, -2.74623350179570024920], [-68.37258141465594007968, -2.83253376987636329432]],
    [[-68.37258141465594007968, -2.83253376987636329432], [-68.40089829889257089235, -2.98180502037078554167]],
    [[-68.40089829889257089235, -2.98180502037078554167], [-68.31614651314507113966, -3.10790373951434872879]],
    [[-54.61235529924312714911, -11.79066769321313756791], [-49.58572929483430868913, -14.97552686612213790340]]
  ])
  let obs = union(c, d)
  let pts = geom2.toPoints(obs)
  let exp = [
    new Float32Array([-49.105865478515625, -15.276041984558105 ]),
    new Float32Array([-49.057273864746094, -15.486616134643555 ]),
    new Float32Array([-49.307064056396484, -15.81529712677002 ]),
    new Float32Array([-46.00505828857422, -17.21108627319336 ]),
    new Float32Array([-45.859397888183594, -17.215028762817383 ]),
    new Float32Array([-45.74972152709961, -17.11909294128418 ]),
    new Float32Array([-45.73424530029297, -16.97420310974121 ]),
    new Float32Array([-48.16645812988281, -15.863171577453613 ]),
    new Float32Array([-49.3186149597168, -15.80155086517334 ]),
    new Float32Array([-49.585731506347656, -14.975525856018066 ]),
    new Float32Array([-68.31614685058594, -3.1079037189483643 ]),
    new Float32Array([-49.53755569458008, -15.184271812438965 ]),
    new Float32Array([-49.30227279663086, -14.681591987609863 ]),
    new Float32Array([-68.09793090820312, -2.772707462310791 ]),
    new Float32Array([-68.2475357055664, -2.7462334632873535 ]),
    new Float32Array([-68.3725814819336, -2.832533836364746 ]),
    new Float32Array([-68.4009017944336, -2.9818050861358643 ]),
    new Float32Array([-54.61235427856445, -11.790667533874512 ]),
    new Float32Array([-49.34036636352539, -15.797331809997559 ]),
    new Float32Array([-45.82118606567383, -16.857267379760742 ])
  ]
  t.deepEqual(pts, exp)
})

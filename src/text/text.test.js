const test = require('ava')

const { vectorChar, vectorText } = require('./index')

const questionMarkSegments = [ // '?'
[[3,16],[3,17],[4,19],[5,20],[7,21],[11,21],[13,20],[14,19],[15,17],[15,15],[14,13],[13,12],[9,10],[9,7]],
[[9,2],[8,1],[9,0],[10,1],[9,2]]
]

const openTextSegments = [ // 'Open'
[[9,21],[7,20],[5,18],[4,16],[3,13],[3,8],[4,5],[5,3],[7,1],[9,0],[13,0],[15,1],[17,3],[18,5],[19,8],[19,13],[18,16],[17,18],[15,20],[13,21],[9,21]],
[[26,14],[26,-7]],
[[26,11],[28,13],[30,14],[33,14],[35,13],[37,11],[38,8],[38,6],[37,3],[35,1],[33,0],[30,0],[28,1],[26,3]],
[[44,8],[56,8],[56,10],[55,12],[54,13],[52,14],[49,14],[47,13],[45,11],[44,8],[44,6],[45,3],[47,1],[49,0],[52,0],[54,1],[56,3]],
[[63,14],[63,0]],
[[63,10],[66,13],[68,14],[71,14],[73,13],[74,10],[74,0]]
]

test('vectorChar (defaults)', t => {
  const obs = vectorChar()

  t.deepEqual(obs.width, 18)
  t.deepEqual(obs.height, 14)
  t.deepEqual(obs.segments, questionMarkSegments)
})

test('vectorChar (char)', t => {
  const obs = vectorChar('H')
  const expSegments = [
    [[4,21],[4,0]],
    [[18,21],[18,0]],
    [[4,11],[18,11]]
  ]

  t.deepEqual(obs.width, 22)
  t.deepEqual(obs.height, 14)
  t.deepEqual(obs.segments, expSegments)
})

test('vectorChar ({ xOffset, yOffset }, char)', t => {
  const obs = vectorChar({ xOffset: 10, yOffset: 20 }, 'H')
  const expSegments = [
    [[14,41],[14,20]],
    [[28,41],[28,20]],
    [[14,31],[28,31]]
  ]

  t.deepEqual(obs.width, 22)
  t.deepEqual(obs.height, 14)
  t.deepEqual(obs.segments, expSegments)
})

test('vectorChar ({ height }, char)', t => {
  const obs = vectorChar({ height: 10, input: 'h' })
  const expSegments = [
    [[2.857142857142857,15],[2.857142857142857,0]],
    [[2.857142857142857,7.142857142857143],[5,9.285714285714286],[6.428571428571429,10],[8.571428571428571,10],[10,9.285714285714286],[10.714285714285715,7.142857142857143],[10.714285714285715,0]]
  ]

  t.deepEqual(obs.width, 13.571428571428571)
  t.deepEqual(obs.height, 10)
  t.deepEqual(obs.segments, expSegments)
})

test('vectorText (text)', t => {
  const obs = vectorText('OpenJSCAD')
  const expSegments = openTextSegments.concat([
    [[90,21],[90,5],[89,2],[88,1],[86,0],[84,0],[82,1],[81,2],[80,5],[80,7]],
    [[111,18],[109,20],[106,21],[102,21],[99,20],[97,18],[97,16],[98,14],[99,13],[101,12],[107,10],[109,9],[110,8],[111,6],[111,3],[109,1],[106,0],[102,0],[99,1],[97,3]],
    [[132,16],[131,18],[129,20],[127,21],[123,21],[121,20],[119,18],[118,16],[117,13],[117,8],[118,5],[119,3],[121,1],[123,0],[127,0],[129,1],[131,3],[132,5]],
    [[144,21],[136,0]],
    [[144,21],[152,0]],
    [[139,7],[149,7]],
    [[157,21],[157,0]],
    [[157,21],[164,21],[167,20],[169,18],[170,16],[171,13],[171,8],[170,5],[169,3],[167,1],[164,0],[157,0]]
  ])

  t.deepEqual(obs, expSegments)
})

test('vectorText (multi-line-text)', t => {
  const obs = vectorText('Open\nJSCAD')
  const expSegments = openTextSegments.concat([
    [[12,-9],[12,-25],[11,-28],[10,-29],[8,-30],[6,-30],[4,-29],[3,-28],[2,-25],[2,-23]],
    [[33,-12],[31,-10],[28,-9],[24,-9],[21,-10],[19,-12],[19,-14],[20,-16],[21,-17],[23,-18],[29,-20],[31,-21],[32,-22],[33,-24],[33,-27],[31,-29],[28,-30],[24,-30],[21,-29],[19,-27]],
    [[54,-14],[53,-12],[51,-10],[49,-9],[45,-9],[43,-10],[41,-12],[40,-14],[39,-17],[39,-22],[40,-25],[41,-27],[43,-29],[45,-30],[49,-30],[51,-29],[53,-27],[54,-25]],
    [[66,-9],[58,-30]],
    [[66,-9],[74,-30]],
    [[61,-23],[71,-23]],
    [[79,-9],[79,-30]],
    [[79,-9],[86,-9],[89,-10],[91,-12],[92,-14],[93,-17],[93,-22],[92,-25],[91,-27],[89,-29],[86,-30],[79,-30]]
  ])

  t.deepEqual(obs, expSegments)
})

test('vectorText ({ yOffset }, text)', t => {
  const obs = vectorText({ yOffset: 20 }, 'y20')
  const expSegments = [
    [[2,34],[8,20]],
    [[14,34],[8,20],[6,16],[4,14],[2,13],[1,13]],
    [[20,36],[20,37],[21,39],[22,40],[24,41],[28,41],[30,40],[31,39],[32,37],[32,35],[31,33],[29,30],[19,20],[33,20]],
    [[45,41],[42,40],[40,37],[39,32],[39,29],[40,24],[42,21],[45,20],[47,20],[50,21],[52,24],[53,29],[53,32],[52,37],[50,40],[47,41],[45,41]]
  ]

  t.deepEqual(obs, expSegments)
})

test('vectorText ({ xOffset, input, letterSpacing })', t => {
  const obs = vectorText({ xOffset: -10, input: 'space', letterSpacing: 1.5 })
  const expSegments = [
    [[4,11],[3,13],[0,14],[-3,14],[-6,13],[-7,11],[-6,9],[-4,8],[1,7],[3,6],[4,4],[4,3],[3,1],[0,0],[-3,0],[-6,1],[-7,3]],
    [[19.5,14],[19.5,-7]],
    [[19.5,11],[21.5,13],[23.5,14],[26.5,14],[28.5,13],[30.5,11],[31.5,8],[31.5,6],[30.5,3],[28.5,1],[26.5,0],[23.5,0],[21.5,1],[19.5,3]],
    [[59,14],[59,0]],
    [[59,11],[57,13],[55,14],[52,14],[50,13],[48,11],[47,8],[47,6],[48,3],[50,1],[52,0],[55,0],[57,1],[59,3]],
    [[87.5,11],[85.5,13],[83.5,14],[80.5,14],[78.5,13],[76.5,11],[75.5,8],[75.5,6],[76.5,3],[78.5,1],[80.5,0],[83.5,0],[85.5,1],[87.5,3]],
    [[102.5,8],[114.5,8],[114.5,10],[113.5,12],[112.5,13],[110.5,14],[107.5,14],[105.5,13],[103.5,11],[102.5,8],[102.5,6],[103.5,3],[105.5,1],[107.5,0],[110.5,0],[112.5,1],[114.5,3]]
  ]

  t.deepEqual(obs, expSegments)
})

test('vectorText ({ height, extrudeOffset }, text)', t => {
  const obs = vectorText({ height: 12, extrudeOffset: 2 }, 'size')
  const expSegments = [
    [[10,8.857142857142858],[9.285714285714286,10.285714285714286],[7.142857142857143,11],[5,11],[2.857142857142857,10.285714285714286],[2.142857142857143,8.857142857142858],[2.857142857142857,7.428571428571429],[4.285714285714286,6.714285714285714],[7.857142857142858,6],[9.285714285714286,5.285714285714286],[10,3.857142857142857],[10,3.142857142857143],[9.285714285714286,1.7142857142857144],[7.142857142857143,1],[5,1],[2.857142857142857,1.7142857142857144],[2.142857142857143,3.142857142857143]],
    [[14.285714285714285,16],[15,15.285714285714286],[15.714285714285714,16],[15,16.714285714285715],[14.285714285714285,16]],
    [[15,11],[15,1]],
    [[27.857142857142858,11],[20,1]],
    [[20,11],[27.857142857142858,11]],
    [[20,1],[27.857142857142858,1]],
    [[32.142857142857146,6.714285714285714],[40.714285714285715,6.714285714285714],[40.714285714285715,8.142857142857142],[40,9.571428571428571],[39.285714285714285,10.285714285714286],[37.85714285714286,11],[35.714285714285715,11],[34.285714285714285,10.285714285714286],[32.857142857142854,8.857142857142858],[32.142857142857146,6.714285714285714],[32.142857142857146,5.285714285714286],[32.857142857142854,3.142857142857143],[34.285714285714285,1.7142857142857144],[35.714285714285715,1],[37.85714285714286,1],[39.285714285714285,1.7142857142857144],[40.714285714285715,3.142857142857143]]
  ]

  t.deepEqual(obs, expSegments)
})

test('vectorText ({ align: center }, text)', t => {
  const obs = vectorText({ align: 'center' }, 'a\nab\nabc')
  const expSegments = [
    [[33.5,14],[33.5,0]],
    [[33.5,11],[31.5,13],[29.5,14],[26.5,14],[24.5,13],[22.5,11],[21.5,8],[21.5,6],[22.5,3],[24.5,1],[26.5,0],[29.5,0],[31.5,1],[33.5,3]],
    [[24,-16],[24,-30]],
    [[24,-19],[22,-17],[20,-16],[17,-16],[15,-17],[13,-19],[12,-22],[12,-24],[13,-27],[15,-29],[17,-30],[20,-30],[22,-29],[24,-27]],
    [[32,-9],[32,-30]],
    [[32,-19],[34,-17],[36,-16],[39,-16],[41,-17],[43,-19],[44,-22],[44,-24],[43,-27],[41,-29],[39,-30],[36,-30],[34,-29],[32,-27]],
    [[15,-46],[15,-60]],
    [[15,-49],[13,-47],[11,-46],[8,-46],[6,-47],[4,-49],[3,-52],[3,-54],[4,-57],[6,-59],[8,-60],[11,-60],[13,-59],[15,-57]],
    [[23,-39],[23,-60]],
    [[23,-49],[25,-47],[27,-46],[30,-46],[32,-47],[34,-49],[35,-52],[35,-54],[34,-57],[32,-59],[30,-60],[27,-60],[25,-59],[23,-57]],
    [[53,-49],[51,-47],[49,-46],[46,-46],[44,-47],[42,-49],[41,-52],[41,-54],[42,-57],[44,-59],[46,-60],[49,-60],[51,-59],[53,-57]]
  ]

  t.deepEqual(obs, expSegments)
})

test('vectorText ({ align: right }, text)', t => {
  const obs = vectorText({ align: 'right' }, 'a\na b\na b c')
  const expSegments = [
    [ [ 84, 14 ], [ 84, 0 ] ],
    [ [ 84, 11 ], [ 82, 13 ], [ 80, 14 ], [ 77, 14 ], [ 75, 13 ],
      [ 73, 11 ], [ 72, 8 ], [ 72, 6 ], [ 73, 3 ], [ 75, 1 ],
      [ 77, 0 ], [ 80, 0 ], [ 82, 1 ], [ 84, 3 ] ],
    [ [ 49, -16 ], [ 49, -30 ] ],
    [ [ 49, -19 ], [ 47, -17 ], [ 45, -16 ], [ 42, -16 ], [ 40, -17 ],
      [ 38, -19 ], [ 37, -22 ], [ 37, -24 ], [ 38, -27 ], [ 40, -29 ],
      [ 42, -30 ], [ 45, -30 ], [ 47, -29 ], [ 49, -27 ] ],
    [ [ 73, -9 ], [ 73, -30 ] ],
    [ [ 73, -19 ], [ 75, -17 ], [ 77, -16 ], [ 80, -16 ], [ 82, -17 ],
      [ 84, -19 ], [ 85, -22 ], [ 85, -24 ], [ 84, -27 ], [ 82, -29 ],
      [ 80, -30 ], [ 77, -30 ], [ 75, -29 ], [ 73, -27 ] ],
    [ [ 15, -46 ], [ 15, -60 ] ],
    [ [ 15, -49 ], [ 13, -47 ], [ 11, -46 ], [ 8, -46 ], [ 6, -47 ],
      [ 4, -49 ], [ 3, -52 ], [ 3, -54 ], [ 4, -57 ], [ 6, -59 ],
      [ 8, -60 ], [ 11, -60 ], [ 13, -59 ], [ 15, -57 ] ],
    [ [ 39, -39 ], [ 39, -60 ] ],
    [ [ 39, -49 ], [ 41, -47 ], [ 43, -46 ], [ 46, -46 ], [ 48, -47 ],
      [ 50, -49 ], [ 51, -52 ], [ 51, -54 ], [ 50, -57 ], [ 48, -59 ],
      [ 46, -60 ], [ 43, -60 ], [ 41, -59 ], [ 39, -57 ] ],
    [ [ 85, -49 ], [ 83, -47 ], [ 81, -46 ], [ 78, -46 ], [ 76, -47 ],
      [ 74, -49 ], [ 73, -52 ], [ 73, -54 ], [ 74, -57 ], [ 76, -59 ],
      [ 78, -60 ], [ 81, -60 ], [ 83, -59 ], [ 85, -57 ] ]
  ]

  t.deepEqual(obs, expSegments)
})

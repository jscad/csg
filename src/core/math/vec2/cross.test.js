const test = require('ava')
const {cross, fromValues, toString} = require('./index')

const {compareVectors} = require('../../../../test/helpers/index')

test('vec2: cross() called with two paramerters should return a vec2 with correct values', t => {

  const obs1 = cross([0, 0], [0, 0])
  t.true(compareVectors(obs1, [0, 0]))

  const obs2 = cross([5, 5], [10, 20])
  t.true(compareVectors(obs2, [0, 50]))

  const obs3 = cross([5, 5], [10, -20])
  t.true(compareVectors(obs3, [0, -150]))

  const obs4 = cross([5, 5], [-10, -20])
  t.true(compareVectors(obs4, [0, -50]))

  const obs5 = cross([5, 5], [-10, 20])
  t.true(compareVectors(obs5, [0, 150]))

  const obs6 = cross([5, 5], [10, 20])
  t.true(compareVectors(obs6, [0, 50]))

  const obs7 = cross([5, 5], [10, -20])
  t.true(compareVectors(obs7, [0, -150]))

  const obs8 = cross([5, 5], [-10, -20])
  t.true(compareVectors(obs8, [0, -50]))

  const obs9 = cross([5, 5], [-10, 20])
  t.true(compareVectors(obs9, [0, 150]))
})

test('vec2: cross() called with three paramerters should update a vec2 with correct values', t => {
  let obs1 = fromValues(0, 0)
  const ret1 = cross(obs1, [0, 0], [0, 0])
  t.true(compareVectors(obs1, [0, 0]))
  t.true(compareVectors(ret1, [0, 0]))

  let obs2 = fromValues(0, 0)
  const ret2 = cross(obs2, [5, 5], [10, 20])
  t.true(compareVectors(obs2, [0, 50]))
  t.true(compareVectors(ret2, [0, 50]))

  let obs3 = fromValues(0, 0)
  const ret3 = cross(obs3, [5, 5], [10, -20])
  t.true(compareVectors(obs3, [0, -150]))
  t.true(compareVectors(ret3, [0, -150]))

  let obs4 = fromValues(0, 0)
  const ret4 = cross(obs4, [5, 5], [-10, -20])
  t.true(compareVectors(obs4, [0, -50]))
  t.true(compareVectors(ret4, [0, -50]))

  let obs5 = fromValues(0, 0)
  const ret5 = cross(obs5, [5, 5], [-10, 20])
  t.true(compareVectors(obs5, [0, 150]))
  t.true(compareVectors(ret5, [0, 150]))

  let obs6 = fromValues(0, 0)
  const ret6 = cross(obs6, [5, 5], [10, 20])
  t.true(compareVectors(obs6, [0, 50]))
  t.true(compareVectors(ret6, [0, 50]))

  let obs7 = fromValues(0, 0)
  const ret7 = cross(obs7, [5, 5], [10, -20])
  t.true(compareVectors(obs7, [0, -150]))
  t.true(compareVectors(ret7, [0, -150]))

  let obs8 = fromValues(0, 0)
  const ret8 = cross(obs8, [5, 5], [-10, -20])
  t.true(compareVectors(obs8, [0, -50]))
  t.true(compareVectors(ret8, [0, -50]))

  let obs9 = fromValues(0, 0)
  const ret9 = cross(obs9, [5, 5], [-10, 20])
  t.true(compareVectors(obs9, [0, 150]))
  t.true(compareVectors(ret9, [0, 150]))
})

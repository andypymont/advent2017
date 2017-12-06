// PART 1 TESTS:
function test_add_vectors(v1, v2, rv) {
  let desc = '(' + v1 + ') + (' + v2 + ') === (' + rv + ')'
  QUnit.test(desc, function(assert) {
    assert.equal(add_vectors(v1, v2), rv)
  })
}

test_add_vectors('1,0','0,1','1,1')
test_add_vectors('2,1','0,-1','2,0')
test_add_vectors('7,-4','-1,1','6,-3')

QUnit.test('test strip (0,1) to DIRECTION_UP only === 1', function(assert) {
  assert.equal(dimension_from_position('0,1', DIRECTION_UP), 1)
})
QUnit.test('test strip (7,4) to DIRECTION_RIGHT only === 7', function(assert) {
  assert.equal(dimension_from_position('7,4', DIRECTION_RIGHT), 7)
})
QUnit.test('test strip (-2,-2) to DIRECTION_LEFT only === 2', function(assert) {
  assert.equal(dimension_from_position('-2,-2', DIRECTION_LEFT), 2)
})

QUnit.test('turn left when travelling left === down', function(assert) {
  assert.equal(turn_left(DIRECTION_LEFT), DIRECTION_DOWN)
})
QUnit.test('turn left when travelling up === left', function(assert) {
  assert.equal(turn_left(DIRECTION_UP), DIRECTION_LEFT)
})
QUnit.test('turn left when travelling right === up', function(assert) {
  assert.equal(turn_left(DIRECTION_RIGHT), DIRECTION_UP)
})
QUnit.test('turn left when travelling down === right', function(assert) {
  assert.equal(turn_left(DIRECTION_DOWN), DIRECTION_RIGHT)
})

function test_home_distance(coords, rv) {
  QUnit.test('home_distance(' + coords + ') ==== ' + rv, function(assert) {
    assert.equal(home_distance(coords), rv)
  })
}

test_home_distance('0,0', 0)
test_home_distance('1,1', 2)
test_home_distance('2,-1', 3)

QUnit.test('create new traveller', function(assert) {
  let traveller = new Traveller()
  assert.equal(traveller.position, '0,0')
  assert.equal(traveller.direction, '1,0')
  assert.equal(traveller.maxima['1,0'], 0)
  assert.equal(traveller.maxima['-1,0'], 0)
  assert.equal(traveller.maxima['0,1'], 0)
  assert.equal(traveller.maxima['0,-1'], 0)
})

QUnit.test('test travel #1 from 0,0 to 1,0', function(assert) {
  let traveller = new Traveller()
  traveller.advance()
  assert.equal(traveller.position, '1,0')
  assert.equal(traveller.number, 2)
})
QUnit.test('test travel #5 from -1,1 to -1,0', function(assert) {
  let traveller = new Traveller()
  traveller.number = 5
  traveller.position = '-1,1'
  traveller.direction = DIRECTION_LEFT
  traveller.maxima[DIRECTION_RIGHT] = 1
  traveller.maxima[DIRECTION_UP] = 1
  traveller.advance()
  assert.equal(traveller.position, '-1,0')
  assert.equal(traveller.number, 6)
  assert.equal(traveller.maxima[DIRECTION_LEFT], 1)
})
QUnit.test('test travel #13 from 2,2 to 1,2', function(assert) {
  let traveller = new Traveller()
  traveller.number = 13
  traveller.position = '2,2'
  traveller.direction = DIRECTION_UP
  traveller.maxima[DIRECTION_RIGHT] = 2
  traveller.maxima[DIRECTION_UP] = 1
  traveller.maxima[DIRECTION_LEFT] = 1
  traveller.maxima[DIRECTION_DOWN] = 1
  traveller.advance()
  assert.equal(traveller.position, '1,2')
  assert.equal(traveller.number, 14)
  assert.equal(traveller.maxima[DIRECTION_UP], 2)
})

function test_taxicab_memory(n, rv) {
  QUnit.test('taxicab_memory(' + n + ') === ' + rv, function(assert) {
    assert.equal(taxicab_memory(n), rv)
  })
}

test_taxicab_memory(1, 0)
test_taxicab_memory(12, 3)
test_taxicab_memory(23, 2)
test_taxicab_memory(1024, 31)

// PART 1 SOLUTION:
test_taxicab_memory(325489, 552)

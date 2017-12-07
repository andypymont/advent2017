puzzle_input = '10	3	15	10	5	15	5	15	9	2	5	8	5	2	3	6'.split('\t').map((x) => parseInt(x, 10))

// Part 1 Tests
function test_redistribute_from(distribution, rv) {
  QUnit.test('redistribute_from([' + distribution.toString() + ']) === ' + rv, function(assert) {
    assert.equal(redistribute_from(distribution), rv)
  })
}

test_redistribute_from([0, 2, 7, 0], 2)
test_redistribute_from([14, 1, 1, 4], 0)
test_redistribute_from([1, 4, 4, 4], 1)

function test_redistribute(distribution, rv) {
  QUnit.test('redistribute([' + distribution.toString() + ']) === ' + rv.toString(), function(assert) {
    assert.deepEqual(redistribute(distribution), rv)
  })
}

test_redistribute([0, 2, 7, 0], [2, 4, 1, 2])
test_redistribute([2, 4, 1, 2], [3, 1, 2, 3])
test_redistribute([3, 1, 2, 3], [0, 2, 3, 4])
test_redistribute([0, 2, 3, 4], [1, 3, 4, 1])
test_redistribute([1, 3, 4, 1], [2, 4, 1, 2])

function test_redistributions_until_repeat(starting_distribution, rv) {
  QUnit.test('redistributions_until_repeat([' + starting_distribution.toString() + ']) === ' + rv, function(assert) {
    assert.equal(redistributions_until_repeat(starting_distribution), rv)
  })
}

test_redistributions_until_repeat([0, 2, 7, 0], 5)
test_redistributions_until_repeat([1, 2, 1, 2], 5)
test_redistributions_until_repeat([1, 0, 2, 3], 4)
test_redistributions_until_repeat([2, 4, 1, 2], 4)

// Part 1 Solution
test_redistributions_until_repeat(puzzle_input.map((x) => x), 14029)

// Part 2 Tests
QUnit.test('redistributions_until_second_repeat([0, 2, 7, 0]) === 4', function(assert) {
  assert.equal(redistributions_until_second_repeat([0, 2, 7, 0]), 4)
})

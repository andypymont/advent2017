// Part 1 tests
const test_map_raw = `     |
     |  +--+
     A  |  C
 F---|----E|--+
     |  |  |  D
     +B-+  +--+ `
const test_map = test_map_raw.split('\n')

function test_exits(row, column, expected) {
  QUnit.test('exits(test_map, ' + row + ', ' + column + ') === [' + expected.toString() + ']', function(assert) {
    assert.deepEqual(exits(test_map, row, column), expected)
  })
}
test_exits(0, 5, ['down'])
test_exits(5, 5, ['up', 'right'])
test_exits(5, 8, ['up', 'left'])
test_exits(1, 8, ['down', 'right'])
test_exits(1, 11, ['down', 'left'])
test_exits(5, 11, ['up', 'right'])
test_exits(5, 14, ['up', 'left'])
test_exits(3, 14, ['down', 'left'])

function test_exit(row, column, entered, expected) {
  QUnit.test('exit(test_map, ' + row + ', ' + column + ', ' + entered + ') === ' + expected, function(assert) {
    assert.equal(exit(test_map, row, column, entered), expected)
  })
}
test_exit(5, 5, 'down', 'right')
test_exit(5, 8, 'right', 'up')
test_exit(1, 8, 'up', 'right')
test_exit(1, 11, 'right', 'down')
test_exit(5, 11, 'down', 'right')
test_exit(5, 14, 'right', 'up')
test_exit(3, 14, 'up', 'left')

QUnit.test('collect_letters(test_map_raw) === "ABCDEF"', function(assert) {
  assert.equal(collect_letters(test_map_raw), 'ABCDEF')
})

// Part 1 solution
QUnit.test('collect_letters(puzzle_input) === "HATBMQJYZ"', function(assert) {
  assert.equal(collect_letters(puzzle_input), 'HATBMQJYZ')
})

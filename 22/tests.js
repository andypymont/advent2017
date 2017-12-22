function test_range(x, expected) {
  QUnit.test('range(' + x + ') === [' + expected.toString() + ']', function(assert) {
    assert.deepEqual(range(x), expected)
  })
}
test_range(1, [0])
test_range(3, [0, 1, 2])
test_range(10, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

function test_add_vectors(v1, v2, expected) {
  QUnit.test('add_vectors("' + v1 + '", "' + v2 + '") === "' + expected + '"', function(assert) {
    assert.equal(add_vectors(v1, v2), expected)
  })
}
test_add_vectors('0,0', '1,1', '1,1')
test_add_vectors('-1,-1', '3,4', '2,3')
test_add_vectors('4,6', '1,-2', '5,4')

function test_read_grid(map, expected) {
  QUnit.test('read_grid("' + map + '") parses correctly', function(assert) {
    assert.deepEqual(read_grid(map), expected)
  })
}
test_read_grid('..#\n#..\n...', {'-1,-1': 0, '0,-1': 0, '1,-1': 1, '-1,0': 1, '0,0': 0, '1,0': 0, '-1,1': 0, '0,1': 0, '1,1': 0})
test_read_grid('###\n...\n###', {'-1,-1': 1, '0,-1': 1, '1,-1': 1, '-1,0': 0, '0,0': 0, '1,0': 0, '-1,1': 1, '0,1': 1, '1,1': 1})

function test_write_grid(grid, expected) {
  QUnit.test('write_grid(...) === "' + expected + '"', function(assert) {
    assert.equal(write_grid(grid), expected)
  })
}
test_write_grid({'-1,-1': 0, '0,-1': 0, '1,-1': 1, '0,-1': 0, '0,0': 1, '1,0': 0, '-1,1': 1, '0,1': 0, '1,1': 0}, '..#\n.#.\n#..')

function test_turn_left(direction, expected) {
  QUnit.test('turn_left("' + direction + '") === "' + expected + '""', function(assert) {
    assert.equal(turn_left(direction), expected)
  })
}
test_turn_left('0,-1', '-1,0')
test_turn_left('-1,0', '0,1')
test_turn_left('0,1', '1,0')
test_turn_left('1,0', '0,-1')

function test_turn_right(direction, expected) {
  QUnit.test('turn_right("' + direction + '") === "' + expected + '"', function(assert) {
    assert.equal(turn_right(direction), expected)
  })
}
test_turn_right('0,-1', '1,0')
test_turn_right('1,0', '0,1')
test_turn_right('0,1', '-1,0')
test_turn_right('-1,0', '0,-1')

function test_sporifica(start, activities, expected) {
  QUnit.test('sporifica("' + start + '", ' + activities + ') === ' + expected, function(assert) {
    assert.equal(sporifica(start, activities), expected)
  })
}
test_sporifica('..#\n#..\n...', 1, '..#\n##.\n...')
test_sporifica('..#\n#..\n...', 2, '..#\n.#.\n...')
test_sporifica('..#\n#..\n...', 6, '##.#.\n###..\n.....')
test_sporifica('..#\n#..\n...', 7, '#..#.\n###..\n.....')
test_sporifica('..#\n#..\n...', 70, '.....##..\n....#..#.\n....#..#.\n..#.#...#\n..#.#..#.\n.....##..\n.........\n.........')

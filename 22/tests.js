// Part 1 tests
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
test_write_grid({'-1,-1': 0, '0,-1': 0, '1,-1': 1, '-1,0': 0, '0,0': 1, '1,0': 0, '-1,1': 1, '0,1': 0, '1,1': 0}, '..#\n.#.\n#..')
test_write_grid({'-2,-1': 1, '-1,-1': 1, '0,-1': 0, '1,-1': 1, '-1,0': 0, '0,0': 1, '1,0': 0, '-1,1': 0, '0,1': 0, '1,1': 0}, '##.#\n..#.\n....')

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
  QUnit.test('sporifica("' + start + '", ' + activities + ').grid === ' + expected, function(assert) {
    assert.equal(sporifica(start, activities).grid, expected)
  })
}
test_sporifica('..#\n#..\n...', 1, '..#\n##.\n...')
test_sporifica('..#\n#..\n...', 2, '..#\n.#.\n...')
test_sporifica('..#\n#..\n...', 3, '#.#\n.#.\n...')
test_sporifica('..#\n#..\n...', 4, '##.#\n..#.\n....')
test_sporifica('..#\n#..\n...', 5, '##.#\n#.#.\n....')
test_sporifica('..#\n#..\n...', 6, '##.#\n###.\n....')
test_sporifica('..#\n#..\n...', 7, '#..#\n###.\n....')
test_sporifica('..#\n#..\n...', 8, '#.##\n###.\n....')
QUnit.test('sporifica("..#\n#..\n..."), 70).infected === 41', function(assert) {
  assert.equal(sporifica('..#\n#..\n...', 70).infected, 41)
})

// Part 1 solution
QUnit.test('sporifica(puzzle_input, 10000).infected === 5266', function(assert) {
  assert.equal(sporifica(puzzle_input, 10000).infected, 5266)
})

// Part 2 tests
function test_reverse(direction, expected) {
  QUnit.test('reverse("' + direction + '") === "' + expected + '"', function(assert) {
    assert.equal(reverse(direction), expected)
  })
}
test_reverse('-1,0', '1,0')
test_reverse('1,0', '-1,0')
test_reverse('0,-1', '0,1')
test_reverse('0,1', '0,-1')

function test_read_grid2(map, expected) {
  QUnit.test('read_grid2("' + map + '") parses correctly', function(assert) {
    assert.deepEqual(read_grid2(map), expected)
  })
}
test_read_grid2('..#\n#..\n...', {'-1,-1': '.', '0,-1': '.', '1,-1': '#', '-1,0': '#', '0,0': '.', '1,0': '.', '-1,1': '.', '0,1': '.', '1,1': '.'})

function test_write_grid2(grid, expected) {
  QUnit.test('write_grid2(...) === "' + expected + '"', function(assert) {
    assert.equal(write_grid2(grid), expected)
  })
}
test_write_grid2({'-1,-1': 'w', '0,-1': '.', '1,-1': '#', '-1,0': '.', '0,0': '#', '1,0': '.', '-1,1': '#', '0,1': '.', '1,1': '.'},
                  'w.#\n.#.\n#..')
test_write_grid2({'-2,-1': '#', '-1,-1': '#', '0,-1': '.', '1,-1': '#', '-1,0': 'f', '0,0': '#', '1,0': '.', '-1,1': '.', '0,1': '.', '1,1': '.'},
                  '##.#\n.f#.\n....')

function test_sporifica2(start, activities, finish, infections) {
  QUnit.test('sporifica2("' + start + '", ' + activities + ') has .grid === "' + finish + '" & .infections === ' + infections, function(assert) {
    result = sporifica2(start, activities)
    assert.equal(result.grid, finish)
    assert.equal(result.infected, infections)
  })
}
test_sporifica2('..#\n#..\n...', 1, '..#\n#w.\n...', 0)
test_sporifica2('..#\n#..\n...', 2, '..#\nfw.\n...', 0)
test_sporifica2('..#\n#..\n...', 3, 'w.#\nfw.\n...', 0)
test_sporifica2('..#\n#..\n...', 4, 'ww.#\n.fw.\n....', 0)
test_sporifica2('..#\n#..\n...', 5, 'ww.#\nwfw.\n....', 0)
test_sporifica2('..#\n#..\n...', 6, 'ww.#\nw.w.\n....', 0)
test_sporifica2('..#\n#..\n...', 7, 'ww.#\n#.w.\n....', 1)
QUnit.test('sporifica2("..#\n#..\n...", 100).infected === 26', function(assert) {
  assert.equal(sporifica2('..#\n#..\n...', 100).infected, 26)
})
QUnit.test('sporifica2("..#\n#..\n...", 10000000).infected === 2511944', function(assert) {
  assert.equal(sporifica2('..#\n#..\n...', 10000000).infected, 2511944)
})

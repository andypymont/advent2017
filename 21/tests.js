// Part 1 tests
function test_flip_horizontal(pattern, expected) {
  QUnit.test('flip_horizontal("' + pattern + '") === "' + expected + '"', function(assert) {
    assert.equal(flip_horizontal(pattern), expected)
  })
}
test_flip_horizontal('../.#', '../#.')
test_flip_horizontal('#./#.', '.#/.#')
test_flip_horizontal('../..', '../..')
test_flip_horizontal('##/..', '##/..')
test_flip_horizontal('.../#.#/.#.', '.../#.#/.#.')
test_flip_horizontal('..#/.#./#..', '#../.#./..#')

function test_flip_vertical(pattern, expected) {
  QUnit.test('flip_vertical("' + pattern + '") === "' + expected + '"', function(assert) {
    assert.equal(flip_vertical(pattern), expected)
  })
}
test_flip_vertical('../.#', '.#/..')
test_flip_vertical('#./#.', '#./#.')
test_flip_vertical('../..', '../..')
test_flip_vertical('##/..', '../##')
test_flip_vertical('.../#.#/.#.', '.#./#.#/...')
test_flip_vertical('..#/.#./#..', '#../.#./..#')

function test_rotate(pattern, times, expected) {
  QUnit.test('rotate("' + pattern + '", ' + times + ') === "' + expected + '"', function(assert) {
    assert.equal(rotate(pattern, times), expected)
  })
}
test_rotate('../.#', 1, '../#.')
test_rotate('../#.', 1, '#./..')
test_rotate('../.#', 2, '#./..')
test_rotate('#./..', 1, '.#/..')
test_rotate('../#.', 2, '.#/..')
test_rotate('../.#', 3, '.#/..')
test_rotate('.../.../..#', 1, '.../.../#..')
test_rotate('.../.../#..', 1, '#../.../...')
test_rotate('.../.../..#', 2, '#../.../...')
test_rotate('#../.../...', 1, '..#/.../...')
test_rotate('.../.../#..', 2, '..#/.../...')
test_rotate('.../.../..#', 3, '..#/.../...')

function test_match(pattern, value) {
  QUnit.test('match("' + pattern + '", "' + value + '") returns true', function(assert) {
    assert.ok(match(pattern, value))
  })
}
function test_doesnt_match(pattern, value) {
  QUnit.test('match("' + pattern + '", "' + value + '") returns false', function(assert) {
    assert.notOk(match(pattern, value))
  })
}
test_match('../.#', '#./..')
test_match('../.#', '.#/..')
test_match('../.#', '../#.')
test_match('../.#', '../.#')
test_doesnt_match('../.#', '##/..')
test_doesnt_match('../.#', '#./#.')
test_doesnt_match('../.#', '../..')

const test1 = '#..#/..../..../#..#'
const test2 = '##.##.#.#/#..#...../......###/##.##..../#..#...#./........#/...###.../###...###/#########'

QUnit.test('breakup_grid(test1) returns correct 2x2 split', function(assert) {
  const grid = breakup_grid(test1)
  assert.equal(grid.length, 2)
  assert.equal(grid[0].length, 2)
  assert.equal(grid[0][0], '#./..')
  assert.equal(grid[0][1], '.#/..')
  assert.equal(grid[1][0], '../#.')
  assert.equal(grid[1][1], '../.#')
})
QUnit.test('breakup_grid(test2) returns correct 3x3 split', function(assert) {
  const grid = breakup_grid(test2)
  assert.equal(grid.length, 3)
  assert.equal(grid[0].length, 3)
  assert.equal(grid[0][0], '##./#../...')
  assert.equal(grid[0][1], '##./#../...')
  assert.equal(grid[0][2], '#.#/.../###')
  assert.equal(grid[1][0], '##./#../...')
  assert.equal(grid[1][1], '##./#../...')
  assert.equal(grid[1][2], '.../.#./..#')
  assert.equal(grid[2][0], '.../###/###')
  assert.equal(grid[2][1], '###/.../###')
  assert.equal(grid[2][2], '.../###/###')
})

const test3 = [
  ['#./..', '.#/..'],
  ['../#.', '../.#']
]

const test4 = [
  ['##./#../...', '##./#../...'],
  ['##./#../...', '##./#../...']
]

QUnit.test('construct_grid(test3) === "#..#/..../..../#..#"', function(assert) {
  assert.equal(construct_grid(test3), '#..#/..../..../#..#')
})
QUnit.test('construct_grid(test4) === "##.##./#..#../....../##.##./#..#../......"', function(assert) {
  assert.equal(construct_grid(test4), '##.##./#..#../....../##.##./#..#../......')
})

const test5 =
`../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`
QUnit.test('test Rulebook object created from test5', function(assert) {
  const rulebook = new Rulebook(test5)
  assert.equal(rulebook.translate('../.#'), '##./#../...')
  assert.equal(rulebook.translate('.#/..'), '##./#../...')
  assert.equal(rulebook.translate('../#.'), '##./#../...')
  assert.equal(rulebook.translate('../.#'), '##./#../...')
  assert.equal(rulebook.translate('.#./..#/###'), '#..#/..../..../#..#')
  assert.equal(rulebook.translate('#../#.#/##.'), '#..#/..../..../#..#')
  assert.equal(rulebook.translate('.#./#../###'), '#..#/..../..../#..#')
})

QUnit.test('run_rules(test5`, 2) === "##.##./#..#../....../##.##./#..#../......"', function(assert) {
  assert.equal(run_rules(test5, 2), '##.##./#..#../....../##.##./#..#../......')
})
QUnit.test('on_count(run_rules(test5, 2)) === 12', function(assert) {
  assert.equal(on_count(run_rules(test5, 2)), 12)
})

// Part 1 result
QUnit.test('on_count(run_rules(puzzle_input, 5)) === 176', function(assert) {
  assert.equal(on_count(run_rules(puzzle_input, 5)), 176)
})

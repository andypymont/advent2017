function test_create_maze(instructions, current) {
  QUnit.test('new Maze(' + instructions.toString() + ',' + current + ') creates object with correct properties', function(assert) {
    const maze = new Maze(instructions, current)
    assert.deepEqual(instructions, maze.instructions)
    assert.equal(current, maze.current)
  })
}

test_create_maze([0, 3, 0, 1, -3], 0)
test_create_maze([1, 1, -1, 2], 1)

function test_progress_maze(instructions, current) {
  QUnit.test('progress_maze(' + instructions.toString() + ') at step ' + current + ' correctly progresses maze', function(assert) {
    const before = new Maze(instructions, current)
    const after = progress_maze(before)
    assert.ok(Maze.prototype.isPrototypeOf(after))
    assert.notDeepEqual(before, after)
    assert.notDeepEqual(before.instructions, after.instructions)
    assert.equal(before.current + before.instructions[before.current], after.current)
  })
}

test_progress_maze([0, 3, 0, 1, -3], 0)
test_progress_maze([1, 3, 0, 1, -3], 0)
test_progress_maze([2, 3, 0, 1, -3], 1)
test_progress_maze([2, 4, 0, 1, -3], 4)
test_progress_maze([2, 4, 0, 1, -2], 1)

function test_escape_maze(instructions, steps) {
  QUnit.test('escape_maze(' + instructions.toString() + ') === ' + steps, function(assert) {
    assert.equal(escape_maze(instructions), steps)
  })
}

test_escape_maze([0, 3, 0, 1, -3], 5)
test_escape_maze([1, 1, -1, -1], 9)
test_escape_maze([3, 2, 1], 1)

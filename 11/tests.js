// Part 1 tests
function test_vector_to_coords(vector, expected) {
  QUnit.test('vector_to_coords("' + vector + '") === [' + expected.toString() + ']',
             assert => assert.deepEqual(vector_to_coords(vector), expected))
}
test_vector_to_coords('0,0', [0, 0])
test_vector_to_coords('20,13', [20, 13])
test_vector_to_coords('-4,3', [-4, 3])

function test_add_vectors(v1, v2, expected) {
  QUnit.test('add_vector("' + v1 + '", "' + v2 + '") === "' + expected + '"',
             assert => assert.equal(add_vectors(v1, v2), expected))
}
test_add_vectors('0,0', '1,4', '1,4')
test_add_vectors('-3,-1', '-1,2', '-4,1')
test_add_vectors('2,2', '-1,3', '1,5')

function test_move_direction(coords, direction, expected) {
  QUnit.test('move_direction("' + coords + '", "' + direction + '") === "' + expected + '"',
             assert => assert.equal(move_direction(coords, direction), expected))
}
test_move_direction('0,0', 'ne', '1,0')
test_move_direction('2,-1', 'n', '2,0')
test_move_direction('0,-1', 'nw', '-1,0')

function test_distance(v1, v2, expected) {
  QUnit.test('distance("' + v1 + '", "' + v2 + '") === ' + expected,
             assert => assert.equal(distance(v1, v2), expected))
}
test_distance('0,0', '3,0', 3)
test_distance('4,4', '4,4', 0)
test_distance('1,1', '3,-1', 2)
test_distance('7,7', '7,4', 3)
test_distance('0,0', '-3,-3', 6)

function test_distance_after_moves(moves, expected) {
  QUnit.test('distance_after_moves("' + moves + '") === ' + expected,
             assert => assert.equal(distance_after_moves(moves), expected))
}
test_distance_after_moves('ne,ne,ne', 3)
test_distance_after_moves('ne,ne,sw,sw', 0)
test_distance_after_moves('ne,ne,s,s', 2)
test_distance_after_moves('se,sw,se,sw,sw', 3)

// Part 1 solution
QUnit.test('distance_after_moves(puzzle_input) === 773',
           assert => assert.equal(distance_after_moves(puzzle_input), 773))

// Part 2 tests
function test_furthest_travelled(moves, expected) {
  QUnit.test('furthest_travelled("' + moves + '") === ' + expected,
             assert => assert.equal(furthest_travelled(moves), expected))
}
test_furthest_travelled('ne,ne,ne', 3)
test_furthest_travelled('ne,ne,sw,sw', 2)
test_furthest_travelled('ne,ne,s,s', 2)
test_furthest_travelled('se,sw,se,sw,sw', 3)
test_furthest_travelled('s,s,s,s,n,n,ne', 4)

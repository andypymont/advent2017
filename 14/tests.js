// Tests for code borrowed from day 10
function test_subarray(array, start, length, expected) {
  QUnit.test('subarray([' + array.toString() + '], ' + start.toString() + ', ' + length.toString() + ') === [' + expected.toString() + ']',
             assert => assert.deepEqual(subarray(array, start, length), expected))
}
test_subarray([0, 1, 2, 3, 4], 0, 3, [0, 1, 2])
test_subarray([0, 1, 2, 3, 4], 4, 2, [4, 0])

function test_reverse_section(list, position, length, expected) {
  QUnit.test('reverse_section([' + list.toString() + '], ' + position.toString() + ', ' + length.toString() + ') === [' + expected.toString() +']',
             assert => assert.deepEqual(reverse_section(list, position, length), expected))
}
test_reverse_section([0, 1, 2, 3, 4], 0, 3, [2, 1, 0, 3, 4])
test_reverse_section([2, 1, 0, 3, 4], 3, 4, [4, 3, 0, 1, 2])
test_reverse_section([4, 3, 0, 1, 2], 3, 1, [4, 3, 0, 1, 2])
test_reverse_section([4, 3, 0, 1, 2], 1, 5, [3, 4, 2, 1, 0])

function test_dense_hash(sparse_hash, expected) {
  QUnit.test('dense_hash([' + sparse_hash + ']) === [' + expected + ']',
             assert => assert.deepEqual(dense_hash(sparse_hash), expected))
}
test_dense_hash([65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22], [64])

function test_hex_string(dense_hash, expected) {
  QUnit.test('hex_string([' + dense_hash + ']) === "' + expected + '"',
             assert => assert.equal(hex_string(dense_hash), expected))
}
test_hex_string([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "00000000000000000000000000000000")
test_hex_string([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], "000102030405060708090a0b0c0d0e0f")

function test_knot_hash(input, expected) {
  QUnit.test('knot_hash("' + input + '") === "' + expected + '"',
             assert => assert.equal(knot_hash(input), expected))
}
test_knot_hash('', 'a2582a3a0e66e6e86e3812dcb672a272')
test_knot_hash('AoC 2017', '33efeb34ea91902bb2f59c9920caa6cd')
test_knot_hash('1,2,3', '3efbe78a8d82f29979031a4aa0b16a9d')
test_knot_hash('1,2,4', '63960835bcdc130f0b66d7ff4f6a5a8e')

// Part 1 tests
function test_binary_string(hex_string, expected) {
  QUnit.test('binary_string("' + hex_string + '") === "' + expected + '"',
             assert => assert.equal(binary_string(hex_string), expected))
}
test_binary_string('a0c2017', '1010000011000010000000010111')

QUnit.test('example grid generated correctly', function(assert) {
  const grid = generate_grid('flqrgnkx')
  const first8 = grid.map(row => row.substring(0, 8))
  assert.ok(grid)
  assert.deepEqual(first8[0], '11010100')
  assert.deepEqual(first8[1], '01010101')
  assert.deepEqual(first8[2], '00001010')
  assert.deepEqual(first8[3], '10101101')
  assert.deepEqual(first8[4], '01101000')
  assert.deepEqual(first8[5], '11001001')
  assert.deepEqual(first8[6], '01000100')
  assert.deepEqual(first8[7], '11010110')
})

// Part 1 solution
QUnit.test('count of 1s in generate_grid(puzzle_input) === 8106',
           assert => assert.equal(generate_grid(puzzle_input).map(row => Array.from(row).filter(x => x === '1').length)
                                                             .reduce((a,b) => a + b, 0),
                                  8106))

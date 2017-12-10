// Part 1 tests:
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

QUnit.test('apply_transformations([0, 1, 2, 3, 4], "3, 4, 1, 5") === [3, 4, 2, 1, 0]',
  assert => assert.deepEqual(apply_transformations([0, 1, 2, 3, 4], "3, 4, 1, 5"), [3, 4, 2, 1, 0]))

function test_checksum(list, expected) {
  QUnit.test('checksum([' + list.toString() + ']) === ' + expected.toString(),
             assert => assert.equal(checksum(list), expected))
}
test_checksum([0, 1, 2, 3, 4], 0)
test_checksum([4, 3, 2], 12)
test_checksum([13, 12, 11, 10], 156)

// Part 1 solution:
QUnit.test('checksum(apply_transformations(array256, puzzle_input)) === 11413',
           assert => assert.equal(checksum(apply_transformations(array256, puzzle_input)), 11413))

// Part 2 tests:
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

function test_hash(input, expected) {
  QUnit.test('hash("' + input + '") === "' + expected + '"',
             assert => assert.equal(hash(input), expected))
}
test_hash('', 'a2582a3a0e66e6e86e3812dcb672a272')
test_hash('AoC 2017', '33efeb34ea91902bb2f59c9920caa6cd')
test_hash('1,2,3', '3efbe78a8d82f29979031a4aa0b16a9d')
test_hash('1,2,4', '63960835bcdc130f0b66d7ff4f6a5a8e')

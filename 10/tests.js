const puzzle_input = '106,16,254,226,55,2,1,166,177,247,93,0,255,228,60,36'
const array256 = Array.from(Array(256).keys())

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

QUnit.test('checksum(apply_transformations(array256, puzzle_input)) === 11413',
           assert => assert.equal(checksum(apply_transformations(array256, puzzle_input)), 11413))

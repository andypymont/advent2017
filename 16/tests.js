// Part 1 tests
function test_lookup_item(list, index, expected) {
  QUnit.test('lookup_item([' + list.toString() + '], ' + index + ') === ' + expected,
             assert => assert.equal(lookup_item(list, index), expected))
}
test_lookup_item([1, 2, 3], 0, 1)
test_lookup_item([1, 2, 3], 2, 3)
test_lookup_item([1, 2, 3], 3, 1)
test_lookup_item([1, 2, 3], 5, 3)
test_lookup_item([1, 2, 3], -1, 3)
test_lookup_item([1, 2, 3], -3, 1)

function test_spin(list, input, expected) {
  QUnit.test('[' + list.toString() + '].map(spin(' + input + ')) === [' + expected.toString() + ']',
             assert => assert.deepEqual(list.map(spin(input)), expected))
}
test_spin(['a', 'b', 'c', 'd', 'e'], 1, ['e', 'a', 'b', 'c', 'd'])
test_spin(['a', 'b', 'c', 'd', 'e'], 3, ['c', 'd', 'e', 'a', 'b'])

function test_exchange(list, input1, input2, expected) {
  QUnit.test('[' + list.toString() + '].map(exchange(' + input1 + ', ' + input2 + ')) == [' + expected.toString() + ']',
             assert => assert.deepEqual(list.map(exchange(input1, input2)), expected))
}
test_exchange(['e', 'a', 'b', 'c', 'd'], 3, 4, ['e', 'a', 'b', 'd', 'c'])
test_exchange(['a', 'b', 'c', 'd', 'e'], 0, 1, ['b', 'a', 'c', 'd', 'e'])
test_exchange(['a', 'b', 'c', 'd', 'e'], 0, 3, ['d', 'b', 'c', 'a', 'e'])

function test_partner(list, input1, input2, expected) {
  QUnit.test('[' + list.toString() + '].map(partner(' + input1 + ', ' + input2 + ')) == [' + expected.toString() + ']',
             assert => assert.deepEqual(list.map(partner(input1, input2)), expected))
}
test_partner(['a', 'b', 'c', 'd', 'e'], 'a', 'c', ['c', 'b', 'a', 'd', 'e'])
test_partner(['a', 'b', 'c', 'd', 'e'], 'b', 'e', ['a', 'e', 'c', 'd', 'b'])
test_partner(['e', 'a', 'b', 'd', 'c'], 'e', 'b', ['b', 'a', 'e', 'd', 'c'])

function test_dance(dancers, instructions, expected) {
  QUnit.test('dance(' + dancers + ', ' + instructions + ') === ' + expected,
             assert => assert.equal(dance(dancers, instructions), expected))
}
test_dance(5, 's1,x3/4,pe/b', 'baedc')

// Part 1 result
QUnit.test('dance(16, puzzle_input) === "dcmlhejnifpokgba"',
           assert => assert.equal(dance(16, puzzle_input), 'dcmlhejnifpokgba'))

// Part 2 tests
QUnit.test('dance_repeats(5, "s1,x3/4,pe/b") === 4',
           assert => assert.equal(dance_repeats(5, 's1,x3/4,pe/b'), 4))
QUnit.test('dance_repeatedly(5, "s1,x3/4,pe/b", 4000000000) === "abcde"',
           assert => assert.equal(dance_repeatedly(5, 's1,x3/4,pe/b', 4000000000), 'abcde'))

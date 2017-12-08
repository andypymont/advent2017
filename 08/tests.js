const example1 =
`b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`

function test_comparison(a, comparison, b, expected) {
  QUnit.test('comparisons["' + comparison + '"](, ' + a + ', ' + b + ') === ' + expected, function(assert) {
    assert.equal(comparisons[comparison](a, b), expected)
  })
}
test_comparison(2, '>', 1, true)
test_comparison(1, '>', 2, false)
test_comparison(1, '>', 1, false)
test_comparison(1, '<', 2, true)
test_comparison(2, '<', 1, false)
test_comparison(1, '<', 1, false)
test_comparison(2, '>=', 1, true)
test_comparison(1, '>=', 2, false)
test_comparison(1, '>=', 1, true)
test_comparison(2, '<=', 1, false)
test_comparison(1, '<=', 2, true)
test_comparison(1, '<=', 1, true)
test_comparison(2, '==', 1, false)
test_comparison(1, '==', 2, false)
test_comparison(1, '==', 1, true)
test_comparison(2, '!=', 1, true)
test_comparison(1, '!=', 2, true)
test_comparison(1, '!=', 1, false)

function test_process_instruction(text, expected_register) {
  QUnit.test('instruction "' + text + '" correctly processed', function(assert) {
    const register = {'maximum_value': 0}
    process_instruction(register, text)
    assert.deepEqual(register, expected_register)
  })
}
test_process_instruction('b inc 5 if a > 1', {'maximum_value': 0})
test_process_instruction('a inc 1 if b < 5', {'a': 1, 'maximum_value': 1})
test_process_instruction('c dec -10 if a == 0', {'c': 10, 'maximum_value': 10})

QUnit.test('process_instructions(example1) correctly processed', function(assert) {
  assert.deepEqual(process_instructions(example1), {'a': 1, 'c': -10, 'maximum_value': 10})
})

QUnit.test('maximum_register_value(process_instructions(example1)) === 1', function(assert) {
  assert.equal(maximum_register_value(process_instructions(example1)), 1)
})

// part 1 solution:
QUnit.test('maximum_register_value(process_instructions(puzzle_input)) === 8022', function(assert) {
  assert.equal(maximum_register_value(process_instructions(puzzle_input)), 8022)
})

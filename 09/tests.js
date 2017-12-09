// Part 1 tests:
function test_remove_ignored(stream, expected) {
  QUnit.test('remove_ignored("' + stream + '") returns "' + expected + '"', function(assert) {
    assert.equal(remove_ignored(stream), expected)
  })
}
test_remove_ignored('<!!>', '<>')
test_remove_ignored('<{!>}>', '<{}>')
test_remove_ignored('testymctesterson!!', 'testymctesterson')

function test_is_garbage(stream) {
  stream = "{" + stream + "}"
  QUnit.test('groups_to_lists(parse_stream("' + stream + '")) returns empty list as it is garbage', function(assert) {
    assert.deepEqual(groups_to_lists(parse_stream(stream)), [])
  })
}
test_is_garbage('<>')
test_is_garbage('<random characters>')
test_is_garbage('<<<<>')
test_is_garbage('<{!>}>')
test_is_garbage('<!!>')
test_is_garbage('<!!!>>')
test_is_garbage('<{o"i!a,<{i<a>')

function test_parse_stream(stream, expected) {
  QUnit.test('groups_to_lists(parse_stream("' + stream + '")) returns ' + expected.toString(), function(assert) {
    assert.deepEqual(groups_to_lists(parse_stream(stream)), expected)
  })
}
test_parse_stream('{}', [])
test_parse_stream('{{{}}}', [[[]]])
test_parse_stream('{{},{}}', [[],[]])
test_parse_stream('{{{},{},{{}}}}', [[[],[],[[]]]])
test_parse_stream('{<{},{},{{}}>}', [])
test_parse_stream('{{<a>},{<a>},{<a>},{<a>}}', [[],[],[],[]])
test_parse_stream('{{<!>},{<!>},{<!>},{<a>}}', [[]])

function test_value_groups(stream, expected) {
  QUnit.test('value_groups(groups_to_lists(parse_stream("' + stream + '"))) returns ' + expected.toString(), function(assert) {
    assert.equal(value_groups(groups_to_lists(parse_stream(stream))), expected)
  })
}
test_value_groups('{}', 1)
test_value_groups('{{{}}}', 6)
test_value_groups('{{},{}}', 5)
test_value_groups('{{{},{},{{}}}}', 16)
test_value_groups('{<a>,<a>,<a>,<a>}', 1)
test_value_groups('{{<ab>},{<ab>},{<ab>},{<ab>}}', 9)
test_value_groups('{{<!!>},{<!!>},{<!!>},{<!!>}}', 9)
test_value_groups('{{<a!>},{<a!>},{<a!>},{<ab>}}', 3)

// Part 1 solution:
QUnit.test('value_groups(groups_to_lists(parse_stream(puzzle_input))) === 12897', function(assert) {
  assert.equal(value_groups(groups_to_lists(parse_stream(puzzle_input))), 12897)
})

// Part 2 solution:
function test_garbage_count(stream, expected) {
  QUnit.test('garbage_count(parse_stream("' + stream + '")) === ' + expected.toString(), function(assert) {
    assert.equal(garbage_count(parse_stream(stream)), expected)
  })
}
test_garbage_count('<>', 0)
test_garbage_count('<random characters', 17)
test_garbage_count('<<<<>', 3)
test_garbage_count('<{!>}>', 2)
test_garbage_count('<!!>', 0)
test_garbage_count('<!!!>>', 0)
test_garbage_count('<{o"i!a,<{i<a>', 10)

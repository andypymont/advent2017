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
  QUnit.test('parse_stream("' + stream + '") returns empty list as it is garbage', function(assert) {
    assert.deepEqual(parse_stream(stream), [])
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
  QUnit.test('parse_stream("' + stream + '") returns ' + expected.toString(), function(assert) {
    assert.deepEqual(parse_stream(stream), expected)
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
  QUnit.test('value_groups(parse_stream("' + stream + '")) returns ' + expected.toString(), function(assert) {
    assert.equal(value_groups(parse_stream(stream)), expected)
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

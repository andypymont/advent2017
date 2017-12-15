const t1 =
`0: 3
1: 2
4: 4
6: 4`
const t2 =
`1: 4
2: 14
5: 1
7: 2`
const t3 =
`0: 1
1: 2
2: 3
3: 4
4: 5
5: 6`

// Part 1 tests
function test_parse_scanners(name, text, expected) {
  QUnit.test('parse_scanners(' + name + ') parsed correctly',
             assert => assert.deepEqual(parse_scanners(text), expected))
}
test_parse_scanners('t1', t1, {0: 3, 1: 2, 4: 4, 6: 4})
test_parse_scanners('t2', t2, {1: 4, 2: 14, 5: 1, 7:2})
test_parse_scanners('t3', t3, {0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5:6})

function test_scanner_at_depth(name, text, picosecond, expected) {
  QUnit.test('scanner_at_depth(parse_scanners(' + name + '), ' + picosecond + ', 0) === ' + expected,
             assert => assert.equal(scanner_at_depth(parse_scanners(text), picosecond, 0), expected))
}
test_scanner_at_depth('t1', t1, 0, true)
test_scanner_at_depth('t1', t1, 1, false)
test_scanner_at_depth('t1', t1, 2, false)
test_scanner_at_depth('t1', t1, 3, false)
test_scanner_at_depth('t1', t1, 4, false)
test_scanner_at_depth('t1', t1, 5, false)
test_scanner_at_depth('t1', t1, 6, true)

function test_severity(name, text, expected) {
  QUnit.test('severity(journey(parse_scanners(' + name + '))) === ' + expected,
             assert => assert.equal(severity(journey(parse_scanners(text))), expected))
}
test_severity('t1', t1, 24)

// Part 1 result
QUnit.test('severity(journey(parse_scanners(puzzle_input))) === 1840',
           assert => assert.equal(severity(journey(parse_scanners(puzzle_input))), 1840))

// Part 2 tests
QUnit.test('delay_needed(parse_scanners(t1)) === 10',
           assert => assert.equal(delay_needed(parse_scanners(t1)), 10))

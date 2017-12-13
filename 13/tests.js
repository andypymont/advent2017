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


function test_parse_scanners(name, text, expected) {
  QUnit.test('parse_scanners(' + name + ') parsed correctly',
             assert => assert.deepEqual(parse_scanners(text), expected))
}
test_parse_scanners('t1', t1, {0: 3, 1: 2, 4: 4, 6: 4})
test_parse_scanners('t2', t2, {1: 4, 2: 14, 5: 1, 7:2})
test_parse_scanners('t3', t3, {0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5:6})

function test_scanner_position(range, picosecond, expected) {
  QUnit.test('scanner_position(' + range + ', ' + picosecond + ') === ' + expected,
             assert => assert.equal(scanner_position(range, picosecond), expected))
}
test_scanner_position(1, 0, 0)
test_scanner_position(2, 0, 0)
test_scanner_position(2, 1, 1)
test_scanner_position(2, 2, 0)
test_scanner_position(3, 0, 0)
test_scanner_position(3, 1, 1)
test_scanner_position(3, 2, 2)
test_scanner_position(3, 3, 1)
test_scanner_position(3, 4, 0)
test_scanner_position(3, 5, 1)
test_scanner_position(4, 0, 0)
test_scanner_position(4, 1, 1)
test_scanner_position(4, 2, 2)
test_scanner_position(4, 3, 3)
test_scanner_position(4, 4, 2)
test_scanner_position(4, 5, 1)
test_scanner_position(4, 6, 0)
test_scanner_position(4, 7, 1)
test_scanner_position(4, 8, 2)
test_scanner_position(4, 9, 3)
test_scanner_position(4, 10, 2)

function test_scanner_at_depth(name, text, picosecond, expected) {
  QUnit.test('scanner_at_depth(parse_scanners(' + name + '), ' + picosecond + ') === ' + expected,
             assert => assert.equal(scanner_at_depth(parse_scanners(text), picosecond), expected))
}
test_scanner_at_depth('t1', t1, 0, true)
test_scanner_at_depth('t1', t1, 1, false)
test_scanner_at_depth('t1', t1, 2, false)
test_scanner_at_depth('t1', t1, 3, false)
test_scanner_at_depth('t1', t1, 4, false)
test_scanner_at_depth('t1', t1, 5, false)
test_scanner_at_depth('t1', t1, 6, true)

function test_journey(name, text, expected) {
  QUnit.test('test_journey(parse_scanners(' + name + ')) === ' + expected,
             assert => assert.equal(journey(parse_scanners(text)), expected))
}
test_journey('t1', t1, 24)

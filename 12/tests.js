// Part 1 tests
const t1 =
`0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`

const t2 =
`0 <-> 4
1 <-> 2, 3
2 <-> 5
3 <-> 6
4 <-> 7
5 <-> 5
6 <-> 5
7 <-> 7`

const t3 =
`0 <-> 2
1 <-> 1
2 <-> 2
3 <-> 3, 4
4 <-> 4`

function test_parse_programs(name, text, expected) {
  QUnit.test('parse_programs("' + name + '") returns expected structure',
             assert => assert.deepEqual(parse_programs(text), expected))
}
test_parse_programs(
  't1',
  t1,
  {
    0: [2],
    1: [1],
    2: [0, 3, 4],
    3: [2, 4],
    4: [2, 3, 6],
    5: [6],
    6: [4, 5]
  }
)

test_parse_programs(
  't2',
  t2,
  {
    0: [4],
    1: [2, 3],
    2: [5],
    3: [6],
    4: [7],
    5: [5],
    6: [5],
    7: [7]
  }
)

test_parse_programs(
  't3',
  t3,
  {
    0: [2],
    1: [1],
    2: [2],
    3: [3, 4],
    4: [4]
  }
)

function test_group_programs(name, text, expected) {
  QUnit.test('group_programs(parse_programs(' + name + ')) returns expected list',
             assert => assert.deepEqual(group_programs(parse_programs(text)), expected))
}
test_group_programs(
  't1',
  t1,
  new Set([0, 2, 3, 4, 5, 6])
)
test_group_programs(
  't2',
  t2,
  new Set([0, 4, 7])
)

// Part 1 solution
QUnit.test('group_programs(parse_programs(puzzle_input)).length === 306',
           assert => assert.equal(group_programs(parse_programs(puzzle_input)).size, 306))

// Part 2 tests
function test_group_count(name, text, expected) {
  QUnit.test('group_count(parse_programs(' + name + ')) === ' + expected,
             assert => assert.equal(group_count(parse_programs(text)), expected))
}
test_group_count('t1', t1, 2)
test_group_count('t2', t2, 2)
test_group_count('t3', t3, 3)

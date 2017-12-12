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
4 <-> 5
5 <-> 5
6 <-> 5`

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
    4: [5],
    5: [5],
    6: [5]
  }
)

function test_group_programs(name, text, expected) {
  QUnit.test('group_programs(parse_programs(' + name + ')) returns expected list',
             assert => assert.deepEqual(new Set(group_programs(parse_programs(text))), new Set(expected)))
}
test_group_programs(
  't1',
  t1,
  [0, 2, 3, 4, 5, 6]
)
test_group_programs(
  't2',
  t2,
  [0, 4, 5]
)

// Part 1 solution
QUnit.test('group_programs(parse_programs(puzzle_input)).length === 306',
           assert => assert.equal(group_programs(parse_programs(puzzle_input)).length, 306))

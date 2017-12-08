// Part 1 tests:
example1 =
`pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)`

example2 =
`leaf4 (66)
leaf9 (57)
leaf2 (61)
leaf5 (66)
leaf7 (57)
branch3 (72) -> leaf7, leaf8, leaf9
leaf6 (66)
branch2 (45) -> leaf4, leaf5, leaf6
root (41) -> branch1, branch2, branch3
leaf3 (61)
branch1 (68) -> leaf1, leaf2, leaf3
leaf1 (61)
leaf8 (57)`

example3 =
`leaf1 (10)
leaf2 (5)
leaf3 (10)
leaf4 (30)
branch1 (10) -> leaf1, leaf2, leaf3
branch2 (10) -> leaf4
branch3 (40)
root (10) -> branch1, branch2, branch3`

QUnit.test('nodes_from_text(example1)', function(assert) {
  assert.deepEqual(nodes_from_text(example1),
                   {'pbga': {'name': 'pbga', 'weight': 66, 'children': []},
                    'xhth': {'name': 'xhth', 'weight': 57, 'children': []},
                    'ebii': {'name': 'ebii', 'weight': 61, 'children': []},
                    'havc': {'name': 'havc', 'weight': 66, 'children': []},
                    'ktlj': {'name': 'ktlj', 'weight': 57, 'children': []},
                    'fwft': {'name': 'fwft', 'weight': 72, 'children': ['ktlj', 'cntj', 'xhth']},
                    'qoyq': {'name': 'qoyq', 'weight': 66, 'children': []},
                    'padx': {'name': 'padx', 'weight': 45, 'children': ['pbga', 'havc', 'qoyq']},
                    'tknk': {'name': 'tknk', 'weight': 41, 'children': ['ugml', 'padx', 'fwft']},
                    'jptl': {'name': 'jptl', 'weight': 61, 'children': []},
                    'ugml': {'name': 'ugml', 'weight': 68, 'children': ['gyxo', 'ebii', 'jptl']},
                    'gyxo': {'name': 'gyxo', 'weight': 61, 'children': []},
                    'cntj': {'name': 'cntj', 'weight': 57, 'children': []}
                  })
})
QUnit.test('nodes_from_text(example2)', function(assert) {
  assert.deepEqual(nodes_from_text(example2),
                   {'leaf4': {'name': 'leaf4', 'weight': 66, 'children': []},
                    'leaf9': {'name': 'leaf9', 'weight': 57, 'children': []},
                    'leaf2': {'name': 'leaf2', 'weight': 61, 'children': []},
                    'leaf5': {'name': 'leaf5', 'weight': 66, 'children': []},
                    'leaf7': {'name': 'leaf7', 'weight': 57, 'children': []},
                    'branch3': {'name': 'branch3', 'weight': 72, 'children': ['leaf7', 'leaf8', 'leaf9']},
                    'leaf6': {'name': 'leaf6', 'weight': 66, 'children': []},
                    'branch2': {'name': 'branch2', 'weight': 45, 'children': ['leaf4', 'leaf5', 'leaf6']},
                    'root': {'name': 'root', 'weight': 41, 'children': ['branch1', 'branch2', 'branch3']},
                    'leaf3': {'name': 'leaf3', 'weight': 61, 'children': []},
                    'branch1': {'name': 'branch1', 'weight': 68, 'children': ['leaf1', 'leaf2', 'leaf3']},
                    'leaf1': {'name': 'leaf1', 'weight': 61, 'children': []},
                    'leaf8': {'name': 'leaf8', 'weight': 57, 'children': []}
                   })
})
QUnit.test('nodes_from_text(example3)', function(assert) {
  assert.deepEqual(nodes_from_text(example3),
                   {'leaf2': {'name': 'leaf2', 'weight': 5, 'children': []},
                    'root': {'name': 'root', 'weight': 10, 'children': ['branch1', 'branch2', 'branch3']},
                    'leaf3': {'name': 'leaf3', 'weight': 10, 'children': []},
                    'branch1': {'name': 'branch1', 'weight': 10, 'children': ['leaf1', 'leaf2', 'leaf3']},
                    'leaf1': {'name': 'leaf1', 'weight': 10, 'children': []},
                    'leaf4': {'name': 'leaf4', 'weight': 30, 'children': []},
                    'branch2': {'name': 'branch2', 'weight': 10, 'children': ['leaf4']},
                    'branch3': {'name': 'branch3', 'weight': 40, 'children': []}
                   })
})

QUnit.test('bottom_of_tower(nodes_from_text(example1)) === "tknk"', function(assert) {
  assert.equal(bottom_of_tower(nodes_from_text(example1)), 'tknk')
})
QUnit.test('bottom_of_tower(nodes_from_text(example2)) === "root"', function(assert) {
  assert.equal(bottom_of_tower(nodes_from_text(example2)), 'root')
})

// Part 1 solution:
QUnit.test('bottom_of_tower(nodes_from_text(puzzle_input))', function(assert) {
  assert.equal(bottom_of_tower(nodes_from_text(puzzle_input)), 'ykpsek')
})

// Part 2 tests:
QUnit.test('tower(example1)', function(assert) {
  let branch1 = {'name': 'ugml', 'weight': 68, 'children': [{'name': 'gyxo', 'weight': 61, 'children': []},
                                                            {'name': 'ebii', 'weight': 61, 'children': []},
                                                            {'name': 'jptl', 'weight': 61, 'children': []}]}
  let branch2 = {'name': 'padx', 'weight': 45, 'children': [{'name': 'pbga', 'weight': 66, 'children': []},
                                                            {'name': 'havc', 'weight': 66, 'children': []},
                                                            {'name': 'qoyq', 'weight': 66, 'children': []}]}
  let branch3 = {'name': 'fwft', 'weight': 72, 'children': [{'name': 'ktlj', 'weight': 57, 'children': []},
                                                            {'name': 'cntj', 'weight': 57, 'children': []},
                                                            {'name': 'xhth', 'weight': 57, 'children': []}]}
  assert.deepEqual(tower(example1),
                   {'name': 'tknk', 'weight': 41, 'children': [branch1, branch2, branch3]})
})

QUnit.test('total_weight() for ugml in example1', function(assert) {
  assert.equal(total_weight(tower(example1)['children'][0]), 251)
})
QUnit.test('total_weight() for padx in example1', function(assert) {
  assert.equal(total_weight(tower(example1)['children'][1]), 243)
})

QUnit.test('correct_weight(tower(example1)) returns 60', function(assert) {
  assert.equal(correct_weight(tower(example1)), 60)
})
QUnit.test('correct_weight(tower(example3)) returns 10', function(assert) {
  assert.equal(correct_weight(tower(example3)), 10)
})

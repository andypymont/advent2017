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
`leaf2 (61)
root (41) -> branch1
leaf3 (61)
branch1 (68) -> leaf1, leaf2, leaf3
leaf1 (61)`

QUnit.test('bottom_of_tower(example1) === "tknk"', function(assert) {
  assert.equal(bottom_of_tower(example1), 'tknk')
})
QUnit.test('bottom_of_tower(example2) === "root"', function(assert) {
  assert.equal(bottom_of_tower(example2), 'root')
})

QUnit.test('node_list_from_text(example1)', function(assert) {
  assert.deepEqual(node_list_from_text(example1),
                   [{'name': 'pbga', 'weight': 66, 'children': []},
                    {'name': 'xhth', 'weight': 57, 'children': []},
                    {'name': 'ebii', 'weight': 61, 'children': []},
                    {'name': 'havc', 'weight': 66, 'children': []},
                    {'name': 'ktlj', 'weight': 57, 'children': []},
                    {'name': 'fwft', 'weight': 72, 'children': ['ktlj', 'cntj', 'xhth']},
                    {'name': 'qoyq', 'weight': 66, 'children': []},
                    {'name': 'padx', 'weight': 45, 'children': ['pbga', 'havc', 'qoyq']},
                    {'name': 'tknk', 'weight': 41, 'children': ['ugml', 'padx', 'fwft']},
                    {'name': 'jptl', 'weight': 61, 'children': []},
                    {'name': 'ugml', 'weight': 68, 'children': ['gyxo', 'ebii', 'jptl']},
                    {'name': 'gyxo', 'weight': 61, 'children': []},
                    {'name': 'cntj', 'weight': 57, 'children': []}
                  ])
})
QUnit.test('node_list_from_text(example2)', function(assert) {
  assert.deepEqual(node_list_from_text(example2),
                   [{'name': 'leaf4', 'weight': 66, 'children': []},
                    {'name': 'leaf9', 'weight': 57, 'children': []},
                    {'name': 'leaf2', 'weight': 61, 'children': []},
                    {'name': 'leaf5', 'weight': 66, 'children': []},
                    {'name': 'leaf7', 'weight': 57, 'children': []},
                    {'name': 'branch3', 'weight': 72, 'children': ['leaf7', 'leaf8', 'leaf9']},
                    {'name': 'leaf6', 'weight': 66, 'children': []},
                    {'name': 'branch2', 'weight': 45, 'children': ['leaf4', 'leaf5', 'leaf6']},
                    {'name': 'root', 'weight': 41, 'children': ['branch1', 'branch2', 'branch3']},
                    {'name': 'leaf3', 'weight': 61, 'children': []},
                    {'name': 'branch1', 'weight': 68, 'children': ['leaf1', 'leaf2', 'leaf3']},
                    {'name': 'leaf1', 'weight': 61, 'children': []},
                    {'name': 'leaf8', 'weight': 57, 'children': []}
                  ])
})
QUnit.test('node_list_from_text(example3)', function(assert) {
  assert.deepEqual(node_list_from_text(example3),
                   [{'name': 'leaf2', 'weight': 61, 'children': []},
                    {'name': 'root', 'weight': 41, 'children': ['branch1']},
                    {'name': 'leaf3', 'weight': 61, 'children': []},
                    {'name': 'branch1', 'weight': 68, 'children': ['leaf1', 'leaf2', 'leaf3']},
                    {'name': 'leaf1', 'weight': 61, 'children': []}
                  ])
})

// Part 1
const example1 =
`0/1
1/2
1/3`

const example2 =
`0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10`

function test_valid_connection(component, connector, expected) {
  QUnit.test('valid_connection("' + component + '", "' + connector + '") === ' + expected, function(assert) {
    assert.deepEqual(valid_connection(component, connector), expected)
  })
}
test_valid_connection('0/1', '0', '1')
test_valid_connection('0/1', '1', '0')
test_valid_connection('0/1', '2', false)
test_valid_connection('10/4', '10', '4')
test_valid_connection('10/4', '4', '10')
test_valid_connection('10/4', '7', false)
test_valid_connection('10/4', '1', false)

QUnit.test('parse_components(example1)', function(assert) {
  assert.deepEqual(parse_components(example1),
                   ['0/1', '1/2', '1/3'])
})

QUnit.test('parse_components(example2)', function(assert) {
  assert.deepEqual(parse_components(example2),
                   ['0/2', '2/2', '2/3', '3/4', '3/5', '0/1', '10/1', '9/10'])
})

function setsEqual(assert, set1, set2) {
  set1 = Array.from(set1).sort()
  set2 = Array.from(set2).sort()
  assert.deepEqual(set1, set2)
}

QUnit.test('possible_bridges(parse_components(example1)) calculated correctly', function(assert) {
  setsEqual(assert, possible_bridges(parse_components(example1)),
                    new Set(['0/1', '0/1--1/2', '0/1--1/3']))
})

QUnit.test('possible_bridges(parse_components(example2)) calculated correctly', function(assert) {
  setsEqual(assert, possible_bridges(parse_components(example2)),
                    new Set(['0/1', '0/1--10/1', '0/1--10/1--9/10', '0/2', '0/2--2/3', '0/2--2/3--3/4', '0/2--2/3--3/5',
                             '0/2--2/2', '0/2--2/2--2/3', '0/2--2/2--2/3--3/4', '0/2--2/2--2/3--3/5']))
})

QUnit.test('example 1 iteration: possible_bridges(["1/2", "1/3"], "0/1", "1", bridges) adds two combinations to bridges', function(assert) {
  const bridges = new Set()
  possible_bridges(['1/2', '1/3'], '0/1', '1', bridges)
  assert.equal(bridges.size, 2)
  assert.ok(bridges.has('0/1--1/2'))
  assert.ok(bridges.has('0/1--1/3'))
})

QUnit.test('example 1 iteration: possible_bridges(["1/3"], "0/1--1/2", "2", bridges) does not add combinations to the bridge', function(assert) {
  const bridges = new Set()
  possible_bridges(['1/3'], '0/1--1/2', '2', bridges)
  assert.equal(bridges.size, 0)
})

function test_bridge_strength(bridge, expected) {
  QUnit.test('bridge_strength("' + bridge + '") === ' + expected, function(assert) {
    assert.equal(bridge_strength(bridge), expected)
  })
}
test_bridge_strength('0/1--1/2', 4)
test_bridge_strength('0/1--10/1', 12)
test_bridge_strength('0/2--2/3--3/5', 15)
test_bridge_strength('0/1--10/1--9/10', 31)

QUnit.test('strongest_bridge(possible_bridges(parse_components(example1))) === 5', function(assert) {
  assert.equal(strongest_bridge(possible_bridges(parse_components(example1))), 5)
})

QUnit.test('strongest_bridge(possible_bridges(parse_components(example2))) === 31', function(assert) {
  assert.equal(strongest_bridge(possible_bridges(parse_components(example2))), 31)
})

// Part 2
function test_bridge_length(bridge, expected) {
  QUnit.test('bridge_length("' + bridge + '") === ' + expected, function(assert) {
    assert.equal(bridge_length(bridge), expected)
  })
}
test_bridge_length('0/1', 1)
test_bridge_length('0/1--10/1', 2)
test_bridge_length('0/2--2/3--3/5', 3)
test_bridge_length('0/2--2/2--2/3--3/5', 4)

QUnit.test('longest_bridge(possible_bridges(parse_components(example1))) === 2', function(assert) {
  assert.equal(longest_bridge(possible_bridges(parse_components(example1))), 2)
})
QUnit.test('longest_bridge(possible_bridges(parse_components(example1))) === 4', function(assert) {
  assert.equal(longest_bridge(possible_bridges(parse_components(example2))), 4)
})
QUnit.test('strongest_long_bridge(possible_bridges(parse_components(example1))) === 5', function(assert) {
  assert.equal(strongest_long_bridge(possible_bridges(parse_components(example1))), 5)
})
QUnit.test('strongest_long_bridge(possible_bridges(parse_components(example2))) === 19', function(assert) {
  assert.equal(strongest_long_bridge(possible_bridges(parse_components(example2))), 19)
})

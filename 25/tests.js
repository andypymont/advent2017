const test1 =
`Begin in state A.
Perform a diagnostic checksum after 4 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.`

const test1_expected = {
  begin: 'A',
  steps: 4,
  states: {
    'A': {
      0: { write: 1, move: 1, next: 'A' },
      1: { write: 1, move: 1, next: 'A'}
    }
  },
  tape: {},
  cursor: 0,
  state: 'A'
}

const example =
`Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.`

const example_expected = {
  begin: 'A',
  steps: 6,
  states: {
    'A': {
      0: { write: 1, move: 1, next: 'B' },
      1: { write: 0, move: -1, next: 'B' }
    },
    'B': {
      0: { write: 1, move: -1, next: 'A' },
      1: { write: 1, move: 1, next: 'A' }
    }
  },
  tape: {},
  cursor: 0,
  state: 'A'
}

QUnit.test('read_machine(test1) === test1_machine', function(assert) {
  const machine = new Machine(test1)
  assert.ok(machine instanceof Machine)
  assert.deepEqual(Object.keys(machine).sort(), Object.keys(test1_expected).sort())
  assert.equal(machine.begin, test1_expected.begin)
  assert.equal(machine.steps, test1_expected.steps)
  assert.deepEqual(Array.from(machine.tape), [])
  assert.equal(machine.cursor, 0)
  assert.deepEqual(machine.states, test1_expected.states)
})

QUnit.test('read_machine(example) === example_machine', function(assert) {
  const machine = new Machine(example)
  assert.ok(machine instanceof Machine)
  assert.deepEqual(Object.keys(machine).sort(), Object.keys(example_expected).sort())
  assert.equal(machine.begin, example_expected.begin)
  assert.equal(machine.steps, example_expected.steps)
  assert.deepEqual(Array.from(machine.tape), [])
  assert.equal(machine.cursor, 0)
  assert.deepEqual(machine.states, example_expected.states)
})

QUnit.test('Machine.get', function(assert) {
  const machine = new Machine('')
  assert.equal(machine.get(0), 0)
  machine.tape.add(0)
  assert.equal(machine.get(0), 1)
})

function test_machine_next(name, instructions, steps, expected_tape, expected_cursor) {
  QUnit.test('calling (new Machine(' + name + ')).next() ' + steps + ' times produces cursor === ' + expected_cursor + ' & tape with 1s at [' + expected_tape + ']', function(assert) {
    const machine = new Machine(instructions)
    range(steps).forEach(x => machine.next())
    assert.equal(machine.cursor, expected_cursor)
    assert.deepEqual(Array.from(machine.tape).sort(), expected_tape.sort())
  })
}
test_machine_next('example', example, 0, [], 0)
test_machine_next('example', example, 1, [0], 1)
test_machine_next('example', example, 2, [0, 1], 0)
test_machine_next('example', example, 3, [1], -1)
test_machine_next('example', example, 4, [-1, 1], -2)
test_machine_next('example', example, 5, [-2, -1, 1], -1)
test_machine_next('example', example, 6, [-2, -1, 1], 0)

QUnit.test('fully running example === 3', function(assert) {
  const m = new Machine(example)
  assert.equal(m.run(), 3)
})

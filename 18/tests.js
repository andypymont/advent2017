// Part 1 tests
QUnit.test('creation of empty Duet object', function(assert) {
  const duet = new Duet()
  assert.ok(duet)
  assert.equal(duet.sound, 0)
  assert.deepEqual(duet.registers, {})
})
QUnit.test('get value from an empty register === 0' , function(assert) {
  const duet = new Duet()
  assert.equal(duet.get('a'), 0)
  assert.equal(duet.get('b'), 0)
})
QUnit.test('get numerical value from register returns the string converted to number', function(assert) {
  const duet = new Duet()
  assert.equal(duet.get('3'), 3)
  assert.equal(duet.get('42'), 42)
})
QUnit.test('simple Duet.set and Duet.get', function(assert) {
  const duet = new Duet()
  assert.equal(duet.get('a'), 0)
  duet.set('a', 4)
  assert.equal(duet.get('a'), 4)
})
QUnit.test('Duet.set-as-copy', function(assert) {
  const duet = new Duet()
  assert.equal(duet.get('a'), 0)
  assert.equal(duet.get('b'), 0)
  duet.set('a', 4)
  assert.equal(duet.get('a'), 4)
  assert.equal(duet.get('b'), 0)
  duet.set('b', 'a')
  assert.equal(duet.get('a'), 4)
  assert.equal(duet.get('b'), 4)
  duet.set('a', 2)
  assert.equal(duet.get('a'), 2)
  assert.equal(duet.get('b'), 4)
})
QUnit.test('Duet.snd', function(assert) {
  const duet = new Duet()
  assert.equal(duet.sound, 0)
  duet.snd(3)
  assert.equal(duet.sound, 3)
  duet.set('a', 7)
  duet.snd('a')
  assert.equal(duet.sound, 7)
})
QUnit.test('Duet.add', function(assert) {
  const duet = new Duet()
  assert.equal(duet.get('c'), 0)
  duet.add('c', 3)
  assert.equal(duet.get('c'), 3)
  duet.add('c', -2)
  assert.equal(duet.get('c'), 1)
  duet.add('d', 1)
  duet.add('c', 'd')
  assert.equal(duet.get('c'), 2)
})
QUnit.test('Duet.mul', function(assert) {
  const duet = new Duet()
  assert.equal(duet.get('d'), 0)
  duet.set('d', 1)
  assert.equal(duet.get('d'), 1)
  duet.mul('d', 4)
  assert.equal(duet.get('d'), 4)
  duet.mul('d', 3)
  assert.equal(duet.get('d'), 12)
  duet.set('e', 2)
  duet.mul('d', 'e')
  assert.equal(duet.get('d'), 24)
})
QUnit.test('Duet.mod', function(assert) {
  const duet = new Duet()
  assert.equal(duet.get('e'), 0)
  duet.set('e', 5)
  assert.equal(duet.get('e'), 5)
  duet.mod('e', 2)
  assert.equal(duet.get('e'), 1)
  duet.set('f', 4)
  duet.set('g', 3)
  duet.mod('f', 'g')
  assert.equal(duet.get('f'), 1)
})

const test_instructions =
`set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`
QUnit.test('first_recovered(test_instructions) === 4', function(assert) {
  assert.equal(first_recovered(test_instructions), 4)
})

// Part 1 solution
QUnit.test('first_recovered(puzzle_input) === 8600', function(assert) {
  assert.equal(first_recovered(puzzle_input), 8600)
})

// Part 2 tests
const test_instructions2 =
`snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`
const test_instructions3 =
`snd 2
snd 1
jgz p 2
snd 2
rcv a
rcv b
rcv c`

QUnit.test('creation of empty Duet2 object', function(assert) {
  const duet = new Duet2(1)
  assert.ok(duet)
  assert.equal(duet.get('p'), 1)
  assert.deepEqual(duet.queue, [])
})
QUnit.test('get value from Duet2 empty register === 0' , function(assert) {
  const duet = new Duet2(0)
  assert.equal(duet.get('a'), 0)
  assert.equal(duet.get('b'), 0)
})
QUnit.test('get numerical value from Duet2 register returns the string converted to number', function(assert) {
  const duet = new Duet2(0)
  assert.equal(duet.get('3'), 3)
  assert.equal(duet.get('42'), 42)
})
QUnit.test('Duet2 simple .set and .get', function(assert) {
  const duet = new Duet2(0)
  assert.equal(duet.get('a'), 0)
  duet.set('a', 4)
  assert.equal(duet.get('a'), 4)
})
QUnit.test('Duet2.set-as-copy and get', function(assert) {
  const duet = new Duet2(0)
  assert.equal(duet.get('a'), 0)
  assert.equal(duet.get('b'), 0)
  duet.set('a', 4)
  assert.equal(duet.get('a'), 4)
  assert.equal(duet.get('b'), 0)
  duet.set('b', 'a')
  assert.equal(duet.get('a'), 4)
  assert.equal(duet.get('b'), 4)
  duet.set('a', 2)
  assert.equal(duet.get('a'), 2)
  assert.equal(duet.get('b'), 4)
})
QUnit.test('Duet2.add', function(assert) {
  const duet = new Duet2(0)
  assert.equal(duet.get('c'), 0)
  duet.add('c', 3)
  assert.equal(duet.get('c'), 3)
  duet.add('c', -2)
  assert.equal(duet.get('c'), 1)
  duet.add('d', 1)
  duet.add('c', 'd')
  assert.equal(duet.get('c'), 2)
})
QUnit.test('Duet2.mul', function(assert) {
  const duet = new Duet2(0)
  assert.equal(duet.get('d'), 0)
  duet.set('d', 1)
  assert.equal(duet.get('d'), 1)
  duet.mul('d', 4)
  assert.equal(duet.get('d'), 4)
  duet.mul('d', 3)
  assert.equal(duet.get('d'), 12)
  duet.set('e', 2)
  duet.mul('d', 'e')
  assert.equal(duet.get('d'), 24)
})
QUnit.test('Duet2.mod', function(assert) {
  const duet = new Duet2(0)
  assert.equal(duet.get('e'), 0)
  duet.set('e', 5)
  assert.equal(duet.get('e'), 5)
  duet.mod('e', 2)
  assert.equal(duet.get('e'), 1)
  duet.set('f', 4)
  duet.set('g', 3)
  duet.mod('f', 'g')
  assert.equal(duet.get('f'), 1)
})
QUnit.test("Duet2.snd posts to partner's queue", function(assert) {
  const a = new Duet2(0)
  const b = new Duet2(1)
  a.partner = b
  assert.deepEqual(b.queue, [])
  a.snd(3)
  assert.deepEqual(b.queue, [3])
  a.set('b', 4)
  a.snd('b')
  assert.deepEqual(b.queue, [3, 4])
  assert.equal(a.sent, 2)
})
QUnit.test('Duet2.rcv pulls from queue', function(assert) {
  const duet = new Duet2(0)
  duet.queue.push(1)
  duet.queue.push(2)
  duet.queue.push(3)
  assert.ok(duet.rcv('a'))
  assert.notOk(duet.waiting)
  assert.deepEqual(duet.queue, [2, 3])
  assert.equal(duet.get('a'), 1)
  assert.ok(duet.rcv('b'))
  assert.equal(duet.get('b'), 2)
  assert.deepEqual(duet.queue, [3])
  assert.ok(duet.rcv('c'))
  assert.equal(duet.get('c'), 3)
  assert.deepEqual(duet.queue, [])
  assert.notOk(duet.rcv('d'))
  assert.equal(duet.get('d'), 0)
  assert.notOk(duet.rcv('d'))
  assert.equal(duet.get('d'), 0)
})
QUnit.test('Duet2.command', function(assert) {
  const duet = new Duet2(0)
  duet.partner = duet
  duet.command(['set', 'a', 1])
  assert.equal(duet.get('a'), 1)
  duet.command(['add', 'a', 2])
  assert.equal(duet.get('a'), 3)
  duet.command(['mul', 'a', 'a'])
  assert.equal(duet.get('a'), 9)
  duet.command(['mod', 'a', 5])
  assert.equal(duet.get('a'), 4)
  duet.command(['snd', 'a'])
  assert.deepEqual(duet.queue, [4])
  duet.command(['set', 'a', 1])
  assert.equal(duet.get('a'), 1)
  duet.command(['rcv', 'a'])
  assert.equal(duet.get('a'), 4)
  assert.equal(duet.queue.length, 0)
})
QUnit.test('times_sent(test_instructions2) === 3', function(assert) {
  assert.equal(times_sent(test_instructions2), 3)
})
QUnit.test('times_sent(test_instructions3) === 2', function(assert) {
  assert.equal(times_sent(test_instructions3), 2)
})

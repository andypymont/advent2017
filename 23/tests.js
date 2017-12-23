QUnit.test('creation of empty Coprocessor object', function(assert) {
  const copro = new Coprocessor()
  assert.ok(copro)
  assert.deepEqual(copro.registers, {})
})
QUnit.test('get value from an empty register === 0' , function(assert) {
  const copro = new Coprocessor()
  assert.equal(copro.get('a'), 0)
  assert.equal(copro.get('b'), 0)
})
QUnit.test('get numerical value from register returns the string converted to number', function(assert) {
  const copro = new Coprocessor()
  assert.equal(copro.get('3'), 3)
  assert.equal(copro.get('42'), 42)
})
QUnit.test('simple Coprocessor.set and Coprocessor.get', function(assert) {
  const copro = new Coprocessor()
  assert.equal(copro.get('a'), 0)
  copro.set('a', 4)
  assert.equal(copro.get('a'), 4)
})
QUnit.test('Coprocessor.set-as-copy', function(assert) {
  const copro = new Coprocessor()
  assert.equal(copro.get('a'), 0)
  assert.equal(copro.get('b'), 0)
  copro.set('a', 4)
  assert.equal(copro.get('a'), 4)
  assert.equal(copro.get('b'), 0)
  copro.set('b', 'a')
  assert.equal(copro.get('a'), 4)
  assert.equal(copro.get('b'), 4)
  copro.set('a', 2)
  assert.equal(copro.get('a'), 2)
  assert.equal(copro.get('b'), 4)
})
QUnit.test('Coprocessor.sub', function(assert) {
  const copro = new Coprocessor()
  copro.sub('a', 4)
  assert.equal(copro.get('a'), -4)
  copro.set('b', 2)
  copro.sub('a', 'b')
  assert.equal(copro.get('a'), -6)
  copro.sub('b', 1)
  assert.equal(copro.get('b'), 1)
})
QUnit.test('Coprocessor.mul', function(assert) {
  const copro = new Coprocessor()
  assert.equal(copro.get('d'), 0)
  copro.set('d', 1)
  assert.equal(copro.get('d'), 1)
  copro.mul('d', 4)
  assert.equal(copro.get('d'), 4)
  copro.mul('d', 3)
  assert.equal(copro.get('d'), 12)
  copro.set('e', 2)
  copro.mul('d', 'e')
  assert.equal(copro.get('d'), 24)
})
QUnit.test('count_mul()', function(assert) {
  const instructions =
  `set a 2
set b 3
sub a 1
mul a -1
jnz 1 a
mul b 2`
  assert.equal(count_mul(instructions), 3)
})

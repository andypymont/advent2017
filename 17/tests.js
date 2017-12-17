function test_spinlock(shift, times, expected) {
  QUnit.test('spinlock(' + shift + ', ' + times + ') === ' + expected,
             assert => assert.equal(spinlock(shift, times), expected))
}
test_spinlock(3, 1, 0)
test_spinlock(3, 2, 1)
test_spinlock(3, 3, 1)
test_spinlock(3, 4, 3)
test_spinlock(3, 5, 2)
test_spinlock(3, 6, 1)
test_spinlock(3, 7, 2)
test_spinlock(3, 8, 6)
test_spinlock(3, 9, 5)
test_spinlock(3, 2017, 638)

function test_value_at_one(shift, times, expected) {
  QUnit.test('value_at_one(' + shift + ', ' + times + ') === ' + expected,
             assert => assert.equal(value_at_one(shift, times), expected))
}
test_value_at_one(3, 1, 1)
test_value_at_one(3, 2, 2)
test_value_at_one(3, 3, 2)
test_value_at_one(3, 4, 2)
test_value_at_one(3, 5, 5)
test_value_at_one(3, 6, 5)
test_value_at_one(3, 7, 5)
test_value_at_one(3, 8, 5)
test_value_at_one(3, 9, 9)
test_value_at_one(3, 10, 9)

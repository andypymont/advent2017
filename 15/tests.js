// Part 1 tests
function test_advent_generator(start, multiply, expected) {
  QUnit.test('first ' + expected.length + ' values for advent_generator(' + start + ', ' + multiply + ') generated correctly',
             function(assert) {
               const gen = advent_generator(start, multiply)
               expected.forEach(item => assert.equal(gen.next().value, item))
             })
}
test_advent_generator(65, 16807, [1092455, 1181022009, 245556042, 1744312007, 1352636452])
test_advent_generator(8921, 48271, [430625591, 1233683848, 1431495498, 137874439, 285222916])

function test_binary_bottom16(input, expected) {
  QUnit.test('binary_bottom16(' + input + ') === ' + expected,
             assert => assert.equal(binary_bottom16(input), expected))
}
test_binary_bottom16(1092455, '1010101101100111')
test_binary_bottom16(430625591, '1101001100110111')
test_binary_bottom16(1181022009, '1111011100111001')
test_binary_bottom16(1233683848, '1000010110001000')
test_binary_bottom16(245556042, '1110001101001010')
test_binary_bottom16(1431495498, '1110001101001010')
test_binary_bottom16(1744312007, '0001011011000111')
test_binary_bottom16(137874439, '1100110000000111')
test_binary_bottom16(1352636452, '1001100000100100')
test_binary_bottom16(285222916, '0010100000000100')

t1 = {
  'A': 65,
  'B': 8921
}
QUnit.test('judge(t1, 5) === 1',
           assert => assert.equal(judge(t1, 5), 1))

// Part 1 solution
// QUnit.test('judge(puzzle_input, 40000000) === 609',
//            assert => assert.equal(judge(puzzle_input, 40000000), 609))

// Part 2 tests:
function test_advent_generator2(start, multiply, checkfactor, expected) {
  QUnit.test('first ' + expected.length + ' values for advent_generator2(' + start + ', ' + multiply + ', ' + checkfactor + ') generated correctly',
             function(assert) {
               const gen = advent_generator2(start, multiply, checkfactor)
               expected.forEach(item => assert.equal(gen.next().value, item))
             })
}
test_advent_generator2(65, 16807, 4, [1352636452, 1992081072, 530830436, 1980017072, 740335192])
test_advent_generator2(8921, 48271, 8, [1233683848, 862516352, 1159784568, 1616057672, 412269392])

QUnit.test('advent_generator2(65, 16807, 4) and advent_generator2(8921, 48271, 8) first match binary_bottom16() of outputs on value 1056',
           function(assert) {
             const gen_a = advent_generator2(65, 16807, 4)
             const gen_b = advent_generator2(8921, 48271, 8)
             let check = 1
             while ( true ) {
               if ( binary_bottom16(gen_a.next().value) === binary_bottom16(gen_b.next().value) ) {
                 break
               }
               check++
             }
             assert.equal(check, 1056)
})
QUnit.test('judge2(t1, 1056) === 1',
           assert => assert.equal(judge2(t1, 1056), 1))

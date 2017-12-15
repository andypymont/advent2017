function *advent_generator(start, multiply) {
  const divide = 2147483647
  let value = start
  while ( true ) {
    value = (value * multiply) % divide
    yield value
  }
}

function binary_bottom16(number) {
  let binary = number.toString(2)
  while (binary.length < 16) {
    binary = "0" + binary
  }
  return binary.substring(binary.length - 16, binary.length)
}

function judge(start, times) {
  const gen_a = advent_generator(start.A, 16807)
  const gen_b = advent_generator(start.B, 48271)
  let matches = 0

  for ( let i = 0; i < times; i++ ) {
    if ( binary_bottom16(gen_a.next().value) == binary_bottom16(gen_b.next().value) ) {
      matches++
    }
  }
  return matches
}

function *advent_generator2(start, multiply, checkfactor) {
  const divide = 2147483647
  let value = start
  while ( true ) {
    value = (value * multiply) % divide
    if ( value % checkfactor === 0 ) {
      yield value
    }
  }
}

function judge2(start, times) {
  const gen_a = advent_generator2(start.A, 16807, 4)
  const gen_b = advent_generator2(start.B, 48271, 8)
  let matches = 0

  for ( let i = 0; i < times; i++ ) {
    if ( binary_bottom16(gen_a.next().value) === binary_bottom16(gen_b.next().value) ) {
      matches++
    }
  }
  return matches
}

function spinlock(shift, times) {
  let list = [0]
  let current = 0
  for ( let i = 1; i <= times; i++ ) {
    current = (current + shift) % list.length
    list.splice(current + 1, 0, i)
    current++
  }
  return list[(current + 1) % list.length]
}

function value_at_one(shift, times) {
  let length = 1
  let current = 0
  let at_one = 0
  for ( let i = 1; i <= times; i++ ) {
    current = (current + shift) % length
    length++
    current++
    if ( current === 1 ) {
      at_one = i
    }
  }
  return at_one
}

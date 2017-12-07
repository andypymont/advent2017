puzzle_input = '10	3	15	10	5	15	5	15	9	2	5	8	5	2	3	6'.split('\t').map((x) => parseInt(x, 10))

function redistribute_from(distribution) {
  return distribution.indexOf(distribution.reduce((a, b) => Math.max(a, b), 0))
}

function redistribute(distribution, from) {
  let i = redistribute_from(distribution)
  let qty = distribution[i]
  distribution[i] = 0
  i++
  while ( qty > 0 ) {
    if ( i === distribution.length ) {
      i = 0
    }
    distribution[i]++
    qty--
    i++
  }
  return distribution
}

function redistributions_until_repeat(distribution) {
  let previous = []
  let redistributions = 0
  while ( previous.indexOf(distribution.toString()) === -1 ) {
    previous.push(distribution.toString())
    distribution = redistribute(distribution)
    redistributions++
  }
  return redistributions
}

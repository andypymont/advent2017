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

function calc_redistributions_until_repeat(distribution) {
  let previous = []
  let redistributions = 0
  while ( previous.indexOf(distribution.toString()) === -1 ) {
    previous.push(distribution.toString())
    distribution = redistribute(distribution)
    redistributions++
  }
  return { 'first': previous.indexOf(distribution.toString()),
           'second': redistributions }
}

function redistributions_until_repeat(distribution) {
  return calc_redistributions_until_repeat(distribution)['second']
}

function redistributions_until_second_repeat(distribution) {
  let rv = calc_redistributions_until_repeat(distribution)
  return rv['second'] - rv['first']
}

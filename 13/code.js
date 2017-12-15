function parse_scanners(text) {
  let scanners = {}
  text.split('\n').forEach(function(line) {
    let parts = line.split(': ').map(x => parseInt(x, 10))
    scanners[parts[0]] = parts[1]
  })
  return scanners
}

function scanner_at_depth(scanners, depth, delay) {
  let picosecond = depth + delay
  if (!(depth in scanners)) {
    return false
  } else {
    let range = scanners[depth]
    if (range === 0) {
      return 0
    } else if (range === 1) {
      return (picosecond % 2 === 0)
    } else {
      return (picosecond % ((range - 1) * 2) === 0)
    }
  }
}

function journey(scanners, delay) {
  delay = delay || 0
  return Object.keys(scanners)
               .map(x => parseInt(x))
               .filter(x => scanner_at_depth(scanners, x, delay))
               .map(x => scanners[x] * x)
}

function severity(caught) {
  return caught.reduce((a, b) => a + b, 0)
}

function delay_needed(scanners) {
  let delay = 0
  while ( journey(scanners, delay).length > 0 ) {
    delay++
  }
  return delay
}

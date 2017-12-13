function parse_scanners(text) {
  let scanners = {}
  text.split('\n').forEach(function(line) {
    let parts = line.split(': ').map(x => parseInt(x, 10))
    scanners[parts[0]] = parts[1]
  })
  return scanners
}

function scanner_position(range, picosecond) {
  if (range === 0) {
    return 0
  } else if (range === 1) {
    return picosecond % 2
  } else {
    let within = picosecond % ((range - 1) * 2)

    if (within >= range) {
      return (range * 2) - 2 - within
    } else {
      return within
    }
  }
}

function scanner_at_depth(scanners, picosecond) {
  if (!(picosecond in scanners)) {
    return false
  } else {
    return scanner_position(scanners[picosecond], picosecond) === picosecond
  }
}

function journey(scanners) {
  rv = 0
  Object.keys(scanners).forEach(function(depth) {
    if (scanner_at_depth(scanners, depth)) {
      rv += depth + scanners[depth]
    }
  })
  return rv
}

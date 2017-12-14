const array256 = Array.from(Array(256).keys())

function subarray(array, start, length) {
  return array.slice(start, start+length)
              .concat(array.slice(0, Math.max(start+length-array.length, 0)))
}

function reverse_section(list, position, length) {
  let section = subarray(list, position, length)
  let reversed_section = section.map((item, index, arr) => arr[arr.length-index-1])
  return list.map(function(item) {
    let i = section.indexOf(item)
    return (i === -1) ? item : reversed_section[i]
  })
}

function apply_transformations(string) {
  let position = 0
  let skip = 0
  let list = array256
  transformations = Array.from(string).map(x => x.charCodeAt()).concat([17, 31, 73, 47, 23])
  for ( let round = 0; round < 64; round++ ) {
    transformations.forEach(function(length) {
      list = reverse_section(list, position, length)
      position = (position + length + skip) % list.length
      skip++
    })
  }
  return list
}

function dense_hash(sparse) {
  rv = []
  for ( let group = 0; group < sparse.length; group += 16 ) {
    rv.push(sparse.slice(group, group + 16).reduce((a, b) => a ^ b, 0))
  }
  return rv
}

function hex_string(dense) {
  function hex(n) {
    let rv = n.toString(16)
    return rv.length === 1 ? "0" + rv : rv
  }
  return dense.map(hex).join('')
}

function knot_hash(string) {
  return hex_string(dense_hash(apply_transformations(string)))
}

function binary_string(hex_string) {
  function bin(hex) {
    let rv = parseInt(hex, 16).toString(2)
    while (rv.length < 4) {
      rv = '0' + rv
    }
    return rv
  }
  return Array.from(hex_string).map(bin)
                               .join('')
}

function generate_grid(secret_key) {
  return Array.from(Array(128).keys())
              .map(row => secret_key + '-' + row.toString())
              .map(knot_hash)
              .map(binary_string)
}

function is_active_cell(grid, x, y) {
  if ( y < 0 || y >= grid.length ) {
    return false
  } else if ( x < 0 || x >= grid[y].length ) {
    return false
  } else {
    return grid[y][x] === '1'
  }
}

function region(grid, x, y, collected) {
  collected = collected || new Set()
  const coords = (x,y) => [x, y].join(',')
  if (is_active_cell(grid, x, y) && !collected.has(coords(x, y))) {
    collected.add(coords(x, y))
    let neighbours = [
      coords(x + 1, y),
      coords(x - 1, y),
      coords(x, y + 1),
      coords(x, y - 1)
    ]
    neighbours.filter(coords => !collected.has(coords))
              .map(coords => coords.split(',').map(Number))
              .filter(coords => is_active_cell(grid, coords[0], coords[1]))
              .forEach(function(coords) {
                region(grid, coords[0], coords[1], collected)
              })
  }
  return collected
}

function count_regions(grid) {
  let seen = new Set()
  let regions = 0
  const coords = (x,y) => [x, y].join(',')

  for ( let y = 0; y < grid.length; y++ ) {
    for ( let x = 0; x < grid[y].length; x++ ) {
      if ( grid[y][x] === '1' && !seen.has(coords(x, y))) {
        r = region(grid, x, y)
        r.forEach(x => seen.add(x))
        regions++
      }
    }
  }

  return regions
}

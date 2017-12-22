function range(x) {
  return Array.from(Array(x).keys())
}

function add_vectors(v1, v2) {
  const c1 = v1.split(',').map(Number)
  const c2 = v2.split(',').map(Number)
  return (c1[0] + c2[0]) + ',' + (c1[1] + c2[1])
}

function turn_left(direction) {
  return {
    '0,-1': '-1,0',
    '-1,0': '0,1',
    '0,1': '1,0',
    '1,0': '0,-1'
  }[direction]
}

function turn_right(direction) {
  return {
    '0,-1': '1,0',
    '1,0': '0,1',
    '0,1': '-1,0',
    '-1,0': '0,-1'
  }[direction]
}

function read_grid(grid) {
  let rv = {}

  grid = grid.split('\n')
  const height = grid.length
  const width = grid[0].length

  for ( let row = 0; row < height; row++ ) {
    let y = 1 + row - ((height + 1) / 2)
    for ( let col = 0; col < width; col++ ) {
      let x = 1 + col - ((width + 1) / 2)
      rv[x + "," + y] = grid[row][col] === "#" ? 1 : 0
    }
  }
  return rv
}

function write_grid(grid) {
  const coords = Object.keys(grid).map(x => x.split(','))
  const height = 1 + coords.map(c => c[1]).reduce((a, b) => Math.max(a, b), 0) - coords.map(c => c[1]).reduce((a, b) => Math.min(a, b), Infinity)
  const width = 1 + coords.map(c => c[0]).reduce((a, b) => Math.max(a, b), 0) - coords.map(c => c[0]).reduce((a, b) => Math.min(a, b), Infinity)

  return range(height).map(r => range(width).map(c => {
    let y = 1 + r - ((height + 1) / 2)
    let x = 1 + c - ((width + 1) / 2)
    return grid[x + "," + y]
  }).map(x => x === 1 ? '#' : '.').join('')).join('\n')
}

function sporifica(start, activities) {
  let grid = read_grid(start)
  let direction = '0,-1'
  let position = '0,0'

  range(activities).forEach(function(a) {
    grid[position] = grid[position] || 0
    if (grid[position] === 0) {
      direction = turn_left(direction)
      grid[position] = 1
      position = add_vectors(position, direction)
    } else {
      direction = turn_left(direction)
      grid[position] = 0
      position = add_vectors(position, direction)
    }
  })

  return write_grid(grid)
  // return { grid, position, direction }
}

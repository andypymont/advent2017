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
  const max_x = coords.map(c => c[0]).reduce((a, b) => Math.max(a, b), -Infinity)
  const max_y = coords.map(c => c[1]).reduce((a, b) => Math.max(a, b), -Infinity)
  const min_x = coords.map(c => c[0]).reduce((a, b) => Math.min(a, b), Infinity)
  const min_y = coords.map(c => c[1]).reduce((a, b) => Math.min(a, b), Infinity)

  let rv = range(1 + max_y - min_y).map(r => range(1 + max_x - min_x).map(x => '.'))
  for ( let y = min_y, y_ix = 0; y <= max_y; y++, y_ix++ ) {
    for ( let x = min_x, x_ix = 0; x <= max_x; x++, x_ix++ ) {
      if ( (grid[x + ',' + y] || 0) === 1 ) {
        rv[y_ix][x_ix] = '#'
      }
    }
  }
  return rv.map(row => row.join('')).join('\n')
}

function sporifica(start, activities) {
  let grid = read_grid(start)
  let direction = '0,-1'
  let position = '0,0'
  let infected = 0

  range(activities).forEach(function(a) {
    grid[position] = grid[position] || 0
    if (grid[position] === 0) {
      direction = turn_left(direction)
      grid[position] = 1
      infected++
      position = add_vectors(position, direction)
    } else {
      direction = turn_right(direction)
      grid[position] = 0
      position = add_vectors(position, direction)
    }
  })

  return { grid: write_grid(grid), infected: infected }
}

function reverse(direction) {
  return {
    '0,1': '0,-1',
    '0,-1': '0,1',
    '1,0': '-1,0',
    '-1,0': '1,0'
  }[direction]
}

function read_grid2(grid) {
  let rv = {}

  grid = grid.split('\n')
  const height = grid.length
  const width = grid[0].length

  for ( let row = 0; row < height; row++ ) {
    let y = 1 + row - ((height + 1) / 2)
    for ( let col = 0; col < width; col++ ) {
      let x = 1 + col - ((width + 1) / 2)
      rv[x + "," + y] = grid[row][col]
    }
  }
  return rv
}

function write_grid2(grid) {
  const coords = Object.keys(grid).map(x => x.split(','))
  const max_x = coords.map(c => c[0]).reduce((a, b) => Math.max(a, b), -Infinity)
  const max_y = coords.map(c => c[1]).reduce((a, b) => Math.max(a, b), -Infinity)
  const min_x = coords.map(c => c[0]).reduce((a, b) => Math.min(a, b), Infinity)
  const min_y = coords.map(c => c[1]).reduce((a, b) => Math.min(a, b), Infinity)

  let rv = range(1 + max_y - min_y).map(r => range(1 + max_x - min_x).map(x => '.'))
  for ( let y = min_y, y_ix = 0; y <= max_y; y++, y_ix++ ) {
    for ( let x = min_x, x_ix = 0; x <= max_x; x++, x_ix++ ) {
      rv[y_ix][x_ix] = (grid[x + ',' + y] || '.')
    }
  }
  return rv.map(row => row.join('')).join('\n')
}

function sporifica2(start, activities) {
  let grid = read_grid2(start)
  let direction = '0,-1'
  let position = '0,0'
  let infected = 0

  range(activities).forEach(function(a) {
    grid[position] = grid[position] || '.'
    if ( grid[position] === '.' ) {
      direction = turn_left(direction)
      grid[position] = 'w'
    } else if ( grid[position] === 'w' ) {
      grid[position] = '#'
      infected++
    } else if ( grid[position] === '#' ) {
      grid[position] = 'f'
      direction = turn_right(direction)
    } else if ( grid[position] === 'f' ) {
      grid[position] = '.'
      direction = reverse(direction)
    }
    position = add_vectors(position, direction)
  })

  return { grid: write_grid2(grid), infected: infected }
}

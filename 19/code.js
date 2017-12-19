const direction_changes = {
  'up': [-1, 0],
  'down': [1, 0],
  'left': [0, -1],
  'right': [0, 1]
}

function exits(grid, row, col) {
  const directions = ['up', 'down', 'left', 'right']
  return directions.filter(function(direction) {
    const new_row = row + direction_changes[direction][0]
    const new_col = col + direction_changes[direction][1]
    if ( new_row < 0 || new_row >= grid.length ) {
      return false
    } else if ( new_col < 0 || new_col >= grid[new_row].length ) {
      return false
    } else if ( new_row !== row && grid[new_row][new_col] === '-' ) {
      return false
    } else if ( new_col !== col && grid[new_row][new_col] === '|' ) {
      return false
    } else {
      return (grid[new_row][new_col] !== ' ')
    }
  })
}

function exit(grid, row, col, entered) {
  if (grid[row][col] !== '+') {
    return entered
  } else {
    const reversed = {'up': 'down', 'down': 'up', 'left': 'right', 'right': 'left'}
    return exits(grid, row, col).filter(direction => direction !== reversed[entered])
                                .reduce((a, b) => b, 'none')
  }
}

function collect_letters(grid) {
  grid = grid.split('\n')
  const nonletterchars = [' ', '+', '-', '|']
  let letters = ''
  let steps = 0
  let direction = 'down'
  let row = 0
  let col = 0

  // find start position
  for ( let c = 0; c < grid[0].length; c++  ) {
    if ( grid[0][c] === '|' ) {
      col = c
      break
    }
  }

  // traverse grid collecting letters
  while (true) {
    if (  nonletterchars.indexOf(grid[row][col]) === -1 ) {
      letters += grid[row][col]
    }
    direction = exit(grid, row, col, direction)
    row += direction_changes[direction][0]
    col += direction_changes[direction][1]
    steps++
    if (!((row < grid.length) && (row >= 0) && (col >= 0) && (col < grid[row].length) && (direction !== 'none') && (grid[row][col] !== ' '))) {
      break
    }
  }

  return { letters, steps }
}

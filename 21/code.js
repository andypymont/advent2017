function flip_horizontal(pattern) {
  return pattern.split('/').map(row => row.split('').reverse().join('')).join('/')
}
function flip_vertical(pattern) {
  return pattern.split('/').reverse().join('/')
}
function rotate(pattern, times) {
  pattern = pattern.split('/').map(row => row.split(''))
  for ( let i = 0; i < times; i++ ) {
    pattern = pattern.map((rowval, r) => rowval.map((colval, c, row) => pattern[row.length - 1 - c][r]))
  }
  return pattern.map(row => row.join('')).join('/')
}

const match = (function() {
  let memo = {}

  return function(pattern, value) {
    memo[pattern] = memo[pattern] || {}

    if ( !(pattern in memo && value in memo[pattern]) ) {
      memo[pattern][value] = [
        value,
        flip_horizontal(value),
        flip_vertical(value),
        rotate(value, 1),
        flip_horizontal(rotate(value, 1)),
        flip_vertical(rotate(value, 1)),
        rotate(value, 2),
        flip_horizontal(rotate(value, 2)),
        flip_vertical(rotate(value, 2)),
        rotate(value, 3),
        flip_horizontal(rotate(value, 3)),
        flip_vertical(rotate(value, 3))
      ].map(test => test === pattern)
       .reduce((a, b) => a || b, false)
    }

    return memo[pattern][value]
  }
})()

function Rulebook(rules_text) {
  this.rules = rules_text.split('\n').map(rule => rule.split(' => '))
}
Rulebook.prototype.translate = function(input) {
  return this.rules.filter(rule => match(rule[0], input))
                   .map(rule => rule[1])
                   .reduce((a, b) => b, '')
}

function range(n) {
  return Array.from(Array(n).keys())
}

function breakup_grid(grid) {
  grid = grid.split('/').map(row => row.split(''))
  const chunk = ((grid.length % 2 === 0) && (grid[0].length % 2 === 0)) ? 2 : 3
  const vertical_chunks = grid.length / chunk
  const horizontal_chunks = grid[0].length / chunk

  return range(vertical_chunks).map(vert => range(horizontal_chunks).map(function(horiz) {
    return range(chunk).map((rv, r) => range(chunk).map((cv, c) => grid[(vert * chunk) + r][(horiz * chunk) + c]).join('')).join('/')
  }))
}

function construct_grid(chunks) {
  chunks = chunks.map(row => row.map(chunk => chunk.split('/')))
  const chunk = chunks[0][0].length
  const vertical_chunks = chunks.length
  const horizontal_chunks = chunks[0].length

  grid = range(vertical_chunks * chunk).map(r => range(horizontal_chunks * chunk).map(function(c) {
    const vc = Math.floor(r / chunk)
    const hc = Math.floor(c / chunk)
    return chunks[vc][hc][r % chunk][c % chunk]
  }))
  return grid.map(row => row.join('')).join('/')
}

function run_rules(rules_text, times) {
  const rulebook = new Rulebook(rules_text)
  let grid = '.#./..#/###'

  for ( let i = 0; i < times; i++ ) {
    grid = construct_grid(breakup_grid(grid).map(row => row.map(chunk => rulebook.translate(chunk))))
  }
  return grid
}

function on_count(grid) {
  return grid.split('')
             .filter(x => x === '#')
             .length
}

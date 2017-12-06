const DIRECTION_UP  = "0,1"
const DIRECTION_LEFT = "-1,0"
const DIRECTION_RIGHT = "1,0"
const DIRECTION_DOWN = "0,-1"

function turn_left(direction) {
  if (direction === DIRECTION_UP) {
    return DIRECTION_LEFT
  } else if (direction === DIRECTION_LEFT) {
    return DIRECTION_DOWN
  } else if (direction === DIRECTION_DOWN) {
    return DIRECTION_RIGHT
  } else if (direction === DIRECTION_RIGHT) {
    return DIRECTION_UP
  }
}

function add_vectors(v1, v2) {
  let a1 = v1.split(',').map((x) => parseInt(x, 10))
  let a2 = v2.split(',').map((x) => parseInt(x, 10))
  return (a1[0] + a2[0]) + "," + (a1[1] + a2[1])
}

function dimension_from_position(position, direction) {
  let coords = position.split(',').map((x) => parseInt(x, 10))
  let f = (x,y) => 0
  if (direction === DIRECTION_LEFT || direction === DIRECTION_DOWN) {
    f = Math.min
  } else {
    f = Math.max
  }
  if (direction === DIRECTION_LEFT || direction === DIRECTION_RIGHT) {
    d = coords[0]
  } else {
    d = coords[1]
  }
  return Math.abs(f(0, d))
}

const SURROUNDING = [add_vectors(DIRECTION_UP, DIRECTION_LEFT), DIRECTION_UP,
                     add_vectors(DIRECTION_UP, DIRECTION_RIGHT), DIRECTION_RIGHT,
                     add_vectors(DIRECTION_DOWN, DIRECTION_RIGHT), DIRECTION_DOWN,
                     add_vectors(DIRECTION_DOWN, DIRECTION_LEFT), DIRECTION_LEFT]

function surrounding_cells(cell) {
  return SURROUNDING.map((x) => add_vectors(cell, x))
}

function Traveller() {
  this.set_defaults()
}
Traveller.prototype.set_defaults = function() {
  this.number = 1
  this.position = "0,0"
  this.direction = DIRECTION_RIGHT
  this.maxima = {}
  this.maxima[DIRECTION_UP] = 0
  this.maxima[DIRECTION_LEFT] = 0
  this.maxima[DIRECTION_DOWN] = 0
  this.maxima[DIRECTION_RIGHT] = 0
}
Traveller.prototype.update = function() {
  this.position = add_vectors(this.position, this.direction)
  this.number++
}
Traveller.prototype.advance = function() {
  let dfp = dimension_from_position(this.position, this.direction)
  if (dfp > this.maxima[this.direction]) {
    this.maxima[this.direction] = dfp
    this.direction = turn_left(this.direction)
  }
  this.update()
}

function StressTestTraveller() {
    this.set_defaults()
    this.grid = {}
}
StressTestTraveller.prototype = Object.create(Traveller.prototype)
StressTestTraveller.prototype.update = function() {
  this.grid[this.position] = this.number
  this.position = add_vectors(this.position, this.direction)
  this.number = surrounding_cells(this.position).map((cell) => this.grid[cell])
                                                .filter((x) => x !== undefined)
                                                .reduce((a,b) => a+b, 0)
}

function home_distance(coords) {
  return coords.split(',')
               .map((x) => Math.abs(parseInt(x, 10)))
               .reduce((a,b) => a+b, 0)
}

function taxicab_memory(target) {
  let traveller = new Traveller()
  while ( traveller.number < target ) {
    traveller.advance()
  }
  return home_distance(traveller.position)
}

function taxicab_memory_stress(target) {
  let traveller = new StressTestTraveller()
  while ( traveller.number <= target ) {
    traveller.advance()
  }
  return traveller.number
}

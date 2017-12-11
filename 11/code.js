function vector_to_coords(vector) {
  return vector.split(',').map(x => parseInt(x, 10))
}

function add_vectors(v1, v2) {
  const coords1 = vector_to_coords(v1)
  const coords2 = vector_to_coords(v2)
  return (coords1[0] + coords2[0]) + ',' + (coords1[1] + coords2[1])
}

const directions = {
  'n': '0,1',
  'ne': '1,0',
  'se': '1,-1',
  's': '0,-1',
  'sw': '-1,0',
  'nw': '-1,1'
}

function move_direction(position, direction) {
  return add_vectors(position, directions[direction])
}

function distance(v1, v2) {
  const coords1 = vector_to_coords(v1)
  const coords2 = vector_to_coords(v2)

  const distances_3d = [coords2[0] - coords1[0],
                        coords2[1] - coords2[1],
                        (0 - coords2[0] - coords2[1]) - (0 - coords1[0] - coords1[1])]
                       .map(Math.abs)
  return distances_3d.reduce((a, b) => Math.max(a, b), 0)
}

function locations_visited(journey) {
  let location = '0,0'
  let rv = ['0,0']
  journey.split(',').forEach(move => {
      location = move_direction(location, move)
      rv.push(location)
  })
  return rv
}

function distance_after_moves(journey) {
  const visited = locations_visited(journey)
  return distance('0,0', visited[visited.length - 1])
}

function furthest_travelled(journey) {
  return locations_visited(journey).map(coords => distance('0,0', coords))
                                   .reduce((a, b) => Math.max(a, b), 0)
}

function parse_programs(text) {
  rv = {}
  text.split('\n').forEach(function(line) {
    let parts = line.split(' <-> ')
    rv[parts[0]] = parts[1].split(',').map(x => parseInt(x, 10))
  })
  return rv
}

function group_programs(programs, id, list) {
  if (typeof id === 'undefined') {
    id = 0
  }
  if (typeof list === 'undefined') {
    list = []
  }

  if (list.indexOf(id) === -1) {
    list.push(id)
  }
  programs[id].filter(item => list.indexOf(item) === -1)
              .forEach(id => group_programs(programs, id, list))

  return list
}

function parse_programs(text) {
  rv = {}
  text.split('\n').forEach(function(line) {
    let parts = line.split(' <-> ')
    rv[parts[0]] = parts[1].split(',').map(x => parseInt(x, 10))
  })
  return rv
}

function group_programs_old(programs, id, list) {
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

function group_programs(programs, id, set) {
  id = typeof id === 'undefined' ? 0 : id
  if ( typeof set === 'undefined' ) {
    set = new Set()
  }

  if (!set.has(id)) {
    set.add(id)
  }
  programs[id].filter(item => !set.has(item))
              .forEach(id => group_programs(programs, id, set))

  return set
}

function group_count(programs) {
  const seen = new Set()
  let groups = 0

  while ( seen.size < Object.keys(programs).length ) {
    let id = 0
    while ( seen.has(id) ) {
      id++
    }
    groups++
    group_programs(programs, id).forEach(item => seen.add(item))
  }

  return groups
}

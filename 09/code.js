function Group(parent) {
  this.parent = parent
  this.contents = []
  if ( typeof parent !== 'undefined' ) {
    parent.contents.push(this)
  }
}

function remove_ignored(stream) {
  let ignorenext = false
  let rv = ''
  for ( let c = 0; c < stream.length; c++ ) {
    if (ignorenext) {
      ignorenext = false
    } else {
      if ( stream[c] === '!' ) {
        ignorenext = true
      } else {
        rv += stream[c]
      }
    }
  }
  return rv
}

function groups_to_lists(groups) {
  return groups.contents.map(groups_to_lists)
}

function value_groups(groups, group_value) {
  if ( typeof group_value === 'undefined' ) {
    group_value = 1
  }
  return group_value + groups.reduce((a, b) => a + value_groups(b, group_value + 1), 0)
}

function parse_stream(stream) {
  stream = remove_ignored(stream)
  let in_garbage = false
  let rv = new Group()
  let current_group = rv

  for ( let c = 0; c < stream.length; c++ ) {
    if (in_garbage) {
      if ( stream[c] === '>' ) {
        in_garbage = false
      }
    } else {
      if (stream[c] === '<') {
        in_garbage = true
      } else if (stream[c] === '{') {
        current_group = new Group(current_group)
      } else if (stream[c] === '}') {
        current_group = current_group.parent
      }
    }
  }

  return groups_to_lists(rv)[0]
}

function Group(parent) {
  this.parent = parent
  this.contents = []
  this.garbage = 0
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
  let rv = groups.contents.map(groups_to_lists)
  if (typeof groups.parent === 'undefined') {
    return rv[0]
  } else {
    return rv
  }
}

function garbage_count(groups) {
  return groups.garbage + groups.contents.reduce((a, b) => a + garbage_count(b), 0)
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
      } else {
        current_group.garbage++
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
  return rv
}

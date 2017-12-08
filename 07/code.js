function bottom_of_tower(nodes) {
  const all_children = [].concat.apply([], Object.keys(nodes).map((nodename) => nodes[nodename])
                                                             .map((node) => node['children']))
  return Object.keys(nodes).map((nodename) => nodes[nodename])
                           .map((node) => node['name'])
                           .filter((node) => all_children.indexOf(node) === -1)
                           [0]
}

function nodes_from_text(text) {
  function node(nodetext) {
    let nodedata = nodetext.split(' -> ')
    return {
      'name': nodedata[0].split(' ')[0],
      'weight': parseInt(nodedata[0].split(' ')[1].replace('(', '').replace(')', ''), 10),
      'children': nodedata[1] ? (nodedata[1].split(', ')) : []
    }
  }
  let rv = {}
  text.split('\n').map((nt) => node(nt))
      .forEach((node) => rv[node['name']] = node)
  return rv
}

function tower(text) {
  const nodes = nodes_from_text(text)
  const base_node = nodes[bottom_of_tower(nodes)]
  function nodify_children(node) {
    node['children'] = node['children'].map((nodename) => nodify_children(nodes[nodename]))
    return node
  }
  return nodify_children(base_node)
}

function total_weight(node) {
  return node['weight'] +
         node['children'].map((child) => total_weight(child))
                         .reduce((a, b) => a + b, 0)
}

function correct_weight(node, correction) {
  if (typeof correction === 'undefined') {
    correction = 0
  }
  const child_weights = node['children'].map(node => total_weight(node))
  function is_standard_weight(weight) {
    return node['children'].filter(child => (total_weight(child) === weight)).length > 1
  }
  if ( node['children'].length === child_weights.filter(is_standard_weight).length ) {
    return node['weight'] + correction
  } else {
    const standard_weight = child_weights.filter(is_standard_weight)
                                         .reduce((a, b) => Math.max(a, b), 0)
    const non_standard_weight = child_weights.filter((x) => !(x === standard_weight))
                                             .reduce((a, b) => Math.max(a, b), 0)
    const node_to_correct = node['children'][child_weights.indexOf(non_standard_weight)]
    return correct_weight(node_to_correct, standard_weight - non_standard_weight)
  }
}

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

function make_weight_correction(tower) {
  
}

function correct_weight(tower) {
  const child_weights = tower['children'].map((node) => total_weight(node))
  function standard_weight(weight) {
    return tower['children'].filter(child => (child.weight === weight)).length > 1
  }
  const standard_weight = child_weights.filter(standard_weight)
                                       .reduce((a, b) => Math.max, 0)
  const non_standard_weight = child_weights.filter((x) => !(x === standard_weight))
                                           .reduce((a, b) => Math.max, 0)
  const correction_needed = standard_weight - non_standard_weight
  return make_weight_correction(tower, correction_needed)
}

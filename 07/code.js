function bottom_of_tower(text) {
  const nodes = node_list_from_text(text)
  const all_children = [].concat.apply([], nodes.map((node) => node['children']))
  return nodes.map((node) => node['name'])
              .filter((node) => all_children.indexOf(node) === -1)
              [0]
}

function node_list_from_text(text) {
  function node(nodetext) {
    let nodedata = nodetext.split(' -> ')
    return {
      'name': nodedata[0].split(' ')[0],
      'weight': parseInt(nodedata[0].split(' ')[1].replace('(', '').replace(')', ''), 10),
      'children': nodedata[1] ? (nodedata[1].split(', ')) : []
    }
  }
  return text.split('\n').map((nt) => node(nt))
}

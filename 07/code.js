function bottom_of_tower(tower) {
  return 'tknk'
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

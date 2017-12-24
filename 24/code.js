function parse_components(text) {
  return text.split('\n')
}

function valid_connection(component, connection) {
  component = component.split('/')
  if ( component[0] === connection ) {
    return component[1]
  } else if ( component[1] === connection ) {
    return component[0]
  } else {
    return false
  }
}

function possible_bridges(components, current_bridge, connection, bridges) {
  if ( typeof components === 'undefined' ) {
    components = []
  }
  if ( typeof current_bridge === 'undefined' ) {
    current_bridge = ""
  }
  if ( typeof connection === 'undefined' ) {
    connection = '0'
  }
  if ( typeof bridges === 'undefined' ) {
    bridges = new Set()
  }

  components.forEach(function(component) {
    let new_connection = valid_connection(component, connection)
    if ( new_connection ) {
      let new_bridge = (current_bridge === '') ? component : (current_bridge + "--" + component)
      bridges.add(new_bridge)
      possible_bridges(components.filter(x => component !== x), new_bridge, new_connection, bridges)
    }
  })

  return bridges
}

function bridge_strength(bridge) {
  const component_strength = component => component.split('/').map(Number).reduce((a, b) => a + b, 0)
  return bridge.split('--').map(component_strength).reduce((a, b) => a + b, 0)
}

function strongest_bridge(bridges) {
  return Array.from(bridges).map(bridge_strength).reduce((a, b) => Math.max(a, b), 0)
}

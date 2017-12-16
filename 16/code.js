function lookup_item(arr, index) {
  while ( index < 0 ) {
    index += arr.length
  }
  while ( index >= arr.length ) {
    index -= arr.length
  }
  return arr[index]
}

function spin(x) {
  return function(item, index, arr) {
    return lookup_item(arr, index - x)
  }
}

function exchange(x, y) {
  return function(item, index, arr) {
    if (index === x) {
      return arr[y]
    } else if (index === y) {
      return arr[x]
    } else {
      return item
    }
  }
}

function partner(x, y) {
  return function(item, index, arr) {
    if (item === x) {
      return y
    } else if (item === y) {
      return x
    } else {
      return item
    }
  }
}

function instructions_to_functions(instructions) {
  return instructions.split(',').map(function(instruction) {
    let command = instruction[0]
    let input = instruction.substring(1, instruction.length)
    if (command === 's') {
      return spin(parseInt(input, 10))
    } else if (command == 'x') {
      input = input.split('/')
      return exchange(parseInt(input[0], 10), parseInt(input[1], 10))
    } else if (command == 'p') {
      input = input.split('/')
      return partner(input[0], input[1])
    }
  })
}

function dance(dancers, instructions) {
  dancers = Array.from(Array(dancers).keys()).map(x => String.fromCharCode(x + 97))
  instructions = instructions_to_functions(instructions)
  instructions.forEach(function(instruction) {
    dancers = dancers.map(instruction)
  })
  return dancers.join('')
}

function dance_repeats(dancers, instructions) {
  dancers = Array.from(Array(dancers).keys()).map(x => String.fromCharCode(x + 97))
  instructions = instructions_to_functions(instructions)
  let times = 1
  while ( true ) {
    instructions.forEach(function(instruction) {
      dancers = dancers.map(instruction)
    })
    if (dancers.join('') === Array.from(dancers).sort().join('')) {
      break
    }
    times++
  }
  return times
}

function dance_repeatedly(dancers, instructions, times) {
  loop_size = dance_repeats(dancers, instructions)
  dancers = Array.from(Array(dancers).keys()).map(x => String.fromCharCode(x + 97))
  instructions = instructions_to_functions(instructions)
  for ( let i = 0; i < (times % loop_size); i++ ) {
    instructions.forEach(function(instruction) {
      dancers = dancers.map(instruction)
    })
  }
  return dancers.join('')
}

const comparisons = {
  '>': (a, b) => (a > b),
  '<': (a, b) => (a < b),
  '>=': (a, b) => (a >= b),
  '<=': (a, b) => (a <= b),
  '==': (a, b) => (a === b),
  '!=': (a, b) => (a !== b)
}

function process_instruction(register, text) {
  const parts = text.split(' ')

  const operation_register = parts[0]
  const operation = parts[1]
  let operation_value = parseInt(parts[2], 10)
  const comparison_register = parts[4]
  const comparison = comparisons[parts[5]]
  const comparison_value = parseInt(parts[6], 10)

  const comparison_register_value = register[comparison_register] || 0

  if (comparison(comparison_register_value, comparison_value)) {
    if (operation === 'dec') {
      operation_value = -operation_value
    }
    register[operation_register] = (register[operation_register] || 0) + operation_value
  }
}

function process_instructions(text) {
  const instructions = text.split('\n')
  let register = {}
  instructions.forEach((i) => process_instruction(register, i))
  return register
}

function maximum_register_value(register) {
  return Object.keys(register).map(key => register[key])
                              .reduce((a, b) => Math.max(a, b), 0)
}

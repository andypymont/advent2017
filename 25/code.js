function range(x) {
  return Array.from(Array(x).keys())
}

function Machine(instructions) {
  this.begin = ''
  this.steps = 0
  this.states = {}
  this.tape = new Set()
  this.cursor = 0

  let current_state_name = ''
  let current_state = {}
  let current_value = -1

  instructions.split('\n')
              .map(i => i.trim())
              .filter(i => i !== '')
              .forEach(instruction => {
                const words = instruction.split(' ')
                if ( words[0] === 'Begin' ) {
                  this.begin = words[3][0]
                } else if ( words[0] === 'Perform' ) {
                  this.steps = Number(words[5])
                } else if ( words[0] === 'In' ) {
                  if ( words[2][0] !== current_state_name ) {
                    current_state_name = words[2][0]
                    current_state = {}
                    this.states[current_state_name] = current_state
                  }
                } else if ( words[0] === 'If' ) {
                  if ( Number(words[5][0]) !== current_value ) {
                    current_value = Number(words[5][0])
                    current_state[current_value] = {}
                  }
                } else if ( words[0] === '-' && words[1] === 'Write' ) {
                  current_state[current_value].write = Number(words[4][0])
                } else if ( words[0] === '-' && words[1] === 'Move' && words[6] === 'left.' ) {
                  current_state[current_value].move = -1
                } else if ( words[0] === '-' && words[1] === 'Move' && words[6] === 'right.' ) {
                  current_state[current_value].move = 1
                } else if ( words[0] === '-' && words[1] === 'Continue' ) {
                  current_state[current_value].next = words[4][0]
                }
              })
    this.state = this.begin
}
Machine.prototype.get = function(n) {
  return this.tape.has(n) ? 1 : 0
}
Machine.prototype.next = function() {
  const instruction = this.states[this.state][this.get(this.cursor)]

  // write the next value
  if ( instruction.write === 0 ) {
    this.tape.delete(this.cursor)
  } else if ( instruction.write === 1 ) {
    this.tape.add(this.cursor)
  }

  // move the cursor
  this.cursor += instruction.move

  // set the next state
  this.state = instruction.next
}
Machine.prototype.run = function() {
  range(this.steps).forEach(x => this.next())
  return this.tape.size
}

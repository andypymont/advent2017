function Coprocessor() {
  this.registers = {}
}
Coprocessor.prototype.get = function(x) {
  return Number(x) || this.registers[x] || 0
}
Coprocessor.prototype.set = function(x, y) {
  return this.registers[x] = this.get(y)
}
Coprocessor.prototype.mul = function(x, y) {
  return this.set(x, this.get(x) * this.get(y))
}
Coprocessor.prototype.sub = function(x, y) {
  return this.set(x, this.get(x) - this.get(y))
}

function count_mul(instructions) {
  const copro = new Coprocessor()
  let count = 0
  instructions = instructions.split('\n')
                             .map(x => x.split(' '))

  for ( let i = 0, instruct = instructions[0]; i < instructions.length; instruct = instructions[i] ) {

    if ( instruct[0] === 'set' ) {
      copro.set(instruct[1], instruct[2])
    } else if ( instruct[0] === 'sub' ) {
      copro.sub(instruct[1], instruct[2])
    } else if (instruct[0] === 'mul' ) {
      copro.mul(instruct[1], instruct[2])
      count++
    }

    if ( instruct[0] === 'jnz' && (copro.get(instruct[1]) !== 0) ) {
      i += copro.get(instruct[2])
    } else {
      i++
    }
  }

  return count
}

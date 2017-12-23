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

function coprocess(a) {
  let h = 0
  let start = 79

  if ( a !== 0 ) {
    start = (start * 100) + 100000
  }

  for ( let b = start; b <= (start + 17000); b += 17 ) {
    for ( let d = 2; d < b; d++ ) {
      if ( b % d === 0 ) {
        h++
        break
      }
    }
  }

  let mul = Math.pow(start - 2, 2)

  return { mul, h }
}

function Duet() {
  this.registers = {}
  this.sound = 0
}
Duet.prototype.get = function(x) {
  return Number(x) || this.registers[x] || 0
}
Duet.prototype.set = function(x, y) {
  return this.registers[x] = this.get(y)
}
Duet.prototype.snd = function(x) {
  return this.sound = this.get(x)
}
Duet.prototype.add = function(x, y) {
  return this.set(x, this.get(x) + this.get(y))
}
Duet.prototype.mul = function(x, y) {
  return this.set(x, this.get(x) * this.get(y))
}
Duet.prototype.mod = function(x, y) {
  return this.set(x, this.get(x) % this.get(y))
}

function first_recovered(instructions) {
  duet = new Duet()
  instructions = instructions.split('\n')
                             .map(x => x.split(' '))
  for ( let i = 0, instruct = instructions[0]; i < instructions.length; instruct = instructions[i] ) {

    if ( instruct[0] === 'rcv' && (duet.get(instruct[1]) > 0) ) {
      return duet.sound
    } else if ( instruct[0] === 'set' ) {
      duet.set(instruct[1], instruct[2])
    } else if ( instruct[0] === 'snd' ) {
      duet.snd(instruct[1])
    } else if ( instruct[0] === 'add' ) {
      duet.add(instruct[1], instruct[2])
    } else if ( instruct[0] === 'mul' ) {
      duet.mul(instruct[1], instruct[2])
    } else if ( instruct[0] === 'mod' ) {
      duet.mod(instruct[1], instruct[2])
    }

    if ( instruct[0] === 'jgz' && (duet.get(instruct[1]) > 0) ) {
      i += duet.get(instruct[2])
    } else {
      i++
    }
  }
}

function Duet2(id) {
  this.id = id
  this.registers = {'p': id}
  this.queue = []
  this.sent = 0
}
Duet2.prototype.get = Duet.prototype.get
Duet2.prototype.set = Duet.prototype.set
Duet2.prototype.add = Duet.prototype.add
Duet2.prototype.mul = Duet.prototype.mul
Duet2.prototype.mod = Duet.prototype.mod
Duet2.prototype.snd = function(x) {
  if ( this.partner ) {
    this.partner.queue.push(this.get(x))
    this.sent++
    return true
  } else {
    return false
  }
}
Duet2.prototype.rcv = function(x) {
  if ( this.queue.length > 0 ) {
    this.set(x, this.queue.shift())
    return true
  } else {
    return false
  }
}
Duet2.prototype.command = function(instructions) {
  let rv = !( instructions[0] === 'rcv' &&  this.queue.length === 0 )

  if (rv) {
    if ( instructions[0] === 'set' ) {
      this.set(instructions[1], instructions[2])
    } else if ( instructions[0] === 'add' ) {
      this.add(instructions[1], instructions[2])
    } else if ( instructions[0] === 'mul' ) {
      this.mul(instructions[1], instructions[2])
    } else if ( instructions[0] === 'mod' ) {
      this.mod(instructions[1], instructions[2])
    } else if ( instructions[0] === 'snd' ) {
      this.snd(instructions[1])
    } else if ( instructions[0] === 'rcv' ) {
      this.rcv(instructions[1])
    }
  }

  return rv
}

function times_sent(instructions) {
  const p0 = new Duet2(0)
  const p1 = new Duet2(1)
  p0.partner = p1
  p1.partner = p0

  let i0 = 0
  let i1 = 0

  instructions = instructions.split('\n')
                             .map(x => x.split(' '))

  while ( true ) {
    let waiting0 = ( i0 >= instructions.length ) || !p0.command(instructions[i0])
    let waiting1 = ( i1 >= instructions.length ) || !p1.command(instructions[i1])

    if (waiting0 && waiting1) {
      break // out of the loop as programs have terminated
    }

    if ( instructions[i0][0] === 'jgz' && ( p0.get(instructions[i0][1]) > 0) ) {
      i0 += p0.get(instructions[i0][2])
    } else if (!waiting0) {
      i0++
    }

    if ( instructions[i1][0] === 'jgz' && ( p1.get(instructions[i1][1]) > 0) ) {
      i1 += p1.get(instructions[i1][2])
    } else if (!waiting1) {
      i1++
    }
  }

  return p1.sent
}

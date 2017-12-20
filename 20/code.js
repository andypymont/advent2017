function Particle(p, v, a) {
  this.p = p
  this.v = v
  this.a = a
}
Particle.prototype.advance = function() {
  this.v = add_coordinates(this.v, this.a)
  this.p = add_coordinates(this.p, this.v)
}
Particle.prototype.distance = function() {
  return this.p.map(Math.abs)
               .reduce((a, b) => a + b, 0)
}

function parse_particle(text) {
  const properties = text.split(', ')
                         .map(vector => vector.substring(3, vector.length - 1))
                         .map(vector => vector.split(',')
                                              .map(x => Number(x.trim())))
  return new Particle(properties[0], properties[1], properties[2])
}

function parse_particles(text) {
  return text.split('\n').map(parse_particle)
}

function add_coordinates(c1, c2) {
  return c1.map((c, ix) => c + (c2[ix] || 0))
}

function closest_particle(particles) {
  for ( let i = 0; i < 1000; i++ ) {
    particles.forEach(p => p.advance())
  }
  const distances = particles.map(p => p.distance())
  const shortest = distances.reduce((a, b) => Math.min(a, b), Infinity)
  return distances.indexOf(shortest)
}

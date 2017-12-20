// Part 1 tests
function test_parse_particle(text, expected_p, expected_v, expected_a) {
  QUnit.test('parse_particle("' + text + '") generates Particle object correctly', function(assert) {
    const particle = parse_particle(text)
    assert.ok(particle)
    assert.deepEqual(particle.p, expected_p)
    assert.deepEqual(particle.v, expected_v)
    assert.deepEqual(particle.a, expected_a)
  })
}
test_parse_particle('p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>', [3,0,0], [2,0,0],[-1,0,0])
test_parse_particle('p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>', [4,0,0], [0,0,0],[-2,0,0])

QUnit.test('parse_particles() on the test input is successful', function(assert) {
  const text = 'p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>\np=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>'
  const particles = parse_particles(text)
  assert.ok(particles)
  assert.equal(particles.length, 2)
  assert.deepEqual(particles[0].p, [3,0,0])
  assert.deepEqual(particles[0].v, [2,0,0])
  assert.deepEqual(particles[0].a, [-1,0,0])
  assert.deepEqual(particles[1].p, [4,0,0])
  assert.deepEqual(particles[1].v, [0,0,0])
  assert.deepEqual(particles[1].a, [-2,0,0])
})

function test_add_coordinates(c1, c2, expected) {
  QUnit.test('add_coordinates([' + c1.toString() + '], [' + c2.toString() + ']) === [' + expected + ']', function(assert) {
    assert.deepEqual(add_coordinates(c1, c2), expected)
  })
}
test_add_coordinates([0, 0, 0], [1, 1, 1], [1, 1, 1])
test_add_coordinates([-1, -2, -3], [1, 2, 3], [0, 0, 0])
test_add_coordinates([0, 1, 2], [2, 1, 0], [2, 2, 2])
test_add_coordinates([3, -1, -2], [4, 7, 2], [7, 6, 0])
test_add_coordinates([1, 2, 3], [1, 2], [2, 4, 3])

function test_particle_advance(text, expected_p, expected_v, expected_a) {
  QUnit.test('p = parse_particle("' + text + '"); p.advance() advances particle as expected', function(assert) {
    let p = parse_particle(text)
    p.advance()
    assert.ok(p)
    assert.deepEqual(p.p, expected_p)
    assert.deepEqual(p.v, expected_v)
    assert.deepEqual(p.a, expected_a)
  })
}
test_particle_advance('p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>', [4, 0, 0], [1, 0, 0], [-1, 0, 0])
test_particle_advance('p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>', [2, 0, 0], [-2, 0, 0], [-2, 0, 0])
test_particle_advance('p=< 4,0,0>, v=< 1,0,0>, a=<-1,0,0>', [4, 0, 0], [0, 0, 0], [-1, 0, 0])
test_particle_advance('p=< 2,0,0>, v=<-2,0,0>, a=<-2,0,0>', [-2, 0, 0], [-4, 0, 0], [-2, 0, 0])
test_particle_advance('p=< 4,0,0>, v=< 0,0,0>, a=<-1,0,0>', [3, 0, 0], [-1, 0, 0], [-1, 0, 0])
test_particle_advance('p=<-2,0,0>, v=<-4,0,0>, a=<-2,0,0>', [-8, 0, 0], [-6, 0, 0], [-2, 0, 0])

function test_particle_distance(text, expected) {
  QUnit.test('p = parse_particle("' + text + '"); p.distance() === ' + expected, function(assert) {
    let p = parse_particle(text)
    assert.equal(p.distance(), expected)
  })
}
test_particle_distance('p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>', 3)
test_particle_distance('p=<65,1223,-530>, v=<-14,-136,52>, a=<2,2,0>', 1818)
test_particle_distance('p=<260,-387,800>, v=<49,14,-103>, a=<-13,4,4>', 1447)
test_particle_distance('p=<429,726,462>, v=<-36,-36,-19>, a=<0,-6,-4>', 1617)
test_particle_distance('p=<1705,-165,1331>, v=<-134,9,-104>, a=<-3,0,-3>', 3201)
test_particle_distance('p=<341,693,-473>, v=<-28,9,-18>, a=<0,-13,10>', 1507)
test_particle_distance('p=<2816,-2250,1464>, v=<-91,41,149>, a=<-4,6,-20>', 6530)

QUnit.test('closest_particle(parse_particles(test_input)) === 0', function(assert) {
  assert.equal(closest_particle(parse_particles('p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>\np=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>')), 0)
})

// Part 1 result
QUnit.test('closest_particle(parse_particles(puzzle_input)) === 161', function(assert) {
  assert.equal(closest_particle(parse_particles(puzzle_input)), 161)
})

// Part 2 tests
const test2_input =
`p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>
p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>
p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>
p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>`
QUnit.test('surviving_particles(parse_particles(test2_input)) === 1', function(assert) {
  assert.equal(surviving_particles(parse_particles(test2_input)), 1)
})

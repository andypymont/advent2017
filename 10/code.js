function subarray(array, start, length) {
  return array.slice(start, start+length)
              .concat(array.slice(0, Math.max(start+length-array.length, 0)))
}

function reverse_section(list, position, length) {
  let section = subarray(list, position, length)
  let reversed_section = section.map((item, index, arr) => arr[arr.length-index-1])
  return list.map(function(item) {
    let i = section.indexOf(item)
    return (i === -1) ? item : reversed_section[i]
  })
}

function apply_transformations(list, transformations) {
  let position = 0
  let skip = 0
  transformations.split(',')
                 .map(i => parseInt(i, 10))
                 .forEach(function(length) {
                   list = reverse_section(list, position, length)
                   position = (position + length + skip) % list.length
                   skip++
                 })
  return list
}

function checksum(list) {
  return list[0] * list[1]
}

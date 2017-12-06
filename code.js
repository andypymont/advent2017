function rolling_lookup(array, index) {
  while ( index >= array.length ) {
    index -= array.length
  }
  let rv = array[index]
  return rv
}

function checksum(input) {
  digits = input.toString()
                .split('')
                .map((x) => parseInt(x, 10))
  return digits.map((x, index) => (x === rolling_lookup(digits, index+1)) ? x : 0)
               .reduce((a, b) => a+b, 0)
}

function checksum2(input) {
  digits = input.toString()
                .split('')
                .map((x) => parseInt(x, 10))
  lookahead = (digits.length / 2)
  return digits.map((x, index) => (x === rolling_lookup(digits, index+lookahead)) ? x : 0)
               .reduce((a, b) => a+b, 0)
}

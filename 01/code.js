function rolling_lookup(array, index) {
  while ( index >= array.length ) {
    index -= array.length
  }
  return array[index]
}

function calc_captcha(input, lookahead) {
  digits = input.toString()
                .split('')
                .map((x) => parseInt(x, 10))
  la = lookahead(digits)
  return digits.map((x, index) => (x === rolling_lookup(digits, index+la)) ? x : 0)
               .reduce((a, b) => a+b, 0)
}

function captcha(input) {
  return calc_captcha(input, (x) => 1)
}

function captcha2(input) {
  return calc_captcha(input, (x) => (x.length/2))
}

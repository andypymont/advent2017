const only_unique = (value, index, arr) => (arr.indexOf(value) === index)

function valid_passphrase(passphrase) {
  const words = passphrase.split(' ')
  return words.filter(only_unique)
              .map((word) => words.filter((w) => w === word).length)
              .reduce((a, b) => Math.max(a, b), 0) === 1
}

function sort_word(word) {
  return word.split('').sort().join('')
}

function valid_passphrase2(passphrase) {
  const words = passphrase.split(' ').map(sort_word)
  return words.filter(only_unique)
              .map((word) => words.filter((w) => w === word).length)
              .reduce((a, b) => Math.max(a, b), 0) === 1
}

function count_valid_passphrases(passphrases, check_function) {
  return passphrases.split('\n')
                    .map((x) => check_function(x) ? 1 : 0)
                    .reduce((a,b) => a+b, 0)
}

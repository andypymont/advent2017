function valid_passphrase(passphrase) {
  const words = passphrase.split(' ')
  const only_unique = (value, index, arr) => (arr.indexOf(value) === index)
  return words.filter(only_unique)
              .map((word) => words.filter((w) => w === word).length)
              .reduce((a, b) => Math.max(a, b), 0) === 1
}

function count_valid_passphrases(passphrases) {
  return passphrases.split('\n')
                    .map((x) => valid_passphrase(x) ? 1 : 0)
                    .reduce((a,b) => a+b, 0)
}

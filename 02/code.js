function row_checksum(rowtext) {
  let row = rowtext.split('\t').map((x) => parseInt(x, 10))
  let max = row.reduce((a,b) => Math.max(a,b), 0)
  let min = row.reduce((a,b) => Math.min(a,b), Infinity)
  return max-min
}

function checksum(spreadsheet) {
  return spreadsheet.split('\n').map(row_checksum).reduce((a,b) => a+b, 0)
}

function row_checksum2(rowtext) {
  let row = rowtext.split('\t').map((x) => parseInt(x, 10))
  for ( let a = 0; a<row.length; a++ ) {
    for ( let b = (a+1); b<row.length; b++ ) {
      if ((row[a] % row[b]) === 0) {
        return (row[a]/row[b])
      } else if ((row[b] % row[a]) === 0) {
        return (row[b]/row[a])
      }
    }
  }
  return 0
}

function checksum2(spreadsheet) {
  return spreadsheet.split('\n').map(row_checksum2).reduce((a,b) => a+b, 0)
}

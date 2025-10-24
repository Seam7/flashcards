const { stringify } = require('csv-stringify/sync')

function toCsv(rows: any[], columns: string[]) {
  return stringify(rows, { header: true, columns })
}

module.exports = { toCsv }

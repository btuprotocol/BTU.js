/**
 * Met en forme une date au format YYYY-MM-DD
 */
const formatDateYYYYMMDD = (date) => {
  let d
  if (Object.prototype.toString.call(date) === '[object Date]') {
    d = date
  } else {
    d = new Date(date)
  }

  if (Number.isNaN(d.getTime())) {
    return '1970-01-01'
  }

  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()

  return year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day
}

module.exports = formatDateYYYYMMDD

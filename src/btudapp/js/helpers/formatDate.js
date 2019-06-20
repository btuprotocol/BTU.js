/**
 * Met en forme une date
 */
const formatDate = (date, locale) => {
    const d = new Date(date)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const dateString = d.toLocaleDateString(locale, options)

    return dateString
}

module.exports = formatDate

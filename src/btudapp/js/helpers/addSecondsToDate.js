// Return a date from a specified date with seconds added

const addSecondsToDate = (date, seconds) => { Date(date.getTime() + seconds) }

module.exports = addSecondsToDate

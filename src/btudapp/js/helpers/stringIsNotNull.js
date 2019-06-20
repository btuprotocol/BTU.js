// Return if the string is not empty/undefined

const stringIsNotNull = (string) => {
    if (string !== undefined && string !== null && string !== 'undefined' && string.length) {
        return true
    }
    return false
}

module.exports = stringIsNotNull

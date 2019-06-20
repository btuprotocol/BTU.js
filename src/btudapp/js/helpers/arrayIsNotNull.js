// Return if the array is not empty/undefine

const arrayIsNotNull = (array) => {
    if (array && array !== 'undefined' && array.length) {
        return true
    }
    return false
}

module.exports = arrayIsNotNull

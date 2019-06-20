// Return if the dictionary is not empty/undefined

const dictionaryIsNotNull = (dictionary) => {
    if (dictionary && dictionary !== 'undefined' && dictionary.length) {
        return true
    }
    return false
}

module.exports = dictionaryIsNotNull

// Return a query string for a dictionary of key/value

const urlParametersToString = (urlParameters) => {
    const output = []
    const keys = Object.keys(urlParameters)
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (Object.prototype.hasOwnProperty.call(urlParameters, key) && urlParameters[key] !== undefined && urlParameters[key] !== 'undefined') {
            output.push(key + '=' + encodeURIComponent(urlParameters[key]))
        }
    }
    return output.join('&')
}

module.exports = urlParametersToString

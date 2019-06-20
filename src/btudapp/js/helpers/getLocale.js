const stringIsNotNull = require('./stringIsNotNull')

const supportedLocales = ['fr', 'us']
const defaultLocale = supportedLocales[0]

const language = navigator.language || navigator.userLanguage
const locale = language.substr(3)

const getLocale = () => {
    if (stringIsNotNull(locale)) {
        const lowerCaseLocale = locale.toLowerCase()
        if (supportedLocales.includes(lowerCaseLocale)) {
            return lowerCaseLocale
        }
    }
    return defaultLocale
}

module.exports = getLocale

const stringIsNotNull = require('./stringIsNotNull')

const supportedLanguages = ['en', 'fr']
const defaultLanguage = supportedLanguages[0]

let language = navigator.language || navigator.userLanguage
language = language.substr(0, 2)

const getLanguage = () => {
  if (stringIsNotNull(language)) {
    const lowerCaseLanguage = language.toLowerCase()
      if (supportedLanguages.includes(lowerCaseLanguage)) {
        return lowerCaseLanguage
      }
  }
  return defaultLanguage
}

module.exports = getLanguage

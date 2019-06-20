const reactMultiLang = require('react-multi-lang')
const fr = require('../../translations/fr.json')
const en = require('../../translations/en.json')
const getLanguage = require('./getLanguage')

const setDefaultTranslation = () => {
    reactMultiLang.setDefaultTranslations({fr, en})
    reactMultiLang.setDefaultLanguage(getLanguage())
}

module.exports = setDefaultTranslation

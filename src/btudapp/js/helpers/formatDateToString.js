/**
 * Options par défaut : jour (nombre) mois (toutes lettres)
 */
const defaultOptions = {
  month: 'short',
  day: 'numeric',
}

/**
 * Convertit un objet Date en une chaîne de caractères
 *
 * @param {Date} date - Date à mettre en forme
 * @param {string} [language='en'] - Langue
 * @param {string} [locale='US'] - Localisation de la langue
 * @param {object} [options] - Options à passer à la fonction de conversion
 * @return {string} Date mise en forme
 */
const formatDateToString = (date, language = 'en', locale = 'US', options = defaultOptions) => {
  if (date !== null) {
    return date.toLocaleDateString(language + '-' + locale.toUpperCase(), options)
  }

  return ''
}

module.exports = formatDateToString

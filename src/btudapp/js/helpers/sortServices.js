/**
 * Trie deux services en fonction d'une langue
 *
 * @param {Object} a - 1er service à trier
 * @param {Object} b - 2e service à trier
 * @param {string} [language='fr'] - Langue du tri
 */
const sortServices = (a, b, language = 'fr') => {
  const al = a[language] ? a[language].toLowerCase() : a[language]
  const bl = b[language] ? b[language].toLowerCase() : b[language]

  if (al && bl) {
    if (al < bl) return -1
    if (al > bl) return 1
    return 0
  }
  if (al) return -1
  if (bl) return 1
  return 0
}


module.exports = sortServices

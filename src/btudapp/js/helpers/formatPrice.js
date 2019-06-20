/**
 * Met en forme un prix
 *
 * @param {number} price - Prix
 * @param {string} currencySymbol - Symbole monétaire
 * @param {string} language - Langue
 * @return {string} Prix mis en forme
 */
const formatPrice = (price, currencySymbol = '€', language = 'en') => {
  let displayedPrice = price
  if (price === null) {
    displayedPrice = ''
  } else if (!Number.isNaN(price)) {
    displayedPrice = price.toFixed(2)
  }

  if (language === 'fr') {
    displayedPrice = displayedPrice.replace('.', ',') + ' ' + currencySymbol
  } else {
    displayedPrice = currencySymbol + ' ' + displayedPrice
  }

  return displayedPrice
}

module.exports = formatPrice

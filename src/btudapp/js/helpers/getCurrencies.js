// Tableau des devises
const currencies = [
  {
    name: 'Euro',
    code: 'EUR',
    symbol: '€',
  },
  {
    name: 'Pound',
    code: 'GBP',
    symbol: '£',
  },
  {
    name: 'US Dollar',
    code: 'USD',
    symbol: 'US$',
  },
  {
    name: 'Yen',
    code: 'JPY',
    symbol: '¥',
  },
  {
    name: 'Won',
    code: 'KRW',
    symbol: '￦',
  },
]

/**
 * Renvoie un tableau contenant l'ensemble des devises acceptées par le projet
 */
const getCurrencies = () => (currencies)

module.exports = getCurrencies

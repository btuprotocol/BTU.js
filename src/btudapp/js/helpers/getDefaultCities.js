// Tableau des villes par défaut sur la page d'accueil
const defaultCities = [
  {
    en: 'Barcelona',
    fr: 'Barcelone',
    lat: 41.3242,
    lon: 2.1767,
  },
  {
    en: 'New York',
    fr: 'New York',
    lat: 40.7447,
    lon: -73.9746,
  },
  {
    en: 'Paris',
    fr: 'Paris',
    lat: 48.8546,
    lon: 2.34771,
  },
  {
    en: 'Tel Aviv',
    fr: 'Tel Aviv',
    lat: 32.0805,
    lon: 34.7805,
  },
  // {
  //   en: 'Bangkok',
  //   fr: 'Bangkok',
  //   lat: 13.755,
  //   lon: 100.61,
  // },

  // {
  //   en: 'London',
  //   fr: 'Londres',
  //   lat: 51.5073,
  //   lon: -0.127647,
  // },
  // {
  //   en: 'Singapore',
  //   fr: 'Singapour',
  //   lat: 1.29048,
  //   lon: 103.852,
  // },
]

/**
 * Renvoie un tableau contenant les villes par défaut affichées sur la page d'accueil
 */
const getDefaultCities = () => (defaultCities)

module.exports = getDefaultCities

// Url d'embed
const baseUrl = 'https://www.openstreetmap.org/export/embed.html'
// Taille de la bounding box en degrés de latitude/longtiude
const coordinatesSpan = 0.005

/**
 * Construit une url vers une carte OpenStreetMap
 *
 * @param {float} latitude - Latitude du marqueur
 * @param {float} longitude - Longitude du marqueur
 */
const constructMapUrl = (latitude, longitude) => {
  // Vérification que les paramètres passés sont des nombres
  // et qu'ils restent dans les limites acceptées
  if (!Number.isNaN(latitude)
    && !Number.isNaN(longitude)
    && latitude >= -90
    && latitude <= 90
    && longitude >= -180
    && longitude <= 180
  ) {
    // Paramètres passés dans l'url
    const params = {
      bbox: [
        longitude - coordinatesSpan,
        latitude - coordinatesSpan,
        longitude + coordinatesSpan,
        latitude + coordinatesSpan,
      ].join(','),
      layer: 'mapnik',
      marker: [latitude, longitude].join(','),
    }

    // Concatenation des paramètres, de type "key=value"
    const paramsArray = []
    const keys = Object.keys(params)
    for (let i = 0; i < keys.length; i++) {
      paramsArray.push(keys[i] + '=' + params[keys[i]])
    }

    // Retour de l'url complète
    return baseUrl + '?' + paramsArray.join('&')
  }

  // Retour d'une url par défaut si les paramètres sont incorrects
  return baseUrl
}

module.exports = constructMapUrl

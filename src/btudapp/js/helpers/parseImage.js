/**
 * Met en forme une url d'image provenant du back
 *
 * @param {string} image - Url initiale de l'image
 */
const parseImage = (image) => {
  // Conversion de l'url : suppression de la redirection cds
  // + remplacement des backslashs par des slashs
  let url = image
    //.replace('https://bookings.cdsgroupe.com/btu/Services/ResourceProxy.ashx?source=UKN&file=', '')
    .replace(/\\/g, '/')

  // Si l'url ne débute pas par "http://" : le rajouter
  if (url.indexOf('http') !== 0) {
    url = 'http://' + url
  }

  return url
}

module.exports = parseImage

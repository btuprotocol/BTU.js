/**
 * Vérifie si un numéro de téléphone est valide ou non
 *
 * @param {string} phone
 */
const validatePhone = (phone) => {
  const re = /^[0-9]*$/
  const text = String(phone).toLowerCase()

  return (re.test(text) && text.length < 15 && text.length > 7)
}

module.exports = validatePhone

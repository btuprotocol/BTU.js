const baseUrl = require('./config').apiBaseUrl
const http = require('./http')

const requestWrapper = {
  /* --------------- AVAIL ---------------
   BODY
    lang
    date
    sessionId
    nbPers
    supplierCode
    timeActivity
    idActivity
  */
  avail: (body, callback) =>
    http(baseUrl, '/pcv/avail', {}, body, callback, 'POST'),

  /* --------------- BOOK ---------------
   BODY
    sessionId
    customerBookingRef
    departureDate
    idFare
    langFare
    timeFare
    codePers
    title
    firstname
    lastname
    phone
    email
    supplierCode
    activityCode
    cityCode
  */
  book: (body, callback) =>
    http(baseUrl, "/pcv/book", {}, body, callback, 'POST'),

  /* --------------- CANCEL ---------------
   BODY
    lang
    bookingRef
    fees
    policy
  */
  cancel: (body, callback) =>
    http(baseUrl, "/pcv/cancel", {}, body, callback, 'POST'),

  /* --------------- CATALOG ---------------
   BODY
    lang
    supplierCode
    year
  */
  catalog: (body, callback) =>
    http(baseUrl, "/pcv/catalog", {}, body, callback, 'POST'),

  /* --------------- DESC ---------------
   BODY
    lang
    supplierCode
    activityCode
  */
  desc: (body, callback) =>
    http(baseUrl, "/pcv/desc", {}, body, callback, 'POST'),

  /* --------------- SEARCH ---------------
   BODY
    lang
    dateA
    dateB
    nbPers
    cityCode
    activityCode
    categoryCode
    activityName
    latitude
    longitude
    val
  */
  search: (body, callback) =>
    http(baseUrl, "/pcv/search", {}, body, callback, 'POST'),

  /* --------------- STATUS ---------------
   BODY
    lang
    bookingRef
  */
  status: (body, callback) =>
    http(baseUrl, "/pcv/status", {}, body, callback, 'POST'),

  /* --------------- VOUCHER ---------------
   BODY
    lang
    bookingRef
  */
  voucher: (body, callback) =>
    http(baseUrl, "/pcv/voucher", {}, body, callback, 'POST')
}

module.exports = requestWrapper
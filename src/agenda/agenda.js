/**
 * @file agenda.js
 * @desc This is the User class definition file
 * @module Agenda
**/

const appendSlash = url => {
  return url.substr(-1) === '/' ? url : url + '/'
}

class Agenda {

  /**
   * @constructor Agenda
   * @desc Constructor for the Agenda class
   * @param {string} serverUrl The base url of the server
   * @param {Object} fetch The library used to make http calls
  **/
  constructor({serverUrl, fetch}) {
    this.serverUrl = serverUrl
    this.fetch = fetch
  }

  /**
   * @function getAvailableRooms
   * @desc Get rooms available
   * @param {number} hotelCode The hotel code associated with the room
   * @param {string} startDate The start date of the stay (YYYY-MM-DD)
   * @param {string} endDate The end date of the stay (YYYY-MM-DD)
   * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
   * @return The Json containing available rooms
   **/
  async getAvailableRooms(hotelCode, startDate, endDate, callback) {
    return await this.get(
      'hotel/avail',
      {
        hotelCode,
        dateA : startDate,
        dateB : endDate
      },
      callback
    )
  }

  /**
   * @function getReservationInformations
   * @desc Get informations for a reservation
   * @param {number} reservationId The id of the reservation
   * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
   * @return The Json containing informations about the reservation
   **/
  async getReservationInformations(reservationId, callback) {
    return await this.get(
      'hotel/res/info',
      {
        resId : reservationId
      },
      callback
    )
  }

  /**
   * @function cancelReservation
   * @desc Cancel a reservation
   * @param {number} reservationId The id of the reservation
   * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
   * @return The Json containing informations about the cancellation
   **/
  async cancelReservation(reservationId, callback) {
    return await this.get(
      'hotel/cancel',
      {
        resId : reservationId
      },
      callback
    )
  }

  /**
   * @function addAvailability
   * @desc Add availability for a ressource, if the resource was already available, this function do nothing
   * @param {number} id The id of the resource
   * @param {string} dateA The inclusive begin date of the avaibility, format "mm-dd-yyyy"
   * @param {string} dateB The inclusive end date of the avaibility, format "mm-dd-yyyy"
   * @return True if the avaibility is saved, false otherwise
   **/
  addAvailibility(id, dateA, dateB) {
    console.log(id);
    return null;
  }

  /**
   * @function removeAvailability
   * @desc Remove availability for a ressource, if the resource was already unavailable, this function do nothing
   * @param {number} id The id of the resource
   * @param {string} dateA The inclusive begin date of the unavaibility, format "mm-dd-yyyy"
   * @param {string} dateB The inclusive end date of the unavaibility, format "mm-dd-yyyy"
   * @return True if the unavaibility is saved, false otherwise
   **/
  removeAvailibility(id, dateA, dateB) {
    console.log(id);
    return null;
  }

  /**
   * @function http
   * @desc Call a HTTP request
   * @param {string} baseUrl The baseUrl of the server
   * @param {string} url The url to call
   * @param {Json} body The body of the call
   * @param {callback} successFn The callback called in case of a success
   * @param {string} method The http method
   * @return A Promise with the return of the call
   **/
  async http(baseUrl, url, body, successFn, method) {
    const response = await this.fetch(appendSlash(baseUrl) + url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: { 'content-type': 'application/json' },
      credentials: 'same-origin'
    })
    const json = await response.json()
    if (response.ok) {
      return successFn ? successFn(json) : json
    }
    return Promise.reject(JSON.stringify(json))
  }

  /**
   * @function post
   * @desc Call a HTTP POST request
   * @param {string} url The url to call
   * @param {Json} body The body of the call
   * @param {callback} successFn The callback called in case of a success
   * @return A Promise with the return of the call
   **/
  async post(url, body, successFn) {
    return await this.http(this.serverUrl, url, body, successFn, 'POST')
  }

  /**
   * @function post
   * @desc Call a HTTP GET request
   * @param {string} url The url to call
   * @param {Object} parameters The dictionary for key/value paramaters of the call
   * @param {callback} successFn The callback called in case of a success
   * @return A Promise with the return of the call
   **/
  async get(url, parameters, successFn) {
    const objectKeys = Object.keys(parameters)
    let stringParams = objectKeys
      .map(key => key + '=' + parameters[key])
      .join('&')
    stringParams = (objectKeys.length === 0 ? '' : '?') + stringParams

    return await this.http(
      this.serverUrl,
      url + stringParams,
      undefined,
      successFn,
      'GET'
    )
  }
}


module.exports = Agenda;

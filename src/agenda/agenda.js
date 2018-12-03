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
   * @function getAvailableRessources
   * @desc Get ressources available
   * @param {string} ressourceId The id of the ressources
   * @param {string} type The type of ressource
   * @param {string} startDate The start date of the stay (YYYY-MM-DD)
   * @param {string} endDate The end date of the stay (YYYY-MM-DD) (Null allowed)
   * @param {options} Ressource type and Additionnal information
   * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
   * @return The Json containing available rooms
   **/
  async getAvailableRessources(ressourceId, type, startDate, endDate, options, callback) {
    return await this.postParameters(
      type + '/avail',
      {
        ressourceId,
        type,
        dateA : startDate,
        dateB : endDate
      },
      options,
      callback
    )
  }

  /**
   * @function getReservationInformation
   * @desc Get information for a reservation
   * @param {string} reservationId The id of the reservation
   * @param {string} type The type of ressource
   * @param {options} Additionnal information
   * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
   * @return The Json containing information about the reservation
   **/
  async getReservationInformation(reservationId, type, options, callback) {
    return await this.postParameters(
      type + '/res/info',
      {
        reservationId,
        type
      },
      options,
      callback
    )
  }

  /**
   * @function requestReservation
   * @desc Request a reservation
   * @param {string} ressourceId The id of the ressource
   * @param {string} type The type of ressource
   * @param {string} itemId The id of item
   * @param {string} startDate The start date of the stay (YYYY-MM-DD)
   * @param {string} endDate The end date of the stay (YYYY-MM-DD) (Null allowed)
   * @param {options} Additionnal information
   * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
   * @return The Json containing information about the reservation
   **/
  async requestReservation(ressourceId, type, itemId, startDate, endDate, options, callback) {
    return await this.postParameters(
      type + '/res/request',
      {
        ressourceId,
        type,
        itemId,
        dateA : startDate,
        dateB : endDate
      },
      options,
      callback
    )
  }

  /**
   * @function cancelReservation
   * @desc Cancel a reservation
   * @param {string} reservationId The id of the reservation
   * @param {string} type The type of ressource
   * @param {options} Additionnal information   * @param {string} type The type of ressource
   * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
   * @return The Json containing information about the cancellation
   **/
  async cancelReservation(reservationId, type, options, callback) {
    return await this.postParameters(
      type + '/res/cancel',
      {
        reservationId,
        type
      },
      options,
      callback
    )
  }

  /**
   * @function addAvailability
   * @desc Add availability for a ressource, if the resource was already available, this function do nothing
   * @param {string} ressourceId The id of the resource
   * @param {string} type The type of ressource
   * @param {string} itemId The id of item
   * @param {string} dateA The inclusive begin date of the avaibility, format "mm-dd-yyyy"
   * @param {string} dateB The inclusive end date of the avaibility, format "mm-dd-yyyy" (Null allowed)
   * @return True if the avaibility is saved, false otherwise
   **/
  async addAvailibility(ressourceId, type, itemId, dateA, dateB, options, callback) {
    return await this.postParameters(
      type + '/agenda/add',
      {
        ressourceId,
        type,
        itemId,
        dateA,
        dateB
      },
      options,
      callback
      )
  }

  /**
   * @function removeAvailability
   * @desc Remove availability for a ressource, if the resource was already unavailable, this function do nothing
   * @param {string} ressourceId The id of the resource
   * @param {string} type The type of ressource
   * @param {string} itemId The id of item
   * @param {string} dateA The inclusive begin date of the avaibility, format "mm-dd-yyyy"
   * @param {string} dateB The inclusive end date of the avaibility, format "mm-dd-yyyy" (Null allowed)
   * @return True if the unavaibility is saved, false otherwise
   **/
  async removeAvailability(ressourceId, type, itemId, dateA, dateB, options, callback) {
    return await this.postParameters(
      type + '/agenda/remove',
      {
        ressourceId,
        type,
        itemId,
        dateA,
        dateB
      },
      options,
      callback
      )
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
      credentials: 'omit'
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
    return await this.postParameters(url, undefined, body, successFn)
    // return await this.http(this.serverUrl, url, body, successFn, 'POST')
  }

  /**
   * @function post
   * @desc Call a HTTP POST request
   * @param {string} url The url to call
   * @param {Object} parameters The dictionary for key/value paramaters of the call
   * @param {Json} body The body of the call
   * @param {callback} successFn The callback called in case of a success
   * @return A Promise with the return of the call
   **/
  async postParameters(url, parameters, body, successFn) {
    let stringParams = this.stringParams(parameters)

    return await this.http(
      this.serverUrl,
      url + stringParams,
      body,
      successFn,
      'POST'
    )
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
    let stringParams = this.stringParams(parameters)

    return await this.http(
      this.serverUrl,
      url + stringParams,
      undefined,
      successFn,
      'GET'
    )
  }

  stringParams(parameters) {
    const objectKeys = Object.keys(parameters)
    let stringParams = objectKeys
      .map(key => key + '=' + parameters[key])
      .join('&')
    return (objectKeys.length === 0 ? '' : '?') + stringParams
  }
}


module.exports = Agenda;

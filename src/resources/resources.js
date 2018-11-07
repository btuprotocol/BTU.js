/**
 * @file resources.js
 * @desc This is the User class definition file
 * @module Resources
**/

const request = require('request')

const appendSlash = url => {
  return url.substr(-1) === '/' ? url : url + '/'
}

class Resources {

  /**
   * @constructor Resources
   * @desc Constructor for the Resources class
   * @param {string} serverUrl The base url of the server
   * @param {Object} fetch The library used to make http calls
  **/
  constructor({serverUrl, fetch}) {
    this.serverUrl = serverUrl
    this.fetch = fetch
  }

  /**
   * @function getHotelInformations
   * @desc Get informations for a hotel
   * @param {number} hotelCode The hotel code from which to get information
   * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
   * @return The Json containing informations of the hotel
   **/
  async getHotelInformations(hotelCode, callback) {
    //return await this.get('hotel/info', { hotelCode }, callback)
    request.get({ url: this.serverUrl + '/hotel/info?hotelCode=' + hotelCode},function(error , response, body){callback(body)} );
  }

  /**
   * @function getRoomInformations
   * @desc Get informations for a room
   * @param {number} hotelCode The hotel code associated with the room
   * @param {number} roomCode The room code from which to get information
   * @param {string} startDate The start date of the stay (YYYY-MM-DD)
   * @param {string} endDate The end date of the stay (YYYY-MM-DD)
   * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
   * @return The Json containing informations of the room
   **/
  async getRoomInformations(hotelCode, roomCode, startDate, endDate, callback) {
    return await this.get(
      'hotel/room',
      {
        hotelCode,
        roomCode,
        dateA : startDate,
        dateB : endDate
      },
      callback
    )
  }

  /**
   * @function addResource
   * @desc Add resource to the offchain
   * @param {Json} resource The information about the resource to add, see Resources class for mor information
   * @return The id of the resource
   **/
  addResource(resource) {
    console.log(resource);
    return null;
  }

  /**
   * @function deleteResource
   * @desc Delete the resource to the offchain
   * @param {number} id The id of the resource to delete
   * @return True if the resource was deleted, false otherwise
   **/
  deleteResource(id) {
    console.log(id);
    return null;
  }

  /**
   * @function editResource
   * @desc Edit the resource in the offchain
   * @param {number} id The id of the resource to edit
   * @param {Json} resource The information about the resource to add, see Resources class for mor information
   * @return True if the resource was edited, false otherwise
   **/
  editResource(id, resource) {
    console.log(id);
    console.log(resource);
    return null;
  }

  /**
   * @function getResource
   * @desc Get a resource from the offchain
   * @param {number} id The id of the resource to get
   * @return The Json of the resource, see Resources class for mor information
   **/
  getResource(id) {
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
      headers: { 'content-type': 'application/json' }
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


module.exports = Resources;

import http from '../utils/http.js'

/**
 * @file agenda.js
 * @desc This is the User class definition file
 * @module Agenda
**/

class Availabilities {

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
   * @function searchAvailResources
   * @desc Get informations and availability
   * @param {string} search The name search query
   * @param {string} type The type of ressource
   * @param {string} searchType The search query
   * @param {options} Additionnal informations
   * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
   * @return The Json containing informations of the hotel
   **/
  async searchAvailableResources(resourceType, body, callback) {
      return await http.postParameters(resourceType + '/search/availabilities', {}, body, callback)
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
  async getResourceAvailabilities(resourceType, resourceId, body, callback) {
    return await http.postParameters(
      resourceType + '/' + resourceId + '/availabilities/',
      {},
      body,
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
  async getBookingDetails(resourceType, bookingId, body, callback) {
    return await http.postParameters(
      resourceType + '/booking/' + bookingId,
      {},
      body,
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
  async bookResource(resourceType, resourceId, body, callback) {
    return await http.postParameters(
      resourceType + '/booking/' + resourceId + '/book',
      {},
      body,
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
  async cancelBooking(resourceType, bookingId, body, callback) {
    return await http.postParameters(
      resourceType + '/booking/' + bookingId + '/cancel',
      {},
      body,
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
  async addAvailability(resourceType, resourceId, body, callback) {
    return await http.postParameters(
      resourceType + '/booking/' + resourceId + '/add',
      {},
      body,
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
  async removeAvailability(resourceType, resourceId, body, callback) {
    return await http.postParameters(
      resourceType + '/booking/' + resourceId + '/remove',
      {},
      body,
      callback
      )
  }
}


module.exports = Agenda;

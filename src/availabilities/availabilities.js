import http from '../utils/http.js'

/**
 * @file availabilities.js
 * @desc This is the Availabilities class definition file
 * @module Availabilities
**/

class Availabilities {

  /**
   * @constructor Availabilities
   * @desc Constructor for the Availabilities class
   * @param {string} serverUrl The base url of the server
  **/
  constructor({serverUrl}) {
      this.serverUrl = serverUrl
  }

  /**
   * @function searchAvailableResources
   * @desc Get resources with availabilities
   * @param {string} resourceType
   * @param {object} body
   * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
   * @return The Json containing informations of the hotel
   **/
   async searchAvailableResources(resourceType, body, callback) {
       return await http.postParameters(
           this.serverUrl,
           resourceType + '/search/availabilities',
           {},
           body,
           callback
       )
   }

  /**
   * @function getResourceAvailabilities
   * @desc Get availabilities of a resource
   * @param {string} resourceType
   * @param {string} resourceId
   * @param {object} body
   * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
   * @return The Json containing available rooms
   **/
   async getResourceAvailabilities(resourceType, resourceId, body, callback) {
     return await http.postParameters(
         this.serverUrl,
         resourceType + '/' + resourceId + '/availabilities/',
         {},
         body,
         callback
     )
   }

   /**
    * @function isResourceAvailable
    * @desc Check if the resource is available
    * @param {string} resourceType
    * @param {string} resourceId
    * @param {object} body
    * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
    * @return The Json containing available rooms
    **/
    async isResourceAvailable(resourceType, resourceId, body, callback) {
      return await http.postParameters(
          this.serverUrl,
          resourceType + '/' + resourceId + '/isavailable/',
          {},
          body,
          callback
      )
    }

  /**
   * @function getBookingDetails
   * @desc Get information for a booking
   * @param {string} resourceType
   * @param {string} bookingId
   * @param {object} body
   * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
   * @return The Json containing information about the reservation
   **/
   async getBookingDetails(resourceType, bookingId, body, callback) {
     return await http.postParameters(
         this.serverUrl,
         resourceType + '/booking/' + bookingId,
         {},
         body,
         callback
     )
   }

  /**
   * @function bookResource
   * @desc Request a booking
   * @param {string} resourceType
   * @param {string} resourceId
   * @param {object} body
   * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
   * @return The Json containing information about the reservation
   **/
   async bookResource(resourceType, resourceId, body, callback) {
     return await http.postParameters(
         this.serverUrl,
         resourceType + '/booking/' + resourceId + '/book',
         {},
         body,
         callback
     )
   }

  /**
   * @function cancelBooking
   * @desc Cancel a booking
   * @param {string} resourceType
   * @param {string} bookingId
   * @param {object} body
   * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
   * @return The Json containing information about the cancellation
   **/
   async cancelBooking(resourceType, bookingId, body, callback) {
     return await http.postParameters(
         this.serverUrl,
         resourceType + '/booking/' + bookingId + '/cancel',
         {},
         body,
         callback
     )
   }

  /**
   * @function addAvailability
   * @desc Add availability for a ressource
   * @param {string} resourceType
   * @param {string} resourceId
   * @param {object} body
   * @return True if the avaibility is saved, false otherwise
   **/
   async addAvailability(resourceType, resourceId, body, callback) {
     return await http.postParameters(
         this.serverUrl,
         resourceType + '/booking/' + resourceId + '/add',
         {},
         body,
         callback
     )
   }

  /**
   * @function removeAvailability
   * @desc Remove availability for a ressource
   * @param {string} resourceType
   * @param {string} resourceId
   * @param {object} body
   * @return True if the unavaibility is saved, false otherwise
   **/
   async removeAvailability(resourceType, resourceId, body, callback) {
     return await http.postParameters(
         this.serverUrl,
         resourceType + '/booking/' + resourceId + '/remove',
         {},
         body,
         callback
     )
   }
}


module.exports = Availabilities;

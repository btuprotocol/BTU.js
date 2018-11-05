/**
 * @file agenda.js
 * @desc This is the User class definition file
 * @module Agenda
**/

class Agenda {

  /**
   * @constructor Agenda
   * @desc Constructor for the Agenda class
  **/
  constructor() {
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
}


module.exports = Agenda;

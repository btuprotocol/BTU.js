/**
 * @file index.js
 * @desc This is Btujs definition file, main entry point of the library
 * @module Btujs
 * @requires User
**/

var User = require('./user/user.js');
var Resources = require('./resources/resources.js');
var Agenda = require('./agenda/agenda.js');

class Btujs {

  /**
   * @constructor Btujs
   * @desc Constructor for the Btujs class
  **/
  constructor() {
    this.user = new User();
    this.resources = new Resources();
    this.agenda = new Agenda();
  }
}

module.exports = Btujs;

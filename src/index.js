/**
 * @file index.js
 * @desc This is Btujs definition file, main entry point of the library
 * @module Btujs
 * @requires User
**/

import User from './user/user.js'
import Resources from './resources/resources.js'
import Agenda from './agenda/agenda.js'
import fetch from 'cross-fetch'

const defaultServerUrl = 'http://ec2-35-180-109-183.eu-west-3.compute.amazonaws.com:8080'
// const VERSION = require('.././package.json').version

class Btujs {

  /**
   * @constructor Btujs
   * @desc Constructor for the Btujs class
   * @param {string} serverUrl The base url of the server
  **/
  constructor({
  	serverUrl = defaultServerUrl
  } = {}) {
  	this.resources = new Resources({
  		serverUrl,
  		fetch
  	});

  	this.agenda = new Agenda({
  		serverUrl,
  		fetch
  	});

    this.user = new User();
  }
}

module.exports = Btujs;

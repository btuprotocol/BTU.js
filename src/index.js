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

const defaultServerUrl = 'http://www.btu-api.btu-direct.com'
const defaultServerUrlHttps = 'https://www.btu-api.btu-direct.com'
// const VERSION = require('.././package.json').version

class Btujs {

  /**
   * @constructor Btujs
   * @desc Constructor for the Btujs class
   * @param {string} serverUrl The base url of the server
  **/
  constructor({
  	serverUrl = defaultServerUrl
    serverHttps = defaultServerUrlHttps
  } = {}) {
  	this.resources = new Resources({
  		serverUrl,
      serverHttps,
  		fetch
  	});

  	this.agenda = new Agenda({
  		serverUrl,
      serverHttps,
  		fetch
  	});

    this.user = new User();
  }
}

module.exports = Btujs;

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
import package from '../package.json'

const defaultServerUrl = 'https://btu-api.btu-direct.com'
// const VERSION = require('.././package.json').version

// TODO : Récupérer version
let version = '1.3'

class Btujs {

  /**
   * @constructor Btujs
   * @desc Constructor for the Btujs class
   * @param {string} serverUrl The base url of the server
  **/
  constructor({
  	serverUrl = defaultServerUrl
  } = {}) {
      // TODO : Vérifier que l'url est bien formattée
      let versionUrl = serverUrl + '/' + version
      
  	this.resources = new Resources({
  		versionUrl,
  		fetch
  	});

  	this.agenda = new Agenda({
  		versionUrl,
  		fetch
  	});

    this.user = new User();
  }
}

module.exports = Btujs;

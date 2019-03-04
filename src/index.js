/**
 * @file index.js
 * @desc This is Btujs definition file, main entry point of the library
 * @module Btujs
**/

import Resources from './resources/resources.js'
import Availabilities from './availabilities/availabilities.js'

const version = require('../../package.json').version
const defaultServerUrl = 'https://btu-api.btu-direct.com'

class Btujs {

  /**
   * @constructor Btujs
   * @desc Constructor for the Btujs class
   * @param {string} serverUrl The base url of the server
  **/
  constructor({
  	serverUrl = defaultServerUrl
  } = {}) {

    let versionUrl = serverUrl + '/' + version

  	this.resources = new Resources({
  		serverUrl: versionUrl
  	});

    this.availabilities = new Availabilities({
        serverUrl: versionUrl
    })
  }
}

module.exports = Btujs;

/**
 * @file index.js
 * @desc This is Btujs definition file, main entry point of the library
 * @module Btujs
**/

import Resources from './resources/resources.js'
import Availabilities from './availabilities/availabilities.js'
import DappBar from './dappBar/src/dappBar'

const defaultServerUrl = 'https://btu-api.btu-direct.com'
const defaultVersion = '1'

class Btujs {

  /**
   * @constructor Btujs
   * @desc Constructor for the Btujs class
   * @param {string} serverUrl The base url of the server
  **/
  constructor({
      serverUrl = defaultServerUrl,
      version = defaultVersion
  } = {}) {

    let versionUrl = serverUrl + '/v' + version

  	this.resources = new Resources({
  		serverUrl: versionUrl
  	});

    this.availabilities = new Availabilities({
        serverUrl: versionUrl
    })

    this.loadDappBar = () => {
      return (<DappBar/>)
    }
  }
}

module.exports = {
  Btujs,
  DappBar
}
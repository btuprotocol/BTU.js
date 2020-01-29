'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _resources = require('./resources/resources.js');

var _resources2 = _interopRequireDefault(_resources);

var _availabilities = require('./availabilities/availabilities.js');

var _availabilities2 = _interopRequireDefault(_availabilities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file index.js
 * @desc This is Btujs definition file, main entry point of the library
 * @module Btujs
**/

const defaultServerUrl = 'https://btu-api.btu-direct.com';
const defaultVersion = '1';

class Btujs {

  /**
   * @constructor Btujs
   * @desc Constructor for the Btujs class
   * @param {string} serverUrl The base url of the server
  **/
  constructor({
    serverUrl = defaultServerUrl,
    version = defaultVersion,
  } = {}) {
    let versionUrl = serverUrl + '/v' + version;

    this.resources = new _resources2.default({
      serverUrl: versionUrl
    });

    this.availabilities = new _availabilities2.default({
      serverUrl: versionUrl
    });
  }
}

module.exports = Btujs;

import http from '../utils/http.js'

/**
 * @file resources.js
 * @desc This is the User class definition file
 * @module Resources
**/

class Resources {

    /**
     * @constructor Resources
     * @desc Constructor for the Resources class
     * @param {string} serverUrl The base url of the server
     * @param {Object} fetch The library used to make http calls
     **/
    constructor({serverUrl}) {
        this.serverUrl = serverUrl
    }

    /**
     * @function searchResources
     * @desc Get resources
     * @param {string} resourceType
     * @param {object} body
     * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
     * @return A json containing a list of resources
     **/
    async searchResources(resourceType, body, callback) {
        return await http.postParameters(
            this.serverUrl,
            resourceType + '/search',
            {},
            body,
            callback
        )
    }

    /**
     * @function getResource
     * @desc Get details of a resource
     * @param {string} resourceType
     * @param {string} resourceId
     * @param {object} body
     * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
     * @return A json containing details of a resource
     **/
     async getResource(resourceType, resourceId, body, callback) {
         return await http.postParameters(
             this.serverUrl,
             resourceType + '/' + resourceId,
             {},
             body,
             callback
         )
     }

    /**
     * @function getResourceItem
     * @desc Get details for an item of a resource
     * @param {string} resourceType
     * @param {string} resourceId
     * @param {string} itemId
     * @param {object} body
     * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
     * @return A json containing details of the item
     **/
    async getResourceItem(resourceType, resourceId, itemId, body, callback) {
        return await http.postParameters(
            this.serverUrl,
            resourceType + '/' + resourceId + '/' + itemId,
            {},
            body,
            callback
        )
    }

    /**
     * @function addResource
     * @desc Add resource to the offchain
     * @param {string} resourceType
     * @param {object} body
     * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
     * @return A json of the resource added
     **/
    async addResource(resourceType, body, callback) {
        return await http.postParameters(
            this.serverUrl,
            resourceType + '/add',
            {},
            body,
            callback
        )
    }

    /**
     * @function deleteResource
     * @desc Delete a resource from the offchain
     * @param {string} resourceType
     * @param {string} resourceId
     * @param {object} body
     * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
     * @return A json of the resource successfully deleted, an empty json otherwise
     **/
    async deleteResource(resourceType, resourceId, body, callback) {
        return await http.postParameters(
            this.serverUrl,
            resourceType + '/remove/' + resourceId,
            {},
            body,
            callback
        )
    }

    /**
     * @function editResource
     * @desc Edit a resource from the offchain
     * @param {string} resourceType
     * @param {string} resourceId
     * @param {object} body
     * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
     * @return A json of the resource successfully edited, an empty json otherwise
     **/
     async editResource(resourceType, resourceId, body, callback) {
         return await http.postParameters(
             this.serverUrl,
             resourceType + '/edit/' + resourceId,
             {},
             body,
             callback
         )
     }
}

module.exports = Resources;

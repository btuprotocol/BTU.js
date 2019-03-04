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
    constructor({serverUrl, fetch}) {
        this.serverUrl = serverUrl
        this.fetch = fetch
    }

    /**
     * @function searchResources
     * @desc Get ressources of any type
     * @param {string} resourceType The type of ressource
     * @param {object} body The body containing informations of the query
     * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
     * @return The Json containing informations of the hotel
     **/
    async searchResources(resourceType, body, callback) {
        return await http.postParameters(this.serverUrl, resourceType + '/search', {}, body, callback)
    }

    /**
     * @function getRessourceInformation
     * @desc Get information for a ressource
     * @param {string} ressourceId The id of the ressources
     * @param {string} type The type of ressource
     * @param {options} Additionnal information
     * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
     * @return The Json containing information of the ressource
     **/
    async getResource(resourceType, resourceId, body, callback) {
        return await http.postParameters(this.serverUrl, resourceType + '/' + resourceId, {}, body, callback)
    }

    /**
     * @function getRessourceItemInformation
     * @desc Get information for an item
     * @param {string} ressourceId The id of the ressources
     * @param {string} type The type of ressource
     * @param {string} itemId The id of item
     * @param {options} Additionnal information
     * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
     * @return The Json containing information of the item
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
     * @param {string} type The type of ressource
     * @param {options} Additionnal information
     * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
     * @return The id of the resource
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
     * @desc Delete the resource to the offchain
     * @param {string} ressourceId The id of the ressources
     * @param {string} type The type of ressource
     * @param {options} Additionnal information
     * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
     * @return True if the resource was deleted, false otherwise
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
     * @desc Edit the resource in the offchain
     * @param {string} ressourceId The id of the ressources
     * @param {string} type The type of ressource
     * @param {options} Additionnal information
     * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
     * @return True if the resource was edited, false otherwise
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

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
     * @function getResourceDetails
     * @desc Get details for a ressource
     * @param {string} resourceId The id of the resource
     * @param {string} resourceType The type of resource
     * @param {options} Additionnal informations
     * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
     * @return The Json containing details of the resource
     **/
    async getResourceDetails(resourceId, resourceType, options, callback) {
        return await this.postParameters(resourceType + '/info', { resourceId }, options, callback)
    }

    /**
     * @function searchResources
     * @desc Get resources of a certain type
     * @param {string} searchQuery The query to retrieve resources
     * @param {string} resourceType The type of ressource
     * @param {string} searchType The filter to apply for the type of resource 
     * @param {options} Additionnal informations
     * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
     * @return The Json containing informations of the hotel
     **/
    async searchResources(searchQuery, resourceType, searchType, options, callback) {
        return await this.postParameters(resourceType + '/search', { searchQuery, searchType }, options, callback)
    }

    /**
     * @function getResourcesAroundLocation
     * @desc Get resources around a given location
     * @param {object} location Location of the research
     * @param {number} distance Max distance around location
     * @param {string} resourceType The type of ressource
     * @param {options} Additionnal informations
     * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
     * @return The Json containing informations of the resource
     **/
    async getResourcesAroundLocation(resourceType, options, callback) {
        return await this.postParameters(resourceType + '/aroundLocation', { resourceType }, options, callback)
    }

    /**
     * @function getRessourceItemInformation
     * @desc Get information for an item
     * @param {string} ressourceId The id of the ressources
     * @param {string} itemId The id of item
     * @param {options} Additionnal information
     * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
     * @return The Json containing information of the item
     **/
    async getItemDetailsForResource(resourceId, itemId, options, callback) {
        return await this.postParameters(
            '/item/info',
            {
                resourceId,
                itemId
            },
            options,
            callback
        )
    }

    /**
     * @function addResource
     * @desc Add resource to the offchain
     * @param {string} resourceType The type of ressource
     * @param {options} Additionnal information
     * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
     * @return The id of the resource
     **/
    async addResource(resourceType, options, callback) {
        return await this.postParameters(
            type + '/add',
            {
                resourceType
            },
            options,
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
    async deleteResource(ressourceId, resourceType, options, callback) {
        return await this.postParameters(
            type + '/remove',
            {
                ressourceId,
                resourceType
            },
            options,
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
    async editResource(ressourceId, type, options, callback) {
        return await this.postParameters(
            type + '/edit',
            {
                ressourceId,
                type
            },
            options,
            callback
        )
    }

    /**
     * @function getResource
     * @desc Get a resource from the offchain
     * @param {string} ressourceId The id of the ressources
     * @param {string} type The type of ressource
     * @param {options} Additionnal information
     * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
     * @return The Json of the resource, see Resources class for mor information
     **/
    async getResource(ressourceId, type, options, callback) {
        return await this.postParameters(
            type + '/get',
            {
                ressourceId,
                type
            },
            options,
            callback
        )
    }

    /**
     * @function http
     * @desc Call a HTTP request
     * @param {string} baseUrl The baseUrl of the server
     * @param {string} url The url to call
     * @param {Json} body The body of the call
     * @param {callback} successFn The callback called in case of a success
     * @param {string} method The http method
     * @return A Promise with the return of the call
     **/
    async http(baseUrl, url, body, successFn, method) {
        const response = await this.fetch(appendSlash(baseUrl) + url, {
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers: { 'content-type': 'application/json' },
            credentials: 'omit'
        })
        const json = await response.json()
        if (response.ok) {
            return successFn ? successFn(json) : json
        }
        return Promise.reject(JSON.stringify(json))
    }

    /**
     * @function post
     * @desc Call a HTTP POST request
     * @param {string} url The url to call
     * @param {Json} body The body of the call
     * @param {callback} successFn The callback called in case of a success
     * @return A Promise with the return of the call
     **/
    async post(url, body, successFn) {
        return await this.postParameters(url, undefined, body, successFn)
        // return await this.http(this.serverUrl, url, body, successFn, 'POST')
    }

    /**
     * @function post
     * @desc Call a HTTP POST request
     * @param {string} url The url to call
     * @param {Object} parameters The dictionary for key/value paramaters of the call
     * @param {Json} body The body of the call
     * @param {callback} successFn The callback called in case of a success
     * @return A Promise with the return of the call
     **/
    async postParameters(url, parameters, body, successFn) {
        let stringParams = this.stringParams(parameters)

        return await this.http(
            this.serverUrl,
            url + stringParams,
            body,
            successFn,
            'POST'
        )
    }

    /**
     * @function post
     * @desc Call a HTTP GET request
     * @param {string} url The url to call
     * @param {Object} parameters The dictionary for key/value paramaters of the call
     * @param {callback} successFn The callback called in case of a success
     * @return A Promise with the return of the call
     **/
    async get(url, parameters, successFn) {
        let stringParams = this.stringParams(parameters)

        return await this.http(
            this.serverUrl,
            url + stringParams,
            undefined,
            successFn,
            'GET'
        )
    }

    stringParams(parameters) {
        const objectKeys = Object.keys(parameters)
        let stringParams = objectKeys
            .map(key => key + '=' + parameters[key])
            .join('&')
        return (objectKeys.length === 0 ? '' : '?') + stringParams
    }
}

/**
 * @file resources.js
 * @desc This is the User class definition file
 * @module Resources
**/

const appendSlash = url => {
  return url.substr(-1) === '/' ? url : url + '/'
}


module.exports = Resources;

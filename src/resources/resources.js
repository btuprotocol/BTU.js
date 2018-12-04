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
     * @function getRessourceInformation
     * @desc Get information for a ressource
     * @param {string} ressourceId The id of the ressources
     * @param {string} type The type of ressource
     * @param {options} Additionnal information
     * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
     * @return The Json containing information of the ressource
     **/
    async getRessourceInformation(ressourceId, type, options, callback) {
        return await this.postParameters(type + '/info', { ressourceId, type }, options, callback)
    }

    /**
     * @function searchResources
     * @desc Get informations for a hotel
     * @param {string} search The hotel name search query
     * @param {string} type The type of ressource
     * @param {string} searchType The hotel name search query
     * @param {options} Additionnal informations
     * @param {callback} callback The callback called by the service, if there is not callback, the function returns a promise
     * @return The Json containing informations of the hotel
     **/
    async searchResources(search, type, searchType, options, callback) {
        return await this.postParameters(type + '/search', { type, name: search, searchType }, options, callback)
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
    async getRessourceItemInformation(ressourceId, type, itemId, options, callback) {
        return await this.postParameters(
            type + '/item/info',
            {
                ressourceId,
                type,
                itemId
            },
            options,
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
    async addResource(type, options, callback) {
        return await this.postParameters(
            type + '/add',
            {
                type
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
    async deleteResource(ressourceId, type, options, callback) {
        return await this.postParameters(
            type + '/remove',
            {
                ressourceId,
                type
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

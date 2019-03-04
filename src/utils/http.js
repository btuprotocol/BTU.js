import fetch from 'cross-fetch'

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

const http = async (baseUrl, url, body, successFn, method) => {
    const response = await fetch(appendSlash(baseUrl) + url, {
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
 * @param {string} baseUrl The baseUrl of the server
 * @param {string} url The url to call
 * @param {Json} body The body of the call
 * @param {callback} successFn The callback called in case of a success
 * @return A Promise with the return of the call
 **/

const post = async (baseUrl, url, body, successFn) => {
    return await postParameters(baseUrl, url, undefined, body, successFn)
}

/**
 * @function post
 * @desc Call a HTTP POST request
 * @param {string} baseUrl The baseUrl of the server
 * @param {string} url The url to call
 * @param {Object} parameters The dictionary for key/value paramaters of the call
 * @param {Json} body The body of the call
 * @param {callback} successFn The callback called in case of a success
 * @return A Promise with the return of the call
 **/
const postParameters = async (baseUrl, url, parameters, body, successFn) => {
    let paramsToString = stringParams(parameters)

    return await http(
        baseUrl,
        url + paramsToString,
        body,
        successFn,
        'POST'
    )
}

/**
 * @function post
 * @desc Call a HTTP GET request
 * @param {string} baseUrl The baseUrl of the server
 * @param {string} url The url to call
 * @param {Object} parameters The dictionary for key/value paramaters of the call
 * @param {callback} successFn The callback called in case of a success
 * @return A Promise with the return of the call
 **/
const getParameters = async (baseUrl, url, parameters, successFn) => {
    let paramsToString = stringParams(parameters)

    return await http(
        baseUrl,
        url + paramsToString,
        undefined,
        successFn,
        'GET'
    )
}

const stringParams = (parameters) => {
    const objectKeys = Object.keys(parameters)
    let paramsToString = objectKeys
        .map(key => key + '=' + parameters[key])
        .join('&')
    return (objectKeys.length === 0 ? '' : '?') + paramsToString
}

const appendSlash = url => {
  return url.substr(-1) === '/' ? url : url + '/'
}

module.exports = {
    post,
    postParameters,
    getParameters
}

/**
 * @file resources.js
 * @desc This is the User class definition file
 * @module Resources
**/

class Resources {

  /**
   * @constructor Resources
   * @desc Constructor for the Resources class
   * @example <caption>The JSON Schema for all the resources</caption>
   * {
   *   "title": "resource",
   *   "type": "object",
   *   "properties": {
   *     "type": {
   *       "type": "string",
   *       "description": "The type of the resource, like car/hostel/computer ..."
   *     },
   *     "rent": {
   *       "type": "boolean",
   *       "description": "Is the resource rentable ?",
   *       "default": "true"
   *     },
   *     "name": {
   *       "type": "string",
   *       "description": "The name of the resource"
   *     },
   *     "price": {
   *       "type": "number",
   *       "description": "The price for the resource"
   *     },
   *     "priceDuration": {
   *       "type": "string",
   *       "description": "The duration for the price if the resource is rentable, like hour/day/mounth",
   *       "default": "day"
   *     }
   *   },
   *   "required": ["type", "price"]
   * }
  **/
  constructor() {
  }

  /**
   * @function addResource
   * @desc Add resource to the offchain
   * @param {Json} resource The information about the resource to add, see Resources class for mor information
   * @return The id of the resource
   **/
  addResource(resource) {
    console.log(resource);
    return null;
  }

  /**
   * @function deleteResource
   * @desc Delete the resource to the offchain
   * @param {number} id The id of the resource to delete
   * @return True if the resource was deleted, false otherwise
   **/
  deleteResource(id) {
    console.log(id);
    return null;
  }

  /**
   * @function editResource
   * @desc Edit the resource in the offchain
   * @param {number} id The id of the resource to edit
   * @param {Json} resource The information about the resource to add, see Resources class for mor information
   * @return True if the resource was edited, false otherwise
   **/
  editResource(id, resource) {
    console.log(id);
    console.log(resource);
    return null;
  }

  /**
   * @function getResource
   * @desc Get a resource from the offchain
   * @param {number} id The id of the resource to get
   * @return The Json of the resource, see Resources class for mor information
   **/
  getResource(id) {
    console.log(id);
    return null;
  }
}


module.exports = Resources;

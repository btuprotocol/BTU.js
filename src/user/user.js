/**
 * @file user.js
 * @desc This is the User class definition file
 * @module User
**/


class User {

  /**
   * @constructor User
   * @desc Constructor for the User class
  **/
  constructor() {
  }

  /**
   * @function addUser
   * @desc Add or edit an user to the offchain, if you provide additional information
   * trough the Json object you must sign it and provide the signature to this function.
   * @param {String} ethAdress The eth adress of the user
   * @param {String} [sign] The signature of the JSON Object
   * @param {Json} [option] Additional info of the user
   * @return True or error message
   * @example <caption>The JSON Schema for the option</caption>
   * {
   *   "title": "user_option",
   *   "type": "object",
   *   "properties": {
   *     "firstName" : {
   *       "type": "string"
   *     },
   *     "lastName": {
   *       "type": "string"
   *     },
   *     "age": {
   *       "type": "number",
   *       "minimum": 0
   *     },
   *     "sexe": {
   *       "type": "string"
   *     },
   *     "date-of-birth": {
   *       "type": "string"
   *     },
   *     "username": {
   *       "type": "string"
   *     },
   *     "email": {
   *       "type": "string"
   *     },
   *     "countryCode": {
   *       "type": "string"
   *     },
   *     "phone": {
   *       "type": "string"
   *     },
   *     "zipCode": {
   *       "type": "string"
   *     }
   *   }
   * }
   **/
  addUser(ethAdress, ...option) {
    // Code if the user pass JSON option
    if (option.length === 0) {
      return 'You must provide a JSON with a signature';
    }
    if (option.length > 1) {
      sign = option[0];
      json_object = option[1];
    }
    console.log(ethAdress);
    return null;
  }


  /**
   * @function getUser
   * @desc Get information of an user
   * @param {String} ethAdress The eth adress of the user
   * @return False if the user is not found or a JSON with the information
   * @example <caption>The JSON Schema for the user</caption>
   * {
   *   "title": "user",
   *   "type": "object",
   *   "properties": {
   *     "firstName" : {
   *       "type": "string"
   *     },
   *     "lastName": {
   *       "type": "string"
   *     },
   *     "age": {
   *       "type": "number",
   *       "minimum": 0
   *     },
   *     "sexe": {
   *       "type": "string"
   *     },
   *     "date-of-birth": {
   *       "type": "string"
   *     },
   *     "username": {
   *       "type": "string"
   *     },
   *     "email": {
   *       "type": "string"
   *     },
   *     "countryCode": {
   *       "type": "string"
   *     },
   *     "phone": {
   *       "type": "string"
   *     },
   *     "zipCode": {
   *       "type": "string"
   *     }
   *   }
   * }
   **/
  getUser(ethAdress) {
    console.log(ethAdress);
    return null;
  }

  /**
   * @function requestVerification
   * @desc Send a code to an user to verify it
   * @param {String} ethAdress The eth adress of the user
   * @param {String} type The type of the verification, can be "sms" or "email"
   * @param {Json} [verif] Json for additional information to verify
   * @return True if the code was sent to the user, or an error message otherwise.
   * @example <caption>The JSON Schema for the verif</caption>
   * {
   *   "title": "verif",
   *   "type": "object",
   *   "properties": {
   *     "message" : {
   *       "type": "string",
   *       "description": "personalized message to send at the user"
   *     }
   *   }
   * }
   **/
  requestVerification(ethAdress, type, ...verif) {
    console.log(ethAdress);
    return null;
  }

  /**
   * @function submitVerification
   * @desc Send a code to an user to verify it
   * @param {String} ethAdress The eth adress of the user
   * @param {String} type The type of the verification, can be "sms" or "email"
   * @param {String} code The code that the we verify ou our side
   * @return True if the user have been verified, false otherwise
   * }
   **/
  submitVerification(ethAdress, type, code) {
    console.log(ethAdress);
    return null;
  }
}


module.exports = User;

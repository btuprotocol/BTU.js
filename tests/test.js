var Btujs = require('../src/index.js');

var btujs = new Btujs();

// Promise
btujs.resources.getHotelInformations('AMDLWPAR008').then(json => console.log(json)).catch(err => console.log(err))

// Callback
btujs.resources.getHotelInformations('AMDLWPAR008', function(json) {
	console.log(json)
})

var Btujs = require('../src/index.js');

var btujs = new Btujs();

// Promise
btujs.resources.getHotelInformations('AMDLWPAR008').then(json => console.log(json)).catch(err => console.log(err))

// Callback
btujs.resources.getHotelInformations('AMDLWPAR008', function(json) {
	console.log(json)
})


btujs.agenda.getAvailableRooms('AMDLWPAR008', '2018-12-01', '2018-12-03').then(json => console.log(json)).catch(err => console.log(err))

btujs.agenda.getAvailableRooms('AMDLWPAR008', '2018-12-01', '2018-12-03', function(json) {
	console.log(json)
});
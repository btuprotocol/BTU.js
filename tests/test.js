var BTUjs = require('../src/index.js');

var btujs = new BTUjs();

// Promise
//btujs.resources.getHotelInformations('AMDLWPAR008').then(json => console.log(json)).catch(err => console.log(err))

// Callback
btujs.resources.getHotelInformations('AMDLWPAR008', function(json) {
	console.log(json)
})

/*
btujs.agenda.getAvailableRooms('AMDLWPAR008', '2018-12-01', '2018-12-03').then(json => console.log(json)).catch(err => console.log(err))


btujs.resources.getRoomInformations('AMDLWPAR008', 'BOC304806/30480602_97855825_0_1_0-NB', '2018-12-01', '2018-12-03').then(json => console.log(json)).catch(err => console.log(err))

btujs.agenda.getReservationInformations('GPQLMU_0000').then(json => console.log(json)).catch(err => console.log(err))

btujs.agenda.cancelReservation('GPQLMU_0000').then(json => console.log(json)).catch(err => console.log(err))
*/

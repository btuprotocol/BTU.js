var BTUjs = require('../src/index.js');

var btujs = new BTUjs();

var options = new Object();
options.hotelCode = 'AMDLWPAR008';
var roomCode = 'BOC1568729/156872907_115270104_2_2_0-NB'


//btujs.resources.getRessourceInformation('', 'hotel', options).then(json => console.log(json)).catch(err => console.log(err))

//btujs.agenda.getAvailableRessources('', 'hotel', '2019-05-05', '2019-05-06', options).then(json => console.log(json)).catch(err => console.log(err))

//btujs.agenda.getReservationInformation('GPQLMU_0000', 'hotel').then(json => console.log(json)).catch(err => console.log(err))
/*
options.firstName = 'toto'
options.lastName = 'titi'
options.phone = '+330644'
options.cardNumber = '444'
options.cardUser = 'xxxxx'
options.ccCode = 'AX'
options.ccv = '1234'
options.email = 'toto@gmail.com'
options.expireDate = '1218'

btujs.agenda.requestReservation('', 'hotel', roomCode,
                                '2018-11-24', '2018-11-25', options).then(json => console.log(json)).catch(err => console.log(err))
*/

//btujs.agenda.cancelReservation('GPQLMU_0000', 'hotel').then(json => console.log(json)).catch(err => console.log(err))
/*
options.dateA = '2019-05-05'
options.dateB = '2019-05-06'
btujs.resources.getRessourceItemInformation('', 'hotel', roomCode, options).then(json => console.log(json)).catch(err => console.log(err))
*/

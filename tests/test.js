/*
var BTUjs = require('../src/index.js');

var btujs = new BTUjs();

var options = new Object();
options.hotelCode = 'AMDLWPAR008';
var roomCode = 'BOC1568729/156872907_115270104_2_2_0-NB'


btujs.resources.getRessourceInformation('', 'hotel', options).then((json) => {console.log(json)}).catch((err) => {console.log(err)})
*/
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

// ================= FULL EXAMPLE ====================
var BTUjs = require('../src/index.js');

var btujs = new BTUjs();

var options = new Object();
/*
// GET a list of hotels for the city Paris.
btujs.resources.searchResources('Paris', 'hotel', 'city', options).then((response) => {
  // GET the first hotel of the list.
  var hotel = response.res[0];
  // log basics hotel information.
  console.log(hotel)

  // Pass the hotelCode to the options.
  options.hotelCode = hotel.hotelCode;
  // Get more information on the hotel, you should pass the hotelCode to the options before
  // Here the first argument is the resource Id, not yet usefull for the type hotel.
  btujs.resources.getRessourceInformation('', "hotel", options).then((response) => {
    console.log(response);
  }).catch((err) => {
    console.log(err);
  });
}).catch((err) => {console.log(err)});
*/
/*
// Assume that you already get the hotelCode.
options.hotelCode = 'AMDRTPARPIT';

// Defines two dates for the research.
var dateA = '2019-01-12';
var dateB = '2019-01-13';

// GET all the items (here rooms) available between two dates.
btujs.agenda.getAvailableRessources('', 'hotel', dateA, dateB, options).then((response) => {
  // Get basics information on a room available during this periode.
  var items = response.roomAllInfo[0];
  console.log(items);

  var itemId = items.id;

  options.dateA = dateA;
  options.dateB = dateB;

  // GET more information on this room for these dates.
  btujs.resources.getRessourceItemInformation('', 'hotel', itemId, options).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  })
}).catch((error) => {
  console.log(error);
});
*/
/*
// Assume that you already get the hotelCode and the itemId.
options.hotelCode = 'AMDRTPARPIT';
var itemId = 'AMDRTPARPIT/C1D/R9N/C1DR9N';

// Defines two dates for the request.
var dateA = '2019-01-12';
var dateB = '2019-01-13';

//Set information for the prepaid or the payment.
options.firstName = 'firstName'
options.lastName = 'lstName'
options.phone = '+330644'
options.cardNumber = '444'
options.cardUser = 'xxxxx'
options.ccCode = 'AX'
options.ccv = '1234'
options.email = 'user@gmail.com'
options.expireDate = '1218'

// Request a reservation for an item between two dates.
btujs.agenda.requestReservation('', 'hotel', itemId, dateA, dateB,options).then((res) => {
  console.log(res)
}).catch((err) => {
  console.log(err)
})
*/

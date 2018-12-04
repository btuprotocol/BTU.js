# BTUjs

BTUjs is a javascript library that interacts with BTU Protocol. It allows any developer to build a booking application or a widget.

## How to add BTUjs in your project

### As a node package

```
npm install btujs --save
```

## Usage example

### Initialization of BTUjs

```javascript
var BTUjs = require('btujs')

var btujs = new BTUjs();
```
For almost each function call to resources or agenda module you will need to pass the type of the resource. Moreover, each function take a JSON object ```options``` which contains additionnal information such as the language of the response. Only ```fr``` and ```en``` are supported for the moment, default is ```en```. All function are asynchronous and can take a callback at the last argument or return a promise to call ```.then()``` and ```.catch()```.

### Hotel example

First to get information about an hotel you will need the hotelCode. In order to retrieve this code you can use the function
*searchResources* defined in the module *resources*.

```searchResources(search, type, searchType, options)```

The ```search``` argument is what you search, the ```type``` is the type of the resource, here it's ```hotel```.
Next you must specified the ```searchType```, for hotel it can be ```hotel``` or ```city```.
The response ```res``` is a list of hotels. Each of hotel object have some properties such as ```name, hotelCode, position, stars, address, descriptionEN or descriptionFR, ...```

You can next do a research on this resource whith the ```hotelCode``` and get more information.

```getRessourceInformation(ressourceId, type, options)```

Here the ```type``` is the same as before and options must now contains the ```hotelCode```.
The ```ressourceId``` is not necessary for the hotels request, you can pass an empty string.
The response contain more information such as ```hotelName, chainHotelName, stars, hotelDesc, CityName, Address, emailm phone, picturesDescription (a list of the hotel pictures), ...```

```javascript
var BTUjs = require('btujs');

var btujs = new BTUjs();

var options = new Object();
// GET a list of hotels for the city Paris.
btujs.resources.searchResources('Paris', 'hotel', 'city', options).then((response) => {
  // GET the first hotel of the list.
  var hotel = response.res[0];
  // log basics hotel information.
  console.log(hotel)

  // Pass the hotelCode to the options.
  options.hotelCode = hotel.hotelCode;
  // Get more information on the hotel, you should pass the hotelCode to the options before
  btujs.resources.getRessourceInformation('', "hotel", options).then((res) => {
    console.log(res);
  }).catch((error) => {
    console.log(error);
  });
}).catch((err) => {console.log(err)});                                                                       
```
Next, you can retrieve avaibility for a resource and get more information on this availability or on the item.
In order to to that you have to use ```getAvailableRessources(ressourceId, type, startDate, endDate, options)``` defined in the module *agenda*.
Again the ```ressourceId``` is not needed for the hotel type but you need to pass the ```hotelCode``` trough the ```options``` object. ```startDate and endDate``` represents the two dates between you want to get the avaibilities.
This function returns a ```roomAllInfo``` list fot the hotel type which contains list of rooms available, each room have bascis information such as ```id, price, and booleans for breakfast, lunch and dinner```.

Next you can retrieve more information on the room with the function ```getRessourceItemInformation(ressourceId, type, itemId, options)``` defined in *resources*.
Here the ```itemId``` is the id of the item, here it's the id of the hotel room. This function return the same data structure as ```getAvailableRessources``` but with fields non null or undefined like ```name, options, conditions, desc```.

```javascript

// Assume that you already get the hotelCode.
options.hotelCode = 'HOTELCODE';

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
```

The ```date``` fields are at the format **YYYY-MM-DD**.

The final step you can do is to reserve the item. You will need the ```requestReservation(ressourceId, type, itemId, startDate, endDate, options``` function defined in *agenda*. Be carrefull, this function needs some additionnal information in options for the payment if it's needed like for the hotel type. You will see in the example bellow the fields for options needed by the type hotel.
This function returns information about reservation and in the ```resParse``` field, a list of ids of the reservation with their provider.

```javascript
// Assume that you already get the hotelCode and the itemId.
options.hotelCode = 'HOTELCODE';
var itemId = 'ITEMID';

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
  console.log(res);
  // res.resParse contain ids of the reservation
  var resIds = res.resParse;
  console.log(resIds);
}).catch((err) => {
  console.log(err);
})
```
You can also cancel a reservation with ```cancelReservation(reservationId, type, options)``` where ```reservationId``` is the ids of the provider *CDS* and the ```type``` is like above the type of the resource, here it's ```hotel```.

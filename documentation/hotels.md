# BTU.JS for Hotels

BTU.JS is a javascript library that interacts with BTU Protocol. It allows any developer to build a booking application or a widget.

This is the documentation for the hotels module. Click [here](../README.md) to go back to the global documentation.

  - [Getting started](#getting-started)
    - [Install BTU.JS](#install-btujs)
    - [Instantiate BTU.JS](#instantiate-btujs)
    - [Usage exemple](#usage-exemple)
  - [Resources methods](#resources-methods)
    - [**searchResources**](#searchresources)
    - [**getResource**](#getresource)
  - [Availabilities methods](#availabilities-methods)
    - [**searchAvailableResources**](#searchavailableresources)
    - [**getResourceAvailabilities**](#getresourceavailabilities)
    - [**isRessourceAvailable**](#isresourceavailable)
    - [**bookResource**](#bookresource)
    - [**getBookingDetails**](#getbookingdetails)
    - [**cancelBooking**](#cancelbooking)
  - [Data structures](#data-structures)
    - [hotel](#hotel)
    - [places](#places)
    - [rooms](#rooms)

## Getting started

### Install BTU.JS

```
npm install btujs --save
```

---

### Instantiate BTU.JS

```javascript
const btujs = require('btujs');

const myBtujs = new btujs();
```

---

## Resources methods

### **searchResources()**

Search for hotels. There are three possible ways of searching for a hotel depending on the searchType parameter :

- 'query' search that returns a list of cities and hotels corresponding to the query given in parameter. (Useful for a search bar)

- 'location' search that returns a list of hotel for a certain location (coordinates) and guest related parameters.

- 'cities' search that returns a list of hotel for an array of coordinates (Usefull for city samples).

#### Prototype
```javascript
  myBtujs.resources.searchResources(String resourceType, Object body, Function callback)
```

#### Parameters

- **resourceType**: the type of resource you are looking for, here you will pass 'hotel'.
- **body**:
  - Query

      | parameter                  | mandatory                      | description                             |
      |----------------------------|--------------------------------|-----------------------------------------|
      | searchType                 | `true`                         | `String` type of search ('query')       |
      | options.searchQuery        | `true`                         | `String` name you want to lookup        |

  - Location

      | parameter                  | mandatory                      | description                                                 |
      |----------------------------|--------------------------------|-------------------------------------------------------------|
      | searchType                 | `true`                         | `String` type of search ('location')                        |
      | startDate                  | `true`                         | `String` start of trip ('YYYY-MM-DD')                       |
      | endDate                    | `true`                         | `String` end of trip ('YYYY-MM-DD')                         |
      | guest                      | `true`                         | `Integer` number of guests                                  |
      | options.location.longitude | `true`                         | `Float` longitude of center of look-up zone                 |
      | options.location.latitude  | `true`                         | `Float` latitude of center of look-up zone                  |
      | options.countryCode        | `false`                        | `String` use this to limit results to a certain country ¹   |
      | options.byDistance         | `false`                        | `Boolean` sort by distance (closest first)                  |
      | options.byParking          | `false`                        | `Boolean` filter out results without free or paying parking |
      | options.byBreakfast        | `false`                        | `Boolean` filter out results without a breakfast option     |
      | options.byMaxStars         | `false`                        | `Integer` filter out results with a superior star number    |
      | options.byMaxDistance      | `false`                        | `Integer` filter out results further from distance          |
      | options.byMaxPrice         | `false`                        | `Float` filter out results more expensive than value        |
      | pageSize                   | `false`                        | `Integer` number of elements per page (default 100)         |
    ¹ Case non sensitive two character string (ex. "FR", "UK"...), can be obtained from the query search.

  - Cities

      | parameter                  | mandatory                      | description                                         |
      |----------------------------|--------------------------------|-----------------------------------------------------|
      | searchType                 | `true`                         | `String` type of search ('location')                |
      | options.coordArray         | `true`                         | `Array` coordinates for finding near-by hotels
      | options.coordArray[].lat   | `true`                         | `Float` latitude of point
      | options.coordArray[].lon   | `true`                         | `Float` longitude of point


- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

    If not given, the function will create a promise.

#### Call exemple

```javascript
    let body = { ... }
    BtuJs.resources.searchResources('hotel', body).then(res => {...})
```

#### Response

- Query

  ```javascript
    {
      places: [
        place_object
        place_object
        ...
      ],
      hotels: [
        hotel_object
        hotel_object
        ...
      ]
    }
  ```

- Location

    ```javascript
    {
      nbFound: 179,
      currentPage: 1,
      totalPages: 1,
      hotels: [
        hotel_object
        hotel_object
        ...
      ]
    }
    ```

- Cities

    ```javascript
    { 
    // The array's first dimension represents the different points asked (same order)
    // The second is a list of hotel near this point (max ~10km)
      [
        [
          hotel_object,
          hotel_object,
          ...
        ],
        [
          hotel_object,
          hotel_object,
          ...
        ],
        ...
      ]
    }
    ```

---

### **getResource()**

Query resource by its ID to get its details.

#### Prototype
```javascript
  myBtujs.resources.getResource(String resourceType, String resourceId, Object body, Function callback)
```

#### Parameters

- **resourceType**: the type of resource you are looking for, here you will pass 'hotel'.
- **resourceId**: resource unique identifier.
- **body**: none.
- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

  If not given, the function will create a promise.

#### Call exemple

```javascript
    let body = { ... }
    BtuJs.resources.getResource('hotel', 'XP23AB2', body).then(res => {...})
```

#### Response

```javascript
  hotelDesc_object //The requested hotel
```

---

## Availabilities methods

### **getResourceAvailabilities()**

Query a resource by its ID and get its availabilities.

#### Prototype
```javascript
  myBtujs.availabilities.getResourceAvailabilities(String resourceType, String resourceId, Object body, Function callback)
```

#### Parameters

- **resourceType**: the type of resource you are looking for, here you will pass 'hotel'.
- **resourceId**: resource unique identifier.
- **body**:

  | parameter                  | mandatory                      | description                                        |
  |----------------------------|--------------------------------|----------------------------------------------------|
  | startDate                  | `true`                         | `String` start of trip ('YYYY-MM-DD')              |
  | endDate                    | `true`                         | `String` end of trip ('YYYY-MM-DD')                |
  | guest                      | `true`                         | `Integer` number of guests                         |

- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

    If not given, the function will create a promise.

#### Call exemple

```javascript
    let body = { ... }
    BtuJs.availabilities.getResourceAvailabilities('hotel', '45327394', body).then(res => {...})
```

#### Response

```javascript
  {
    count: 20,
    rooms: [
      room_object,
      room_object
      ...
    ]
  }
```

---

### **isResourceAvailable()**

Check if a resource is available under different conditions.

#### Prototype
```javascript
  myBtujs.availabilities.isResourceAvailable(String resourceType, String resourceId, Object body, Function callback)
```

#### Parameters

- **resourceType**: the type of resource you are looking for, here you will pass 'hotel'.
- **resourceId**: resource unique identifier.
- **body**:

  | parameter                  | mandatory                      | description                                                      |
  |----------------------------|--------------------------------|------------------------------------------------------------------|
  | startDate                  | `true`                         | `String` start of trip ('YYYY-MM-DD')                            |
  | endDate                    | `true`                         | `String` end of trip ('YYYY-MM-DD')                              |
  | guest                      | `true`                         | `Integer` number of guests                                       |
  | roomCode                   | `true`                         | `String` room code (can be found from getAvailibilities)         |

- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

    If not given, the function will create a promise.

#### Call exemple

```javascript
    let body = { ... }
    BtuJs.availabilities.isResourceAvailabilities('hotel', '45327394', body).then(res => {...})
```

#### Response

```javascript
  {
    isAvailable: true // or false
  }
```

---

### **bookResource()**

Book a resource availability.

#### Prototype
```javascript
  myBtujs.availabilities.bookResource(String resourceType, String resourceId, Object body, Function callback)
```

#### Parameters

- **resourceType**: the type of resource you are looking for, here you will pass 'hotel'.
- **resourceId**: resource unique identifier.
- **body**:

  | parameter                  | mandatory                      | description                               |
  |----------------------------|--------------------------------|-------------------------------------------|
  | roomCode                   | `true`                         | `[String]` room(s) identity code(s)       |
  | rateCode                   | `true`                         | `[String]` rate(s) chosen                 |
  | amountTax                  | `true`                         | `[String]` price(s) of chosen room(s)     |
  | fromDate                   | `true`                         | `String` day of arrival (YYYY-MM-DD)      |
  | endDate                    | `true`                         | `String` day of departure (YYYY-MM-DD)    |
  | cardCode                   | `true`                         | `String` card code                        |
  | cardNumber                 | `true`                         | `String` card number                      |
  | expireDate                 | `true`                         | `String` card expire date                 |
  | cvv                        | `true`                         | `String` card security code               |
  | nameCard                   | `true`                         | `String` name of card owner               |
  | chainCode                  | `true`                         | `String` hotel chain code                 |
  | hotelCode                  | `true`                         | `String` hotel code                       |
  | roomQuantities             | `true`                         | `Integer` room quantities                 |
  | numberGuest                | `true`                         | `Integer` number of guests                |
  | lastName                   | `true`                         | `[String]` lastnames of guests per room   |
  | firstName                  | `true`                         | `[String]` firstnames of guests per room  |
  | phoneNumber                | `true`                         | `[String]` phone Nb. of guests per room   |
  | email                      | `true`                         | `[String]` email of guests per room       |

- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

    If not given, the function will create a promise.

#### Call exemple

```javascript
    let body = { ... }
    BtuJs.availabilities.bookResource('hotel', '45327394', body).then(res => {...})
```

---

### **getBookingDetails()**

Get informations about a booking you made.

#### Prototype
```javascript
  myBtujs.availabilities.getBookingDetails(String resourceType, String bookingId, Object body, Function callback)
```

#### Parameters

- **resourceType**: the type of resource you are looking for, here you will pass 'hotel'.
- **bookingId**: resource unique identifier.
- **body**: none.
- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

    If not given, the function will create a promise.

#### Call exemple

```javascript
    let body = { ... }
    BtuJs.availabilities.getBookingDetails('hotel', '45327394', body).then(res => {...})
```

---

### **cancelBooking()**

Cancel a reservation you booked through the bookResource method.

#### Prototype
```javascript
  myBtujs.availabilities.cancelBooking(String resourceType, String bookingId, Object body, Function callback)
```

#### Parameters

- **resourceType**: the type of resource you are looking for, here you will pass 'hotel'.
- **bookingId**: resource unique identifier.
- **body**: none.
- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

    If not given, the function will create a promise.

#### Call exemple

```javascript
    let body = { ... }
    BtuJs.availabilities.cancelBooking('hotel', '45327394', body).then(res => {...})
```

## Data structures

### hotel

  | field                      | description                                               |
  |----------------------------|-----------------------------------------------------------|
  | id                         | `Integer` hotel id                                        |
  | code                       | `String` hotel code                                       |
  | name                       | `String` hotel name                                       |
  | image                      | `String` hotel main image url                             |
  | stars                      | `Integer` hotel stars count                               |
  | latitude                   | `String` hotel position latitude                          |
  | longitude                  | `String` hotel position longitude                         |
  | minRate                    | `String` hotel minimum rate                               |
  | details                    | `String` hotel amenities                                  |
  | rooms                      | `[room_object]` hotel available rooms                     |

### places

  | field                      | description                             |
  |----------------------------|-----------------------------------------|
  | country                    | `String` country name of proposition    |
  | countryCode                | `String` country short code             |
  | defaultName                | `String` name found for query           |
  | region                     | `String` region name of proposition     |
  | location.lat               | `Float` latitude of proposition         |
  | location.lon               | `Float` longitude of proposition        |

### hotel description

  | field                      | description                             |
  |----------------------------|-----------------------------------------|
  | name                       | `String` name of hotel                  |
  | hotelCode                  | `String` hotel code                     |
  | address                    | `String` hotel address                  |
  | city                       | `String` hotel city's name              |
  | zipCode                    | `String` hotel zip code                 |
  | phone                      | `String` hotel phone number             |
  | email                      | `String` hotel mail contact             |
  | starRating                 | `Integer` number of stars               |
  | countryCode                | `String` country short code             |
  | countryName                | `String` country name                   |
  | chainName                  | `String` name of hotel chain            |
  | defaultImage               | `String` default image url              |
  | images                     | `[String]` other image's urls           |
  | frDesc                     | `String` French description             |
  | enDesc                     | `String` English description            |
  | location.latitude          | `Float` coordinate of hotel             |
  | location.longitude         | `Float` coordinate of hotel             |
  | services                   | `Object` list of services (see below)   |
  | services[].en              | `String` name of service in English     |
  | services[].fr              | `String` name of service in French      |

### room

  | field                      | description                             |
  |----------------------------|-----------------------------------------|
  | roomCode                   | `String` room code (for booking)        |
  | maxOccupancy               | `Integer` room's max occupancy          |
  | rateQuantity               | `Integer` quantity of this rate         |
  | rateCode                   | `String` rate's code                    |
  | ratePrice                  | `Float` price for this rate             |
  | taxPrice                   | `Float` tax price                       |
  | rateMealPrice              | `Float` breakfast price                 |
  | roomPrice                  | `Float` price of this room              |
  | currencyCode               | `String` currency code                  |
  | rateName                   | `String` name of this rate              |
  | rateInformations           | `[String]` informations about this rate |
  | features                   | `[String]` rate's features              |
  | cancelPenalty              | `[String]` cancel penalties informations|
  | hasBreakFastInc            | `Boolean` is breakfast included         |
  | hasLunchInc                | `Boolean` is lunch included             |
  | hasDinnerInc               | `Boolean` is dinner included            |
  | rateTax                    | `Float` tax for this rate               |
  | rateCancelPolicy           | `String` rate's cancelling policy       |
  | isNegotiatedRate           | `Boolean` is this rate negotiated       |
  | isCreditCardNeeded         | `Boolean` is your credit card needed    |
  | isCancellable              | `Boolean` is this rate cancellable      |
  | isTaxIncluded              | `Boolean` is the tax included in price  |
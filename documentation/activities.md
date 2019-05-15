# BTU.JS for Activities

BTU.JS is a javascript library that interacts with BTU Protocol. It allows any developer to build a booking application or a widget.

This is the documentation for the activities module. Click [here](../README.md) to go back to the global documentation.

  - [Getting started](#getting-started)
    - [Install BTU.JS](#install-btujs)
    - [Instantiate BTU.JS](#instantiate-btujs)
    - [Usage exemple](#usage-exemple)
  - [Resources methods](#resources-methods)
    - [**searchResources**](#searchresources)
    - [**getResource**](#getresource)
    - [**getResourceItem**](#getresourceitem)
  - [Availabilities methods](#availabilities-methods)
    - [**searchAvailableResources**](#searchavailableresources)
    - [**getResourceAvailabilities**](#getresourceavailabilities)
    - [**isRessourceAvailable**](#isresourceavailable)
    - [**bookResource**](#bookresource)
    - [**getBookingDetails**](#getbookingdetails)
    - [**cancelBooking**](#cancelbooking)
  - [Data structures](#data-structures)
    - [activity](#activity)
    - [fare](#fare)
    - [participants](#participants)
    - [checkout](#checkout)
    - [bookActivity](#bookActivity)
    - [personalInformations](#personalInformations)
    - [pickup](#pickup)

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

Search for resources regardless of their availabilities.

#### Prototype
```javascript
  myBtujs.resources.searchResources(String resourceType, Object body, Function callback)
```

#### Parameters

- **resourceType**: the type of resource you are looking for, here you will pass 'activity'.
- **body**:

  | parameter                  | mandatory                      | description                             |
  |----------------------------|--------------------------------|-----------------------------------------|
  | options.categoryIds        | `true`                         | `Array` ids of wanted activties         |
  | options.maxCount           | `false` (default = 5)          | `Array` max results count               |

- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

    If not given, the function will create a promise.

#### Call exemple

```javascript
    let body = { ... }
    BtuJs.resources.searchResources('activity', body).then(res => {...})
```

#### Response

```javascript
  {
    activities: [
      activity_object, // Activity matching the requested categoryIds
      activity_object,
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

- **resourceType**: the type of resource you are looking for, here you will pass 'activity'.
- **resourceId**: resource unique identifier.
- **body**: none.
- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

    If not given, the function will create a promise.

#### Call exemple

```javascript
    let body = { ... }
    BtuJs.resources.getResource('activity', body).then(res => {...})
```

#### Response

```javascript
  activity_object //The requested activity
```

---

### **getResourceItem()**

Query resource by its ID and its sub-item ID to get sub-item details.

#### Prototype
```javascript
  myBtujs.resource.getResourceItem(String resourceType, String resourceId, String itemId, Object body, Function callback)
```

#### Parameters

- **resourceType**: the type of resource you are looking for, here you will pass 'activity'.
- **resourceId**: resource unique identifier.
- **itemId**: item unique identifier.
- **body**: none.
- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

    If not given, the function will create a promise.

#### Call exemple

```javascript
    let body = { ... }
    BtuJs.resources.getResourceItem('activity', 'ABCDEF', body).then(res => {...})
```

---

## Availabilities methods

### **searchAvailableResources()**

Search for availables resources only.

#### Prototype
```javascript
  myBtujs.availabilities.searchAvailableResources(String resourceType, Object body, Function callback)
```

#### Parameters

- **resourceType**: the type of resource you are looking for, here you will pass 'activity'.
- **body**:

  | parameter                  | mandatory                      | description                                |
  |----------------------------|--------------------------------|--------------------------------------------|
  | options.query              | `true`                         | `String` search query (ex: activity name)  |
  | options.categoryId         | `false`                        | `String` filter with a category id         |
  | options.fromDate           | `false`                        | `String` filter from start date            |
  | options.partipantsNumber   | `false`                        | `Number` filter with participant a count   |

- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

    If not given, the function will create a promise.

#### Call exemple

```javascript
    let body = { ... }
    BtuJs.availabilities.searchAvailableResources('activity', body).then(res => {...})
```

#### Response

```javascript
  {
    count: 5,          // Results count
    activities: [
      activity_object, // Activity matching the request
      activity_object,
      ...
    ]
  }
```

---

### **getResourceAvailabilities()**

Query a resource by its ID and get its availabilities.

#### Prototype
```javascript
  myBtujs.availabilities.getResourceAvailabilities(String resourceType, String resourceId, Object body, Function callback)
```

#### Parameters

- **resourceType**: the type of resource you are looking for, here you will pass 'activity'.
- **resourceId**: resource unique identifier.
- **body**:

  | parameter                  | mandatory                      | description                             |
  |----------------------------|--------------------------------|-----------------------------------------|
  | fromDate                   | `true`                         | `Date` search after this date           |
  | partipantsNumber           | `true`                         | `Number` participaant count             |

- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

    If not given, the function will create a promise.

#### Call exemple

```javascript
    let body = { ... }
    BtuJs.availabilities.getResourceAvailabilities('activity', 'ABCDEF', body).then(res => {...})
```

#### Response

```javascript
  {
    sessionId: "skdfhqwuifq;wuefqweoifqwuiefgqwueif",          // Required later for booking
    availabilities: [
      availabilities_object, // Availability matching the request
      availabilities_object,
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

- **resourceType**: the type of resource you are looking for, here you will pass 'activity'.
- **resourceId**: resource unique identifier.
- **body**:

  | parameter                  | mandatory                      | description                                                      |
  |----------------------------|--------------------------------|------------------------------------------------------------------|
  | sessionId                  | `true`                         | `String` session id from a previous gerResourceAvailability call |
  | departureDate              | `true`                         | `String` chosen date (format : AAAA-MM-DD)                       |
  | fares                      | `true`                         | `Object` chosen availabilities                                   |

- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

    If not given, the function will create a promise.

#### Call exemple

```javascript
    let body = { ... }
    BtuJs.availabilities.isResourceAvailable('activity', 'ABCDEF', body).then(res => {...})
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

- **resourceType**: the type of resource you are looking for, here you will pass 'activity'.
- **resourceId**: resource unique identifier.
- **body**:

  | parameter                  | mandatory                      | description                             |
  |----------------------------|--------------------------------|-----------------------------------------|
  | checkout                   | `true`                         | `Object` payment informations           |
  | bookActivity               | `true`                         | `Object` reservation informations       |
  | personalInformations       | `true`                         | `Object` booker personal informations   |
  | piuckup                    | `false`                        | `Object` activity pickup informations   |

- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

    If not given, the function will create a promise.


#### Call exemple

```javascript
    let body = { ... }
    BtuJs.availabilities.bookResource('activity', 'ABCDEF', body).then(res => {...})
```

---

### **getBookingDetails()**

Get informations about a booking you made.

#### Prototype
```javascript
  myBtujs.availabilities.getBookingDetails(String resourceType, String bookingId, Object body, Function callback)
```

#### Parameters

- **resourceType**: the type of resource you are looking for, here you will pass 'activity'.
- **bookingId**: resource unique identifier.
- **body**: none.
- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

    If not given, the function will create a promise.

#### Call exemple

```javascript
    let body = { ... }
    BtuJs.availabilities.getBookingDetails('activity', 'ABCDEF', body).then(res => {...})
```

---

### **cancelBooking()**

Cancel a reservation you booked through the bookResource method.

#### Prototype
```javascript
  myBtujs.availabilities.cancelBooking(String resourceType, String bookingId, Object body, Function callback)
```

#### Parameters

- **resourceType**: the type of resource you are looking for, here you will pass 'activity'.
- **bookingId**: resource unique identifier.
- **body**: none.
- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

    If not given, the function will create a promise.

#### Call exemple

```javascript
    let body = { ... }
    BtuJs.availabilities.cancelBooking('activity', 'ABCDEF', body).then(res => {...})
```

## Data structures

### activity

  | parameter                  | mandatory | description                                               |
  |----------------------------|-----------|-----------------------------------------------------------|
  | id                         | `true`    | `String` activity id                                      |
  | fromPrice                  | `true`    | `Number` cheapest price this year                         |
  | language                   | `true`    | `Array` supported languages for this activity             |
  | pickupRequired             | `true`    | `Boolean` is pickup information required for booking      |
  | cheapest                   | `true`    | `Object` currency and cheappest price for the activity    |
  | paxNamesRequired           | `true`    | `Boolean` are pax informations required for booking       |
  | pickup                     | `true`    | `Object` information about start and end of the activity  |
  | cityCode                   | `true`    | `String` activity city code                               |
  | categoryCode               | `true`    | `String` activity category code                           |
  | name                       | `true`    | `String` activity name                                    |
  | descriptions               | `true`    | `Object` multiple activity descriptions                   |
  | destination                | `true`    | `String` activity location                                |
  | cityName                   | `true`    | `String` activity city                                    |
  | highlights                 | `true`    | `Array` activity highlights                               |
  | keywords                   | `true`    | `Array` activity keywords                                 |
  | images                     | `true`    | `Object` thumbnail and array of more images               |
  | shortDescription           | `true`    | `String` activity description                             |
  | tourId                     | `true`    | `String` another activity id                              |
  | duration                   | `true`    | `String` activity duration                                |
  | startPoint                 | `true`    | `Object` activity start point informations                |
  | endPoint                   | `true`    | `Object` activity end point informations                  |

### fare

  | parameter                  | mandatory | description                                               |
  |----------------------------|-----------|-----------------------------------------------------------|
  | idFare                     | `true`    | `Number` id of the selected availability                  |
  | timeFare                   | `true`    | `String` 'HH:MM' selected time                            |
  | langFare                   | `true`    | `String` selected language                                |
  | participants               | `true`    | `Array` array of participants objects                     |

### participants

  | parameter                  | mandatory | description                                               |
  |----------------------------|-----------|-----------------------------------------------------------|
  | codePers                   | `true`    | `string` kind of person 'ADT', 'CHD' or 'BAB'             |
  | firstName                  | `true`    | `String` person's first name                              |
  | lastName                   | `true`    | `String` person's last name                               |
  | title                      | `true`    | `String` 'Mr' or 'Mrs'                                    |

### checkout

  | parameter                  | mandatory | description                                               |
  |----------------------------|-----------|-----------------------------------------------------------|
  | cardNo                     | `true`    | `String` card number                                      |
  | amount                     | `true`    | `Number` amount to pay                                    |
  | expMonth                   | `true`    | `String` expiration month                                 |
  | expYear                    | `true`    | `String` expiration year                                  |
  | cvc                        | `true`    | `String` cvc                                              |

### bookActivity

  | parameter                  | mandatory | description                                               |
  |----------------------------|-----------|-----------------------------------------------------------|
  | sessionId                  | `true`    | `String` session id                                       |
  | departureDate              | `true`    | `String` AAAA-MM-DD departure date                        |
  | cityCode                   | `true`    | `String` city code                                        |
  | fares                      | `true`    | `Array` array of fares                                    |

### personalInformations

  | parameter                  | mandatory | description                                               |
  |----------------------------|-----------|-----------------------------------------------------------|
  | title                      | `true`    | `String` 'Mr' or 'Mrs'                                    |
  | email                      | `true`    | `String` email                                            |
  | firstname                  | `true`    | `String` first name                                       |
  | lastname                   | `true`    | `String` last name                                        |
  | phoneAreaCode              | `true`    | `String` phone area code e.g. +33                         |
  | phoneNumber                | `true`    | `String` phone number                                     |

### pickup

  | parameter                  | mandatory | description                                               |
  |----------------------------|-----------|-----------------------------------------------------------|
  | address                    | `true`    | `String` hotel address                                    |
  | name                       | `true`    | `String` hotel name                                       |

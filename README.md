# BTU.JS

BTU.JS is a javascript library that interacts with BTU Protocol. It allows any developer to build a booking application or a widget.

  - [Getting started](#getting-started)
    - [Install BTU.JS](#install-btujs)
    - [Instantiate BTU.JS](#instantiate-btujs)
    - [Usage exemple](#usage-exemple)
  - [Resources methods](#resources-methods)
    - [**searchResources**](#searchresources)
    - [**getResource**](#getresource)
    - [**getResourceItem**](#getresourceitem)
    - **addResource** *Not implemented yet*
    - **deleteResource** *Not implemented yet*
    - **editResource** *Not implemented yet*
  - [Availabilities methods](#availabilities-methods)
    - [**searchAvailableResources**](#searchavailableresources)
    - [**getResourceAvailabilities**](#getresourceavailabilities)
    - [**bookResource**](#bookresource)
    - [**getBookingDetails**](#getbookingdetails)
    - [**cancelBooking**](#cancelbooking)
    - **addAvailability** *Not implemented yet*
    - **removeAvailability** *Not implemented yet*

## Getting started

### Install BTU.JS

```
npm install btujs --save
```

---

### Instantiate BTU.JS

```javascript
const btujs = require('btujs');

const myBtujs = new BTUjs();
```

---

### Usage exemple

```javascript
// Forge request body
const body = {
  searchType: 'location',
  options: {
    position: {
      latitude: 48.85341,
      longitude: 2.34880
    },
    distance: 2
  }
};

// Search for all resources of type `hotel` located 2 kilometers around Paris
myBtujs.searchResources('hotel', body, (err, res) => {
  // Catch errors
  if (error) {
    console.log(err);
    return ;
  }
  // Handle response
  console.log(res);
});
```

---

## Resources methods

### **searchResources()**

Search for resources regardless of their availabilities.

#### Prototype
```javascript
  myBtujs.searchResources(String resourceType, Object body, Function callback)
```

#### Parameters

- **resourceType**: the type of resource you are looking for.
- **body**:

  | parameter                  | mandatory                      | description                             |
  |----------------------------|--------------------------------|-----------------------------------------|
  | searchType                 | `true`                         | `String` 'query' or 'location'          |
  | options.searchQuery        | only for `query` searchType    | `String` search query (ex: hotel name)  |
  | options.location.latitude  | only for `location` searchType | `Float` latitude coordinate             |
  | options.location.longitude | only for `location` searchType | `Float` longitude coordinate            |
  | options.distance           | only for `location` searchType | `Integer` distance around location      |

- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

---

### **getResource()**

Query resource by its ID to get its details.

#### Prototype
```javascript
  myBtujs.getResource(String resourceType, String resourceId, Object body, Function callback)
```

#### Parameters

- **resourceType**: the type of resource you are looking for.
- **resourceId**: resource unique identifier.
- **body**: none.
- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

---

### **getResourceItem()**

Query resource by its ID and its sub-item ID to get sub-item details.

#### Prototype
```javascript
  myBtujs.getResourceItem(String resourceType, String resourceId, String itemId, Object body, Function callback)
```

#### Parameters

- **resourceType**: the type of resource you are looking for.
- **resourceId**: resource unique identifier.
- **itemId**: item unique identifier.
- **body**: none.
- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

---

## Availabilities methods

### **searchAvailableResources()**

Search for availables resources only.

#### Prototype
```javascript
  myBtujs.searchAvailableResources(String resourceType, Object body, Function callback)
```

#### Parameters

- **resourceType**: the type of resource you are looking for.
- **body**:

  | parameter                  | mandatory                      | description                             |
  |----------------------------|--------------------------------|-----------------------------------------|
  | startDate                  | `true`                         | `Date` search after this date           |
  | endDate                    | `true`                         | `Date` search before this date          |
  | searchType                 | `true`                         | `String` 'query' or 'location'          |
  | options.searchQuery        | only for `query` searchType    | `String` search query (ex: hotel name)  |
  | options.location.latitude  | only for `location` searchType | `Float` latitude coordinate             |
  | options.location.longitude | only for `location` searchType | `Float` longitude coordinate            |
  | options.distance           | only for `location` searchType | `Integer` distance around location      |

- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

---

### **getResourceAvailabilities()**

Query a resource by its ID and get its availabilities.

#### Prototype
```javascript
  myBtujs.getResourceAvailabilities(String resourceType, String resourceId, Object body, Function callback)
```

#### Parameters

- **resourceType**: the type of resource you are looking for.
- **resourceId**: resource unique identifier.
- **body**:

  | parameter                  | mandatory                      | description                             |
  |----------------------------|--------------------------------|-----------------------------------------|
  | startDate                  | `true`                         | `Date` search after this date           |
  | endDate                    | `true`                         | `Date` search before this date          |

- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

---

### **bookResource()**

Book a resource availability.

#### Prototype
```javascript
  myBtujs.bookResource(String resourceType, String resourceId, Object body, Function callback)
```

#### Parameters

- **resourceType**: the type of resource you are looking for.
- **resourceId**: resource unique identifier.
- **body**:

  | parameter                  | mandatory                      | description                             |
  |----------------------------|--------------------------------|-----------------------------------------|
  | bookingData                | `true`                         | `Object` booking specific data          |

- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

---

### **getBookingDetails()**

Get informations about a booking you made.

#### Prototype
```javascript
  myBtujs.getBookingDetails(String resourceType, String bookingId, Object body, Function callback)
```

#### Parameters

- **resourceType**: the type of resource you are looking for.
- **bookingId**: resource unique identifier.
- **body**: none.
- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.

---

### **cancelBooking()**

Cancel a booking you.

#### Prototype
```javascript
  myBtujs.cancelBooking(String resourceType, String bookingId, Object body, Function callback)
```

#### Parameters

- **resourceType**: the type of resource you are looking for.
- **bookingId**: resource unique identifier.
- **body**: none.
- **callback**: standard callback function, e.g. `callback(err, res) { ... }`.
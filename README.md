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
    - [**isRessourceAvailable**](#isresourceavailable)
    - **addResource** *Private beta - contact us*
    - **deleteResource** *Private beta - contact us*
    - **editResource** *Private beta - contact us*
  - [Availabilities methods](#availabilities-methods)
    - [**searchAvailableResources**](#searchavailableresources)
    - [**getResourceAvailabilities**](#getresourceavailabilities)
    - [**bookResource**](#bookresource)
    - [**getBookingDetails**](#getbookingdetails)
    - [**cancelBooking**](#cancelbooking)
    - **addAvailability** *Private beta - contact us*
    - **removeAvailability** *Private beta - contact us*

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

#### Usage

- [Activities](./documentation/activities.md#searchresources)
- [Hotels](./documentation/hotels.md#searchresources)

---

### **getResource()**

Query resource by its ID to get its details.

#### Prototype
```javascript
  myBtujs.resources.getResource(String resourceType, String resourceId, Object body, Function callback)
```

#### Usage

- [Activities](./documentation/activities.md#getresource)
- [Hotels](./documentation/hotels.md#getresource)


---

### **getResourceItem()**

Query resource by its ID and its sub-item ID to get sub-item details.

#### Prototype
```javascript
  myBtujs.resource.getResourceItem(String resourceType, String resourceId, String itemId, Object body, Function callback)
```

#### Usage

- [Activities](./documentation/activities.md#getresourceitem)


---

## Availabilities methods

### **searchAvailableResources()**

Search for availables resources only.

#### Prototype
```javascript
  myBtujs.availabilities.searchAvailableResources(String resourceType, Object body, Function callback)
```

#### Usage

- [Activities](./documentation/activities.md#searchavailableresources)


---

### **getResourceAvailabilities()**

Query a resource by its ID and get its availabilities.

#### Prototype
```javascript
  myBtujs.availabilities.getResourceAvailabilities(String resourceType, String resourceId, Object body, Function callback)
```

- [Activities](./documentation/activities.md#getresourceavailabilities)
- [Hotels](./documentation/hotels.md#getresourceavailabilities)


---

### **isResourceAvailable()**

Check if a resource is available under different conditions.

#### Prototype
```javascript
  myBtujs.availabilities.isResourceAvailable(String resourceType, String resourceId, Object body, Function callback)
```

#### Usage

- [Activities](./documentation/activities.md#getresourceavailabilities)
- [Hotels](./documentation/hotels.md#getresourceavailabilities)

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

#### Usage

- [Activities](./documentation/activities.md#bookresource)
- [Hotels](./documentation/hotels.md#bookresource)

---

### **getBookingDetails()**

Get informations about a booking you made.

#### Prototype
```javascript
  myBtujs.availabilities.getBookingDetails(String resourceType, String bookingId, Object body, Function callback)
```

#### Usage

- [Activities](./documentation/activities.md#getbookingdetails)
- [Hotels](./documentation/hotels.md#getbookingdetails)

---

### **cancelBooking()**

Cancel a booking you.

#### Prototype
```javascript
  myBtujs.availabilities.cancelBooking(String resourceType, String bookingId, Object body, Function callback)
```

#### Usage

- [Activities](./documentation/activities.md#cancelbooking)
- [Hotels](./documentation/hotels.md#cancelbooking)
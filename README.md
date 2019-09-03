# BTU.JS

BTU.JS is a javascript library that interacts with BTU Protocol. It allows any developer to build a booking application or a widget.

  - [Getting started](#getting-started)
    - [Install BTU.JS](#install-btujs)
    - [Instantiate BTU.JS](#instantiate-btujs)
    - [Usage exemple](#usage-exemple)
  - [Components](#components)
    - [DappBar](#dappbar)
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

## Components

### **DappBar**

BTU Dappbar
Technical documentation:
The dappbar BTU is a tool for offer bringers to simplify cashback in BTU
Token for their customers.
In its current version (V2.1), the tool makes it possible to make the
address of the wallet that is integrated in the user's browser available on
the visited page in a uniform way.
The dappbar use only requires HTML5, CSS3 and Javascript, (it is
possible to integrate it on any JS framework: React, Angular etc ..). It
allows to detect a wallet integrated to a Web3 compatible browser
(Opera, plugins like Metamask, Dapp browsers like BTU-Direct, Trust,
Coinbase etc ...)

1. Installation

1. Additional scripts
First, the integration of the following scripts is necessary for the
operation of the dappbar:
● JQuery (V3.4 or more)
● Web3 (1.0 or more)
● Dappbar.js (link updated)

If you have an html file, you can directly place the following HTML tags in
the <head></head> part of your file.

<script type="text/javacript"
src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script type="text/javascript"
src="https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.34/dist/web3.min.
js"></script>
<script type="text/javascript"
src="https://btu-cdn.s3.eu-west-3.amazonaws.com/public/dappbar.min.js"></sc
ript>

Otherwise you can insert the scripts by calling a JS functions.
const script = document.createElement('script')
script.src =
'https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.34/dist/web3.min.js'
script.async = true
document.head.appendChild(script)

Code to reproduce for each script previously mentioned.

2. Place the dappbar
First of all, for the Dappbar.js script to be able to generate the dappbar, it
is necessary to decide on a place where it will be placed thanks to a
<div> </ div> tag with the specific "btu-placeholder" id. It is
recommended to place it as early as possible in the code so that it takes
up all the top space of the page.
<div id="btu-placeholder"></div>


2. Use
Once the dappbar has been installed, the user who visits the page will
see his wallet connected automatically (or with an approbation request
according to the system) to the dappbar. His information will be saved in
the sessionStorage

● You can verify if the user is connected with the following call :
sessionStorage.getItem("BTU-walletConnected") // Renvoie "false" ou "true"

● You also can have acces to his wallet address by this call :
sessionStorage.getItem("BTU-walletAddr") // Renvoie la clef BTU (0xABF2...)
Finally, if your website is available in different domain names and you

want to make the connexion possible to the wallet only in one of them (
e.g. in the case you want the users who share the link of your website
earns the cashback instead of the buyer, it is possible to specify the
domain name(s) where you want the bar to appear. To add this content,
please add a "data-restrict-domain =" attribute with the value(s) of the
domain name(s).

<div id="btu-placeholder" data-restrict-domain=”test.com,test.fr”></div>

in the case this attribute is not specified, the dappbar is displayed by
default without restrictions.
The refund wallet address is to specify in the page URL, thanks to a
parameter “w”, exemple : test.com?w=0xAB21...

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

Cancel a reservation you booked through the bookResource method.

#### Prototype
```javascript
  myBtujs.availabilities.cancelBooking(String resourceType, String bookingId, Object body, Function callback)
```

#### Usage

- [Activities](./documentation/activities.md#cancelbooking)
- [Hotels](./documentation/hotels.md#cancelbooking)

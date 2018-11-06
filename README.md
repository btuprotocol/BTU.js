# BTUjs

BTUjs is a javascript library that interacts with BTU Protocol. It allows any developer to build a booking application or a widget.

## How to add BTUjs in your project

### As a node package

```
npm install btujs --save
```

## Usage example

```javascript
var BTUjs = require('btujs')

var btujs = new BTUjs();

btujs.resources.getHotelInformations('idHotel').then(json => console.log(json)).catch(err => console.log(err))
```


// ================= FULL EXAMPLE ====================
var BTUjs = require('../src/index.js');

var bjs = new BTUjs({serverUrl:'http://localhost:8080'});

bjs.resources.searchResources('activities', {})
.then(res => {
    console.log('searchResources')
    console.log(res)
})

bjs.availabilities.searchAvailableResources('hotel', {})
.then(res => {
    console.log('searchAvailableResources')
    console.log(res)
})

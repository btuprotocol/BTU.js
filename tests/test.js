// ================= FULL EXAMPLE ====================
var BTUjs = require('../src/index.js');

var bjs = new BTUjs();

bjs.resources.searchResources('activities', {})
.then(res => {
    console.log('searchResources')
    console.log(res)
})

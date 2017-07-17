const path = require('path')
console.log(path.resolve(__dirname, 'tron.js'))
const tron = require(path.resolve(__dirname, 'tron'))
var dependency

var print = function(o) {
  console.log(o + dependency.name)
}

process.on("message", function(o) {
  if (o.init) {
    dependency = o.init
  } else {
    tron.readStream(o.msg).then(
      function(tronData) {
        print(tronData)
      }
    )
  }
})
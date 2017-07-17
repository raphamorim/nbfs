var fork = require("child_process").fork
var child
var init = false

var m = {}

m.init = function(o) {
  if (init)
    return
  init = true
  child = fork(__dirname + "/child")
  child.send({
    init: o
  })
}
m.print = function(o) {
  if (!init)
    return
  child.send({
    msg: o
  })
}
m.uninit = function() {
  if (!init)
    return
  child.on("exit", function() {
    init = false
  })
  child.kill()
}

m.init({
  name: "asd"
})
var abc = m.print("/Users/raphael.amorim/Documents/life/tron/package.json")
console.log(abc)
setTimeout(function() {
  m.uninit()
}, 1000)
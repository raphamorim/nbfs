const path = require('path')
const tron = require(path.resolve(__dirname, 'tron'))

process.on("message", function(o) {
  tron.readStream(o.msg).then((data) => {
    if (process.send)
      process.send({
        data: data,
        path: o.msg,
      })
  }).catch((err) => {
    process.send({
      error: error
    })
  })
})

process.on("exit", function(o) {
  process.exit()
})
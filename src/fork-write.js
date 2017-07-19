const path = require('path')
const tron = require(path.resolve(__dirname, 'tron'))

process.on("message", function(o) {
  tron.writeStream(o.path, o.msg).then((data) => {
    if (process.send)
      process.send({
        data: data,
        path: o.path,
      })
  })
  .catch((err) => {
    process.send({
      error: err
    })
  })
})

process.on("exit", function(o) {
  process.exit()
})
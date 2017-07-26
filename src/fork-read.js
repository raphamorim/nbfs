const path = require('path')
const fs = require('fs')
// tron = require(path.resolve(__dirname, 'tron'))

process.on("message", function(o) {
  const stream = fs.createReadStream(o.msg)

  stream.setEncoding('utf-8')
  stream.on('data', (chunk) => {
    process.send({
      data: chunk,
      path: o.msg,
    })
  })

  stream.on('end', function() {
    // process.send({
    //   data: file,
    //   path: o.msg,
    // })
    stream.close()
  })

  stream.on('error', function(err) {
    process.send({
      error: err
    })
    stream.close()
  })

  // process.exit()
  // }).catch((err) => {

  // })
})

process.on("exit", function(o) {
  process.exit()
})

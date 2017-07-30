const path = require('path')
const fs = require('fs')

process.on('message', function(o) {
  const file = fs.writeFileSync(o.path, o.msg)
  process.send({
    data: o.msg,
    path: o.path,
  })
})

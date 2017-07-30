const path = require('path')
const fs = require('fs')

process.on('message', function(o) {
  if (!fs.existsSync(o.msg))
    process.send({
      error: {
        code: 'ENOENT',
        syscall: 'open',
        message: `ENOENT: no such file or directory, open ${o.msg}`,
      }
    })
  else {
    process.send({
      data: fs.readFileSync(o.msg).toString(),
      path: o.msg,
    })
  }
})

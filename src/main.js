const events = require('events')
const path = require('path')
const fork = require('child_process').fork

let childRead = fork('./src/fork-read.js')
  // childWrite = fork(path.resolve(__dirname, 'fork-write.js'))

exports.read = function _read(filePath) {
  let file = ''
  const emmiter = new events.EventEmitter

  childRead.send({
    msg: filePath,
  })

  childRead.on('message', (data) => {
    // if (data.error) {
    //   emmiter.emit('error', data.error)
    //   emmiter.emit('end', {
    //     error: data.error,
    //   })
    // } else {
      emmiter.emit('read', data.data)
      // childRead.kill()
      // emmiter.emit('end', {
      //   path: data.path,
      //   content: data.data,
      //   operation: 'read',
      // })
    // }
  })

  return emmiter
}

exports.write = function _write(filePath, writeData) {
  const emmiter = new events.EventEmitter

  childWrite.send({
    path: filePath,
    msg: writeData,
  })

  childWrite.on('message', (data) => {
    if (data.error) {
      emmiter.emit('error', data.error)
      emmiter.emit('end', {
        error: data.error,
      })
      // childWrite.kill()
      return emmiter
    }

    emmiter.emit('write', data.data)
    // childWrite.kill()
    emmiter.emit('end', {
      path: data.path,
      content: data.data,
      operation: 'write',
    })
  })

  return emmiter
}

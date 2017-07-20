const events = require('events')
const path = require('path')
const fork = require('child_process').fork

exports.read = function _read(filePath) {
  const emmiter = new events.EventEmitter

  let child = fork(path.resolve(__dirname, 'fork-read.js'))
  child.send({
    msg: filePath,
  })

  child.on('message', (data) => {
    if (data.error) {
      emmiter.emit('error', data.error)
      emmiter.emit('end', {
        error: data.error,
      })
      child.kill()
      return emmiter
    }

    emmiter.emit('read', data.data)
    child.kill()
    emmiter.emit('end', {
      path: data.path,
      content: data.data,
      operation: 'read',
    })
  })

  return emmiter
}

exports.write = function _write(filePath, writeData) {
  const emmiter = new events.EventEmitter

  let child = fork(path.resolve(__dirname, 'fork-write.js'))
  child.send({
    path: filePath,
    msg: writeData,
  })

  child.on('message', (data) => {
    if (data.error) {
      emmiter.emit('error', data.error)
      emmiter.emit('end', {
        error: data.error,
      })
      child.kill()
      return emmiter
    }

    emmiter.emit('write', data.data)
    child.kill()
    emmiter.emit('end', {
      path: data.path,
      content: data.data,
      operation: 'write',
    })
  })

  return emmiter
}

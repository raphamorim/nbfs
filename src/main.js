const events = require('events')
const path = require('path')
const fork = require('child_process').fork

var Main = function(opts) {}

Main.prototype = new events.EventEmitter

Main.prototype.read = function(filePath) {
  const self = this
  let child = fork(path.resolve(__dirname, 'fork-read.js'))
  child.send({
    msg: filePath,
  })

  child.on('message', (data) => {
    if (data.error) {
      self.emit('error', data.error)
      self.emit('end', {
        error: data.error,
      })
      child.kill()
      return this
    }

    self.emit('read', data.data)
    child.kill()
    self.emit('end', {
      path: data.path,
      content: data.data,
      operation: 'read',
    })
  })

  return this
}

Main.prototype.write = function(filePath, writeData) {
  const self = this
  let child = fork(path.resolve(__dirname, 'fork-write.js'))
  child.send({
    path: filePath,
    msg: writeData,
  })

  child.on('message', (data) => {
    if (data.error) {
      self.emit('error', data.error)
      self.emit('end', {
        error: data.error,
      })
      child.kill()
      return this
    }

    self.emit('write', data.data)
    child.kill()
    self.emit('end', {
      path: data.path,
      content: data.data,
      operation: 'write',
    })
  })

  return this
}

module.exports = new Main()

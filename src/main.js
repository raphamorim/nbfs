const events = require('events')
const path = require('path')
const fork = require('child_process').fork

var Main = function(opts) {}

Main.prototype = new events.EventEmitter

Main.prototype.read = function(filePath) {
  var self = this
  var child

  child = fork(path.resolve(__dirname, 'fork-read.js'))
  child.send({
    msg: filePath
  })

  child.on('message', (data) => {
    if (data.error) {
      self.emit('error', data.error)
      self.emit('end', {
        error: data.error
      })
    }

    self.emit('read', data.data)
    child.kill()
    self.emit('end', {
      path: data.path,
      content: data.data,
      operation: 'read'
    })
  })

  return this
}

Main.prototype.write = function(path, writeData) {
  var self = this
  var child

  child = fork(path.resolve(__dirname, '/fork-write'))
  child.send({
    path: path,
    msg: writeData,
  })

  child.on('message', (data) => {
    if (data.error) {
      self.emit('error', data.error)
      self.emit('end', {
        error: data.error
      })
    }

    self.emit('write', data.data)
    child.kill()
    self.emit('end', {
      path: data.path,
      content: data.data,
      operation: 'write'
    })
  })

  return this
}

module.exports = new Main()

const events = require('events')
const path = require('path')
const { fork, spawn } = require('child_process')

let children = [
  {
    busy: false,
    operation: 'read',
    fork: fork('./src/fork-read.js')
  },
  {
    busy: false,
    operation: 'write',
    fork: fork('./src/fork-write.js')
  }
]

function cluster(operation) {
  const available = children.filter((item) =>
    (item.busy === false && item.operation === operation))

  if (process.env['DEBUG']) {
    console.log('available forks: ', available.length)
    console.log('all children: ', children.length)
  }

  if (available.length)
    return available[0]
  else {
    children.push({
      busy: false,
      operation: operation,
      fork: fork(`./src/fork-${operation}.js`)
    })
    return cluster(operation)
  }
}

exports.read = function _read(filePath) {
  const emmiter = new events.EventEmitter
  const child = cluster('read')

  child.busy = true

  child.fork.send({
    msg: filePath,
  })

  child.fork.once('message', (data) => {
    child.busy = false

    if (data.error) {
      emmiter.emit('error', data.error)
      emmiter.emit('end', data)
    } else {
      emmiter.emit('read', data.data)
      emmiter.emit('end', {
        path: data.path,
        content: data.data,
        operation: 'read',
      })
    }
  })

  return emmiter
}

exports.write = function _write(filePath, writeData) {
  const emmiter = new events.EventEmitter
  const child = cluster('write')

  child.busy = true

  child.fork.send({
    path: filePath,
    msg: writeData,
  })

  child.fork.once('message', (data) => {
    child.busy = false

    emmiter.emit('write', data.data)
    emmiter.emit('end', {
      path: data.path,
      content: data.data,
      operation: 'write',
    })
  })

  return emmiter
}

function killChildren(options, err) {
  children.forEach(function(child, idx, array) {
    child.fork.kill()

    // if (idx === array.length - 1) {
    //   if (options.cleanup) console.log('clean')
    //   if (err) console.log(err.stack)
    //   if (options.exit) process.exit()
    // }
  })
}

process.on('exit', killChildren.bind(null, {cleanup:true}))
process.on('SIGINT', killChildren.bind(null, {exit:true}))
// process.on('uncaughtException', killChildren.bind(null, {exit:true}))

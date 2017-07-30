const Benchmark = require('benchmark')
const suite = new Benchmark.Suite

const nbfs = require('../src/main')
const fs = require('fs')
const { execSync } = require('child_process')

const filePath = './test/fixtures/empty-file'

suite
.add('fs.readFile', {
  defer: true,
  fn: function(deferred) {
    fs.readFile(filePath, function read(err, data) {
      if (data.toString())
        deferred.resolve()
    })
  }
})
.add('nbfs.read', {
  defer: true,
  fn: function(deferred) {
    nbfs
      .read(filePath)
      .on('read', (data) => deferred.resolve())
  }
})
.add('fs.readFileSync', {
  defer: true,
  fn: function(deferred) {
    const data = fs.readFileSync(filePath, 'utf-8')
    deferred.resolve()
  }
})
.add('exec cat', {
  defer: true,
  fn: function(deferred) {
    const data = execSync(`cat ${filePath}`, {maxBuffer: 200000000})
    deferred.resolve()
  }
})
.on('cycle', function(event) {
  console.log(String(event.target))
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
  process.exit(0)
})
.run()

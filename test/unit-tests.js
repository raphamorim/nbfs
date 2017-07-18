const assert = require('assert'),
  path = require('path'),
  main = require('../index.js')

describe('Units', function() {
  this.timeout(50000)

  context('Read', function() {
    it('should read when file exists', function(done) {
      const filePath = path.resolve(process.cwd(), 'test/fixtures/simple-text')
      const stream = main.read(filePath)

      stream.on('read', (data) => {
        assert.deepEqual('ABCDEFGH', data)
      })

      stream.on('end', (result) => {
        assert.deepEqual(
          {
            path: filePath,
            content: 'ABCDEFGH',
            operation: 'read'
          },
          result
        )
        done()
      })
    })

    it('should not read when file not exists', function() {
      const stream = main.read('shit-happens')

      stream.on('read', (data) => {
        assert.deepEqual(data, undefined)
      })

      stream.on('error', (error) => {
        assert.equal(typeof error, 'object')
      })

      stream.on('end', (result) => {
        assert.deepEqual(typeof result.error, 'object')
      })
    })
  })
})
const assert = require('assert'),
  path = require('path')

const { read } = require('../index.js')

describe('Read', function() {
  this.timeout(30000)

  context('unit', function() {
    it('should read when file exists', function(done) {
      const filePath = path.resolve(process.cwd(), 'test/fixtures/simple-text')
      const stream = read(filePath)

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

    it('should not read when file not exists', function(done) {
      const stream = read('shit-happens')

      stream.on('error', (error) => {
        assert.equal(typeof error, 'object')
        assert.deepEqual(error.code, 'ENOENT')
        assert.deepEqual(error.syscall, 'open')
      })

      stream.on('end', (result) => {
        assert.deepEqual(typeof result.error, 'object')
        assert.deepEqual(result.error.code, 'ENOENT')
        assert.deepEqual(result.error.syscall, 'open')
        done()
      })
    })
  })
})
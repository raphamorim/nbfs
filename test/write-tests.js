const assert = require('assert'),
  path = require('path'),
  main = require('../index.js')

describe('Write', function() {
  this.timeout(30000)

  context('unit', function() {
    it('should write file', function(done) {
      const filePath = path.resolve(process.cwd(), 'test/fixtures/empty-file')
      const streamWrite = main.write(filePath, 'as-folhas-caem-no-quintal')

      streamWrite.on('write', (data) => {
        assert.deepEqual('as-folhas-caem-no-quintal', data)
      })

      streamWrite.on('end', (result) => {
        assert.deepEqual(
          {
            path: filePath,
            content: 'as-folhas-caem-no-quintal',
            operation: 'write'
          },
          result
        )
        done()
      })
    })
  })
})
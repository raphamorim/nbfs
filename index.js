const main = require('./src/main')

// const stream = main.read('./test/fixtures/simple-text')

// stream.on('read', (chunk) => {
//   console.log(chunk)
// })

// stream.on('end', (result) => {
//   console.log(result) // {path: './my-file.js', content: 'abc', operation: 'read'}
// })

// stream.on('error', (error) => {
//   console.log(error)
// })

// const streamWrite = main.write('/Users/raphael.amorim/Documents/life/tron/ABC.md', `sucesso ${(Math.random())}`)

// streamWrite.on('write', (chunk) => {
//   console.log(chunk)
// })

// streamWrite.on('end', (result) => {
//   console.log(result) // {path: './my-file.js', content: 'abc', operation: 'read'}
// })

module.exports = main
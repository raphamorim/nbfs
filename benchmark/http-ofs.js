const http = require('http')
const port = 3000
const main = require('./src/main')

const requestHandler = (request, response) => {
  console.log('requested')
  main.read('./test/fixtures/empty-file').on('end', (data) => {
    response.end(data.content)
  })
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

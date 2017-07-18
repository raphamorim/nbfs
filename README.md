<h1 align="center">Tron</h1>

<p align="center">Extensible NonBlocking Nodejs File System</p>

# Why?

When running an application in NodeJS, it’s single threaded, and will only utilise a single core.

When performing cpu-intensive or a great number of tasks, you may see this impacting performance, and see runtime/respond-time increase.

If your NodeJS Application has 100% cpu-usage and is taking a long time to complete or slow to respond, this can be improved by dividing the work to be done, and spreading it over multiple processes.

Tron creates and manage multiples processes which communicate between themself. This approach helps a lot for a non-blocking nodejs architechure.

Even if you use FS native stream API or based on async ways to this job, will always run on the nodejs main thread (in idle status or not).

# Streams

## Read

```js
const tron = require('tron')
const stream = tron.read('./my-file.js')

stream.on('read', (content) => {
  console.log(content) // 'abc'
})

stream.on('end', (result) => {
  console.log(result) // {path: './my-file.js', content: 'abc', operation: 'read'}
})

stream.on('error', (error) => {
  console.log(error)
})
```

## Write

```js
const tron = require('tron')
const stream = tron.write('./my-file.js')

stream.on('write', (content) => {
  console.log(content) // 'abc'
})

stream.on('end', (result) => {
  console.log(result) // {path: './my-file.js', content: 'abc', operation: 'write'}
})

stream.on('error', (error) => {
  console.log(error)
})
```
```

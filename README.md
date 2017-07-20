<h1 align="center">Tron</h1>

<p align="center">Extensible NonBlocking Nodejs File System</p>

<p align="center">
  <img src="https://api.travis-ci.org/raphamorim/tron.svg?branch=master"/>
  <img src="https://ci.appveyor.com/api/projects/status/ti7t3o426e1wgu4r?svg=true"/>
  <img src="https://api.travis-ci.org/raphamorim/tron.svg?branch=master"/>
</p>

# Why?

When running an application in NodeJS, it’s single threaded, and will only utilise a single core.

When performing cpu-intensive or a great number of tasks, you may see this impacting performance, and see runtime/respond-time increase.

If your NodeJS Application has 100% cpu-usage and is taking a long time to complete or slow to respond, this can be improved by dividing the work to be done, and spreading it over multiple processes.

Tron creates and manage multiples processes which communicate between themself. This approach helps a lot for a non-blocking nodejs architechure.

Even if you use FS native stream API or based on async ways to this job, will always run on the nodejs main thread (in idle status or not).

# Streams

## read

```js
const { read } = require('tron')
const stream = read('./my-file.js') // absolute path

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

## write

```js
const { write } = require('tron')
const stream = write('./my-file.js') // absolute path

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

## list

## isDirectory

## folderPath
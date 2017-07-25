<h1 align="center">OFS</h1>

<p align="center">Optimized ~Nodejs~ File System</p>

<p align="center">
  <img src="https://api.travis-ci.org/raphamorim/ofs.svg?branch=master"/>
  <img src="https://ci.appveyor.com/api/projects/status/aaxmlgja7ytam84x/branch/master?svg=true"/>
  <img src="https://img.shields.io/npm/v/npm.svg"/>
</p>

# Why?

When running an application in NodeJS, it’s single threaded, and will only utilise a single core.

When performing cpu-intensive or a great number of tasks, you may see this impacting performance, and see runtime/respond-time increase.

If your NodeJS Application has 100% cpu-usage and is taking a long time to complete or slow to respond, this can be improved by dividing the work to be done, and spreading it over multiple processes.

### Traditional (Many tasks to a single node process)

<p align="center"><br><img alt="Traditional" src="assets/traditional.png"/><br></p>

### Distributed (Many tasks to distributed to multiple worker processes)

<p align="center"><br><img alt="Distributed" src="assets/distributed.png"/><br></p>

ofs creates and manage multiples processes which communicate between themself. This approach helps a lot for a non-blocking nodejs architechure.

Even if you use FS native stream API or based on async ways to this job, will always run on the nodejs main thread (in idle status or not).

[Read more about it](https://medium.com/@NorbertdeLangen/communicating-between-nodejs-processes-4e68be42b917)

# Install

For install ofs, just run in your terminal:

```bash
npm i ofs -S
```

# Streams

## read

```js
const { read } = require('ofs')
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
const { write } = require('ofs')
const stream = write('./my-file.js', 'hello-world') // absolute path

stream.on('write', (content) => {
  console.log(content) // 'hello-world'
})

stream.on('end', (result) => {
  console.log(result) // {path: './my-file.js', content: 'hello-world', operation: 'write'}
})

stream.on('error', (error) => {
  console.log(error)
})
```

## list

## isDirectory

## folderPath

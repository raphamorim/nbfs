<h1 align="center">Tron</h1>

<p align="center">Extensible NonBlocking Nodejs File System</p>

# Why?

When running an application in NodeJS, it’s single threaded, and will only utilise a single core.

When performing cpu-intensive or a great number of tasks, you may see this impacting performance, and see runtime/respond-time increase.

If your NodeJS Application has 100% cpu-usage and is taking a long time to complete or slow to respond, this can be improved by dividing the work to be done, and spreading it over multiple processes.

Tron creates and manage multiples processes which communicate between themself. This approach helps a lot for a non-blocking nodejs architechure.

Even if you use FS native stream API or based on async ways to this job, will always run on the nodejs main thread (in idle status or not).

# API

```js
const tron = require('tron')

tron.readFile('./my-file.js')

tron.on('read', (chunk) => {
  console.log(chunk)
})

tron.on('end', (results) => {
  console.log(results) // [{path: './my-file.js', content: 'abc', operation: 'read'},]
})
```

```js
const tron = require('tron')

tron.readFile('./my-file.js')
tron.writeFile('./my-file.js', 'my-awesome-content!')
tron.readFile('./my-file.js')

tron.on('read', (chunk) => {
  console.log(chunk)
})

tron.on('write', (file) => {
  console.log(file)
})

tron.on('end', (results) => {
  console.log(results)
  /*
    [
      {path: './my-file.js', content: 'abc', operation: 'read'},
      {path: './my-file.js', content: 'my-awesome-content!', operation: 'write'},
      {path: './my-file.js', content: 'my-awesome-content!', operation: 'read'},
    ]
  /*
})
```

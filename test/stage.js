const { readFile } = require('fs')
const EventEmitter = require('events')

class EE extends EventEmitter {}

const yy = new EE()

yy.on('event', () => {
  console.log('大师')
})

setTimeout(() => {
  console.log('0ms')
}, 0)

setTimeout(() => {
  console.log('100ms')
}, 100)

setTimeout(() => {
  console.log('200ms')
}, 200)

readFile('../package.json', 'utf-8', data => {
  console.log('文件1读操作回调')
})

readFile('../README.md', 'utf-8', data => {
  console.log('文件2读操作回调')
})

setImmediate(() => {
  console.log('immediate 立即回调')
})

process.nextTick(() => {
  console.log('pocess.nextTick 回调')
})

Promise.resolve()
.then(() => {
  yy.emit('event')

  process.nextTick(() => {
    console.log('pocess.nextTick 第二次回调')
  })

  console.log('promise 第一次回调')
})
.then(() => {
  console.log('promise 第二次回调')
})
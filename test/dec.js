class Boy {
  @speak('中文')
  run () {
    console.log('I can run!')
    console.log('I can speak' + this.language)
  }
}

function speak (language) {
  return function (target, key, descriptor) {
    console.log(target)
    console.log(key)
    console.log(descriptor)

    target.language = language
    return descriptor
  }
}

// function speak (target, key, descriptor) {
//   console.log(target)
//   console.log(key)
//   console.log(descriptor)
//   return descriptor
// }

const luke = new Boy()

luke.run()
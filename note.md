## 进程
### 什么是同步异步
### 什么是异步IO
### 什么是阻塞非阻塞
### 什么是事件循环与事件驱动
- 阶段概述
  - 定时器：本阶段执行已经安排的setTimeout()和setInterval()的回调函数
  - 待定回调：执行延迟到下一个循环迭代的I/O回调
  - idle,prepare：仅系统内部使用
  - 轮询：检索新的I/O事件，执行与I/O相关的回调，其余情况node将在此处阻塞
  - 检测：setImmediate()回调函数在这里执行
  - 关闭的回调：一些准备关闭的回调函数，如：socket.on('close', ...)

- 结论
  - 事件循环总共分三个阶段：定时器、读写I/O、immediate，如果某个阶段里面的回调函数队列被执行完了以后，就会前往到下个阶段
  - 无论在哪个阶段增加了process.nextTick，除非当前阶段的回调还没有执行完，那么在下一个阶段开始之前，一定会先执行process.nextTick以及promise这样的macroTask，而且在nextTick和promise里面新增了nextTick和promise的话，会马上加入到队列尾部，也会执行，执行完毕之后进入下一个阶段。nextTick优先级高于promise
  - 一旦有阻塞代码同步执行时，不会影响整个事件循环的顺序，但是会影响到它前面或者后面的process.nextTick执行的优先级。等同步阻塞代码执行完了之后才会去执行process.nextTick
### 什么是单线程
### 什么是进程
### 什么是子进程
### 怎样启动子进程
### 进程间如何通信



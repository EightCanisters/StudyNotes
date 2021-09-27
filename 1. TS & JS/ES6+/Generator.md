Generator 算是 ES6 中难理解的概念之一了，Generator 最大的特点就是可以控制函数的执行。在这一小节中我们不会去讲什么是 Generator，而是把重点放在 Generator 的一些容易困惑的地方。

## 栗子

```js
function *foo(x) {
  let y = 2 * (yield (x + 1))
  let z = yield (y / 3)
  return (x + y + z)
}
let it = foo(5)
console.log(it.next())   // => {value: 6, done: false}，运行到 x + 1，且还未对y赋值，此时 x = 5
console.log(it.next(12)) // => {value: 8, done: false}，将12作为yield (x + 1)的返回值，y = 2 * 12 = 24，运行到下一个yield暂停
console.log(it.next(13)) // => {value: 42, done: true}，将13作为yield (y / 3)的返回值，z = 13
```

你也许会疑惑为什么会产生与你预想不同的值，接下来就让我为你逐行代码分析原因：

- 首先 Generator 函数调用和普通函数不同，它会返回一个迭代器
- 当执行第一次 next 时，传参会被忽略，并且函数暂停在 yield (x + 1) 处，所以返回 5 + 1 = 6
- 当执行第二次 next 时，传入的参数等于上一个 yield 的返回值，如果你不传参，yield 永远返回 undefined。此时 let y = 2 *12，所以第二个 yield 等于 2* 12 / 3 = 8
- 当执行第三次 next 时，传入的参数会传递给 z，所以 z = 13, x = 5, y = 24，相加等于 42

## Generator 解决 回调地狱

回调地狱：比如有三个ajax请求，他们之间必须有先后顺序，传统写法就是使用ajax嵌套。

```js
function *fetch() {
    yield ajax(url, () => {})
    yield ajax(url1, () => {})
    yield ajax(url2, () => {})
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()
```
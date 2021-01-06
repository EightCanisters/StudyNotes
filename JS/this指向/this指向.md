### 1. 全局上下文

无论是否在严格模式下，在全局环境中（在任何函数体外部），`this`都指向全局对象。

```js
// 在浏览器中, window 对象同时也是全局对象：
console.log(this === window) // true

a = 37;
console.log(window.a) // 37

this.b = 'MDN';
console.log(window.b) // "MDN"
console.log(b) // "MDN"
```

### 2. 函数上下文


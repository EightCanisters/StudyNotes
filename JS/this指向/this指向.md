# 1. 全局上下文

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

# 2. 函数上下文
## 2.1 普通函数调用
## 2.2 call, apply, bind调用
## 2.3 箭头函数中调用
## 2.4 对象的方法中调用
## 2.5 原型链中的调用
## 2.6 getter, setter中的调用
## 2.7 作为构造函数
## 2.8 类中的this调用
## 2.9 事件处理函数中的this调用
### 2.9.1 DOM事件处理函数中的调用
### 2.9.2 内联事件事件处理中的调用

# 3. 类上下文
## 3.1 类上下文
## 3.2 派生类

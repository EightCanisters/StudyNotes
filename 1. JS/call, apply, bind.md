## 1. `call`，`apply`，`bind`的区别

MDN中是这么介绍的：

- `call`：
  - 语法：`function.call(thisArg, arg1, arg2, ...)`。如果处于非严格模式下，`thisArg`指定为`null`或`undefined`时会自动替换为**指向全局对象**；
  - `call()`方法使用一个指定的`this`值和**单独给出的一个或多个参数**来**调用**一个函数；
- `apply`：
  - 语法：`func.apply(thisArg, [argsArray])`。如果处于非严格模式下，`thisArg`指定为`null`或`undefined`时会自动替换为**指向全局对象**
  - `apply()`方法**调用**一个具有给定`this`值的函数，以及以一个**数组（或类数组对象）**的形式提供的参数；
- `bind`：
  - 语法：`function.bind(thisArg[, arg1[, arg2[, ...]]])`。如果`bind`函数的参数列表为空，或者`thisArg`是`null`或`undefined`，执行作用域的 `this`将被视为新函数的`thisArg`。
  - `bind()`方法**创建一个新的函数**，在`bind()`被调用时，这个新函数的`this`被指定为`bind()`的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

### 1.1. `call`和`apply`的区别

就是`call()`方法接受的是一个**参数列表**，而`apply()`方法接受的是一个包含**多个参数的数组**。

```js
var name = "outer"
var a ={
    name : "inner",
    fn : function (a,b) {
        console.log( '名字为'+ this.name, a + b)
    }
}

var b = a.fn;
b(1, 2); // 名字为outer 3

// 测试call
b.call(a, 1, 2); // 名字为inner 3

// 测试apply
b.apply(a, [1, 2]); // 名字为inner 3
```

### 1.2. bind 和 apply、call 区别

- `bind`返回一个新的函数，该函数`this`被绑定到了指定的`thisArg`；
  - 注意：多次调用bind时，**第一次**bind会生效。
- `call`和`apply`返回的是函数使用`thisArg`调用后的结果。

我们先来将刚刚的例子使用`bind`试一下：

```js
var name = "outer"
var a ={
    name : "inner",
    fn : function (a,b) {
        console.log( '名字为'+ this.name, a + b)
    }
}

var b = a.fn;
b(1, 2); // 名字为outer 3

// 测试bind
b.bind(a, 1, 2); // 打印的是方法

// 需要这样调用
b.bind(a, 1, 2)(); // 名字为inner 3

// 多次调用bind
b.bind(window, 1, 1).bind(a, 2, 3)(); // 名字为outer 2
```

## 2. 手写`call`

可以从以下几点来考虑如何实现：

- 不传入第一个参数，那么默认为 window；
- 改变了 this 指向，让新的对象可以执行该函数。那么思路是否可以变成给新的对象添加一个函数，然后在执行完以后删除？

```js
Function.prototype.myCall = function(context, ...args) {
  // 判断调用者是否为函数
  if (typeof this !== 'function') {
      throw new TypeError('Error')
  }
  //不传第一个参数时，默认window；
  const context = context || window; 
  // 将调用call的函数添加到context上
  context.fn = this; // getValue.call(a, 'abc') 变成 a.fn = getValue
  // 调用fn
  const result = context.fn(...args); // getValue.call(a, 'abc') 变成 a.fn(a, 'abc')
  // 删除fn
  delete context.fn;
  return result;
}
```

## 3. 手写`apply`

与`call`类似，只是传参不同。

```js
Function.prototype.myApply = function(context, args) {
  // 判断调用者是否为函数
  if (typeof this !== 'function') {
      throw new TypeError('Error')
  }
  //不传第一个参数时，默认window；
  const context = context || window; 
  // 将调用apply的函数添加到context上
  context.fn = this; // getValue.apply(a, ['abc']) 变成 a.fn = getValue
  // 调用fn
  const result = context.fn(...args); // getValue.apply(a, ['abc']) 变成 a.fn(a, 'abc')
  // 删除fn
  delete context.fn;
  return result;
}
```

## 4. 手写`bind`

- 判断调用者是否为函数；
- 返回一个函数，判断外部哪种方式调用了该函数（new | 直接调用）
- bind调用的时候可以传参，调用之后生成的新的函数也可以传参，效果是一样的,所以这一块也要做处理
  
```js
Function.prototype.myBind = function(context, ...args) {
  // 判断调用者是否为函数
  if (typeof this !== 'function') {
      throw new TypeError('Error')
  }
  // this指调用bind的函数
  const fn = this;
  // args默认值处理
  args = args ? args : [];
  return function newFn(...newArgs) {
    // 因为返回了一个函数，我们可以 new newFn()，所以需要判断
    // 对于 new 的情况来说，不会被任何方式改变 this
    if(this instanceof newFn) { // new newFn()时，this指向new出来的实例
      return new fn(...args, ...newArgs);
    }
    return fn.apply(context, [...args, ...newArgs]);
  }
}


// 测试
// 普通函数
function test() {
    // new 的方式调用 bind 参数输出换做 [...arguments]
    console.log(this.name);
}
// 自定义对象
var obj = {
    name: 'PJ'
}
// 调用函数的 call 方法
let F = test.myBind(obj, 1, 2, 3);
F();
// 返回对象
let obj1 = new F();
```

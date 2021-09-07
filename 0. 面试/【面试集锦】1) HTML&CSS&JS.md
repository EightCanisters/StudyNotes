## HTML

## CSS

## JS 基础

### • 基础数据类型

在 JS 中，存在着 6 种原始值，分别是：

- boolean
- null
- undefined
- number
- string
- symbol
  
首先原始类型存储的都是值，是没有函数可以调用的，比如`undefined.toString()`。

此时你肯定会有疑问，这不对呀，明明`'1'.toString()`是可以使用的。其实在这种情况下，'1' 已经不是原始类型了，而是被强制转换成了`String`类型也就是`对象类型`，所以可以调用`toString`函数。

除了会在必要的情况下强转类型以外，原始类型还有一些坑。

其中 JS 的 number 类型是浮点类型的，在使用中会遇到某些 Bug，比如`0.1 + 0.2 !== 0.3`，但是这一块的内容会在后面讲到。`string`类型是不可变的，无论你在 string 类型上调用何种方法，都不会对值有改变。

另外对于`null`来说，很多人会认为他是个对象类型，其实这是错误的。虽然`typeof null`会输出`object`，但是这只是**JS 存在的一个悠久 Bug**。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。

### • 对象类型与基础类型的不同

在 JS 中，除了原始类型那么其他的都是对象类型了。对象类型和原始类型不同的是，原始类型存储的是值，对象类型存储的是地址（指针）。当你创建了一个对象类型的时候，计算机会在内存中帮我们开辟一个空间来存放值，但是我们需要找到这个空间，这个空间会拥有一个地址（指针）。

```js
const a = []
```

对于常量 a 来说，假设内存地址（指针）为 #001，那么在地址 #001 的位置存放了值 []，常量 a 存放了地址（指针） #001，再看以下代码

```js
const a = []
const b = a
b.push(1)
```

当我们将变量赋值给另外一个变量时，复制的是原本变量的地址（指针），也就是说当前变量 b 存放的地址（指针）也是 #001，当我们进行数据修改的时候，就会修改存放在地址（指针） #001 上的值，也就导致了两个变量的值都发生了改变。

接下来我们来看函数参数是对象的情况

```js
function test(person) {
  person.age = 26
  person = {
    name: 'yyy',
    age: 30
  }

  return person
}
const p1 = {
  name: 'yck',
  age: 25
}
const p2 = test(p1)
console.log(p1) // -> ?
console.log(p2) // -> ?
```

对于以上代码，你是否能正确的写出结果呢？接下来让我为你解析一番：

首先，函数传参是传递对象指针的副本
到函数内部修改参数的属性这步，我相信大家都知道，当前 p1 的值也被修改了
但是当我们重新为 person 分配了一个对象时就出现了分歧，请看下图
![](https://gitee.com/ahuang6027/blog-images/raw/master/images/面试集锦-Object.webp)

所以最后 person 拥有了一个新的地址（指针），也就和 p1 没有任何关系了，导致了最终两个变量的值是不相同的。

### • 类型判断

#### 用typeOf

目前有7中可能的取值👇

```js
// null
typeof null // 'object'

// 基础类型
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'

// 引用类型
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```

由此可见，typeof只能判断**除null以外的基础类型**。

#### 用原型 - instanceof方法（返回Boolean值）

instanceof()是一个方法，返回值为`true | false`。

```js
const Person = function() {}
const p1 = new Person()
p1 instanceof Person // true

var str = 'hello world'
str instanceof String // false

var str1 = new String('hello world')
str1 instanceof String // true
```

对于原始类型来说，你想直接通过 instanceof 来判断类型是不行的，当然我们还是有办法让 instanceof 判断原始类型的

```js
class PrimitiveString {
  static [Symbol.hasInstance](x) {
    return typeof x === 'string'
  }
}
console.log('hello world' instanceof PrimitiveString) // true
```

你可能不知道 Symbol.hasInstance 是什么东西，其实就是一个能让我们自定义 instanceof 行为的东西，以上代码等同于 typeof 'hello world' === 'string'，所以结果自然是 true 了。这其实也侧面反映了一个问题， instanceof 也不是百分之百可信的。

#### 用原型 - Object.prototype.toString.call()（返回'[Object xxx]'）

![](https://gitee.com/ahuang6027/blog-images/raw/master/images/面试集锦-类型判断.png)

#### 类型判断总结

判断 Target 的类型，单单用 typeof 并无法完全满足，这其实并不是 bug，本质原因是 JS 的万物皆对象的理论。因此要真正完美判断时，我们需要区分对待:

基本类型(null): 使用`String(null)`
基本类型(string / number / boolean / undefined) + function: 直接使用`typeof`即可
其余引用类型(Array / Date / RegExp Error): 调用toString后根据`[object XXX]`进行判断

很稳的判断封装:

```js
let class2type = {}
'Array Date RegExp Object Error'.split(' ').forEach(e => class2type[ '[object ' + e + ']' ] = e.toLowerCase()) 

function type(obj) {
    if (obj == null) return String(obj)
    return typeof obj === 'object' ? class2type[ Object.prototype.toString.call(obj) ] || 'object' : typeof obj
}

```

### • 类型转换

首先我们要知道，在 JS 中类型转换只有三种情况，分别是：

- 转换为布尔值
- 转换为数字
- 转换为字符串

我们先来看一个类型转换表格，然后再进入正题
![](https://gitee.com/ahuang6027/blog-images/raw/master/images/20210906210431.png)

#### 转Boolean

在条件判断时，除了`undefined， null， false， NaN， ''， 0， -0`，其他所有值都转为`true`，包括所有对象。

#### 对象转原始类型

对象在转换类型的时候，会调用内置的 `[[ToPrimitive]]` 函数，对于该函数来说，算法逻辑一般来说如下：

- 如果已经是原始类型了，那就不需要转换了
- 调用 x.valueOf()，如果转换为基础类型，就返回转换的值
- 调用 x.toString()，如果转换为基础类型，就返回转换的值
- 如果都没有返回原始类型，就会报错
- 注：当然你也可以重写 `Symbol.toPrimitive` ，该方法在转原始类型时调用优先级最高。

  ```js
  let a = {
    valueOf() {
      return 0
    },
    toString() {
      return '1'
    },
    [Symbol.toPrimitive]() {
      return 2
    }
  }
  1 + a // => 3
  ```

#### 四则运算符

（1）加法运算符不同于其他几个运算符，它有以下几个特点：

- 运算中其中一方为字符串，那么就会把另一方也转换为字符串
- 如果一方不是字符串或者数字，那么会将它转换为数字或者字符串

  ```js
  // 
  1 + '1' // '11' 
  true + true // 2 
  4 + [1,2,3] // "41,2,3" 

  // 注意：
  'a' + + 'b' // 'aNaN'
  ```

  如果你对于答案有疑问的话，请看解析：

  - `1 + '1'`：触发特点一，所以将数字 1 转换为字符串，得到结果 '11'
  - `true + true`：触发特点二，所以将 true 转为数字 1
  - `4 + [1,2,3]`：触发特点二，所以将数组通过 toString 转为字符串 1,2,3，得到结果 41,2,3
  - `'a' + + 'b'`：因为 + 'b' 等于 NaN，所以结果为 "aNaN"，你可能也会在一些代码中看到过 + '1' 的形式来快速获取 number 类型。

（2）那么对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字

```js
4 *'3' // 12
4* [] // 0
4 * [1, 2] // NaN
```

#### 比较运算符

- 如果是对象，就通过 toPrimitive 转换对象
- 如果是字符串，就通过 unicode 字符索引来比较

```js
let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  }
}
a > -1 // true
```

在以上代码中，因为 a 是对象，所以会通过 valueOf 转换为原始类型再比较值。

### • this指向

>详见[js中this指向问题](https://www.yuque.com/otv29s/huanghuang/xfpq7f)

判断总结：

- 先明确，绑定的**优先级**是：new绑定 > 显示绑定 > 隐式绑定 > 默认绑定。  
- 然后就可以按以下步骤来判断了：
  - 函数是否在new中调用(new绑定)，如果是，那么this绑定的是新创建的对象；
  - 函数是否通过call,apply调用，或者使用了bind(显示绑定)，如果是，那么this绑定的就是指定的对象；
  - 函数是否在某个上下文对象中调用(隐式绑定)，如果是的话，this绑定的是那个上下文对象。一般是obj.fun()；
  - 如果以上都不是，那么使用默认绑定。如果在严格模式下，则绑定到undefined，否则绑定到全局对象(node环境的全局对象是globalThis，浏览器环境就是window)；
  - 如果把null或者undefined作为this的绑定对象传入call、apply或者bind，这些值在调用时会被忽略，实际应用的是默认绑定规则；
  - 如果是箭头函数，箭头函数的this继承的是外层代码块的this。

### • == 和 ===

对于`==`来说，如果对比双方的类型不一样的话，就会进行类型转换，这也就用到了我们上一章节讲的内容。

假如我们需要对比 x 和 y 是否相同，就会进行如下判断流程：

- 首先会判断两者类型是否相同。相同的话就是比大小了
- 类型不相同的话，那么就会进行类型转换
- 会先判断是否在对比 null 和 undefined，是的话就会返回 true
- 判断两者类型是否为 string 和 number，是的话就会将字符串转换为 number

  ```js
  1 == '1'
        ↓
  1 ==  1
  ```

- 判断其中一方是否为 boolean，是的话就会把 boolean 转为 number 再进行判断

  ```js
  '1' == true
          ↓
  '1' ==  1
          ↓
  1  ==  1
  ```

- 判断其中一方是否为 object 且另一方为 string、number 或者 symbol，是的话就会把 object 转为原始类型再进行判断

  ```js
  '1' == { name: 'yck' }
          ↓
  '1' == '[object Object]'
  ```

### • 什么是闭包

闭包的定义其实很简单：函数 A 内部有一个函数 B，函数 B 可以访问到函数 A 中的变量，那么函数 B 就是闭包。

```js
function A() {
  let a = 1
  window.B = function () {
      console.log(a)
  }
}
A()
B() // 1
```

很多人对于闭包的解释可能是函数嵌套了函数，然后返回一个函数。其实这个解释是不完整的，就比如我上面这个例子就可以反驳这个观点。

在 JS 中，闭包存在的意义就是让我们可以间接访问函数内部的变量。

### • `var` 定义函数的问题

问题代码：

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

首先因为 setTimeout 是个异步函数，所以会先把循环全部执行完毕，这时候 i 就是 6 了，所以会输出一堆 6。

如何解决呢？

#### 法一：使用闭包

```js
for (var i = 1; i <= 5; i++) {
  ;(function(j) {
    setTimeout(function timer() {
      console.log(j)
    }, j * 1000)
  })(i)
}
```

在上述代码中，我们首先使用了立即执行函数将 i 传入函数内部，这个时候值就被固定在了参数 j 上面不会改变，当下次执行 timer 这个闭包的时候，就可以使用外部函数的变量 j，从而达到目的。

#### 法二：使用`setTimeout`的第三个参数

使用 setTimeout 的第三个参数，这个参数会被当成 timer 函数的参数传入。

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(
    function timer(j) {
      console.log(j)
    },
    i * 1000,
    i
  )
}
```

#### 法三：使用let

```js
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

### • 深拷贝&浅拷贝

浅拷贝：只拷贝第一层，**修改时原对象也会受到影响**

- `Object.assign`；
- 展开运算符(...)；

深拷贝：完全拷贝一个新对象，**修改时原对象`不再受到任何影响**

- `JSON.parse(JSON.stringify(object))`性能最快，但有弊端：
  - 会忽略 undefined；
  - 会忽略 symbol；
  - 不能序列化函数：报错；
  - 不能解决循环引用的对象：报错。
- lodash的`cloneDeep()`；
- 递归进行逐一赋值。

### • 原型 & 原型链

> 完整版：<https://www.yuque.com/go/doc/50042272>

#### 原型(prototype)

- prototype是函数独有的；
- prototype就是一个对象，又叫做原型对象，可以通过函数.prototype访问；
- prototype里通常有两个属性：__proto__和constructor；
- 原型可以用来共享方法；
- 原型中this的指向是实例。

#### 原型链

**原型链是由原型对象组成**，每个原型对象都有`__proto__`属性，指向了创建该对象的构造函数的原型，`__proto__`将原型对象连接起来组成了原型链。是一个用来实现继承和共享属性的有限的对象链。

- **属性查找机制:** 当查找对象的属性时，如果实例对象自身不存在该属性，则沿着原型链往上一级查找，找到时则输出，不存在时，则继续沿着原型链往上一级查找，直至最顶级的原型对象Object.prototype，如还是没找到，则输出 null；
- **属性修改机制:** 只会修改实例对象本身的属性，如果不存在，则进行添加该属性，如果需要修改原型的属性时，则可以用: `b.prototype.x = 2`；但是这样会造成所有继承于该对象的实例的属性发生改变。

### • 继承

#### 组合继承

组合继承是最常用的继承方式，其核心是在子类的构造函数中通过 `Parent.call(this)`继承父类的属性，然后改变子类的原型为`new Parent()`来继承父类的函数。

**优点：** 在于构造函数可以传参，不会与父类引用属性共享，可以复用父类的函数。

**缺点：** 在继承父类函数的时候调用了父类构造函数，导致子类的原型上多了不需要的父类属性，存在内存上的浪费。  
![](https://gitee.com/ahuang6027/blog-images/raw/master/images/20210906224552.png)

```js
function Parent(name) {
  this.name = name;
}
Parent.prototype.getName = function() {
  console.log(this.name)
}

// 使用call改变Parent的this指向，使指向Child
function Child(name, sex) {
  Parent.call(this, name);
  this.sex = sex;
}
// 设置Child的原型为Parent的实例
Child.prototype = new Parent();

const zhangsan = new Child('zhangsan', '男'); 
zhangsan.getName(); // 'zhangsan'
zhangsan instanceof Parent // true
```

#### 寄生组合继承

这种继承方式对组合继承进行了优化，组合继承缺点在于继承父类函数时调用了构造函数，我们只需要优化掉这点就行了。

```js
function Parent(name) {
  this.name = name;
}
Parent.prototype.getName = function() {
  console.log(this.name)
}

// 使用call改变Parent的this指向，使指向Child
function Child(name, sex) {
  Parent.call(this, name);
  this.sex = sex;
}
// 使用Object.create()设置Child的原型
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true
  }
});

const zhangsan = new Child('zhangsan', '男'); 
zhangsan.getName(); // 'zhangsan'
zhangsan instanceof Parent // true
```

以上继承实现的核心就是将父类的原型赋值给了子类，并且将构造函数设置为子类，这样既解决了无用的父类属性问题，还能正确的找到子类的构造函数。  
![](https://gitee.com/ahuang6027/blog-images/raw/master/images/20210906230136.png)

#### Class继承

以上两种继承方式都是通过原型去解决的，在 ES6 中，我们可以使用 class 去实现继承，并且实现起来很简单。

```js
class Parent {
  constructor(value) {
    this.val = value
  }
  getValue() {
    console.log(this.val)
  }
}
class Child extends Parent {
  constructor(value) {
    super(value)
    this.val = value
  }
}
let child = new Child(1)
child.getValue() // 1
child instanceof Parent // true
```

`class`实现继承的核心在于使用`extends`表明继承自哪个父类，并且在子类构造函数中必须调用`super`，因为这段代码可以看成`Parent.call(this, value)`。

当然了，在 JS 中并不存在类，class 的本质就是函数。

## ES6+

### • var, const, let的区别

对于这个问题，我们应该先来了解提升（hoisting）这个概念。

```js
console.log(a) // undefined
var a = 1
```

从上述代码中我们可以发现，虽然变量还没有被声明，但是我们却可以使用这个未被声明的变量，这种情况就叫做提升，并且提升的是声明。

对于这种情况，我们可以把代码这样来看

```js
var a
console.log(a) // undefined
a = 1
接下来我们再来看一个例子

var a = 10
var a
console.log(a)
```

对于这个例子，如果你认为打印的值为 undefined 那么就错了，答案应该是 10，对于这种情况，我们这样来看代码

```js
var a
var a
a = 10
console.log(a)
```

到这里为止，我们已经了解了 var 声明的变量会发生提升的情况，其实不仅变量会提升函数也会被提升。

```js
console.log(a) // ƒ a() {}
function a() {}
var a = 1
```

对于上述代码，打印结果会是 ƒ a() {}，即使变量声明在函数之后，这也说明了函数会被提升，并且优先于变量提升。

说完了这些，想必大家也知道 var 存在的问题了，使用 var 声明的变量会被提升到作用域的顶部，接下来我们再来看 let 和 const 。

我们先来看一个例子：

```js
var a = 1
let b = 1
const c = 1
console.log(window.b) // undefined
console.log(window. c) // undefined

function test(){
  console.log(a)
  let a
}
test()
```

首先在全局作用域下使用 let 和 const 声明变量，变量并不会被挂载到 window 上，这一点就和 var 声明有了区别。

再者当我们在声明 a 之前如果使用了 a，就会出现报错的情况

你可能会认为这里也出现了提升的情况，但是因为某些原因导致不能访问。

首先报错的原因是因为存在暂时性死区，我们不能在声明前就使用变量，这也是 let 和 const 优于 var 的一点。然后这里你认为的提升和 var 的提升是有区别的，虽然变量在编译的环节中被告知在这块作用域中可以访问，但是访问是受限制的。

那么到这里，想必大家也都明白 var、let 及 const 区别了，不知道你是否会有这么一个疑问，为什么要存在提升这个事情呢，其实提升存在的根本原因就是为了解决函数间互相调用的情况

```js
function test1() {
    test2()
}
function test2() {
    test1()
}
test1()
```

假如不存在提升这个情况，那么就实现不了上述的代码，因为不可能存在 test1 在 test2 前面然后 test2 又在 test1 前面。

#### 小结

那么最后我们总结下这小节的内容：

- 函数提升优先于变量提升，函数提升会把整个函数挪到作用域顶部，变量提升只会把声明挪到作用域顶部
- var 存在提升，我们能在声明之前使用。let、const 因为暂时性死区的原因，不能在声明前使用
- var 在全局作用域下声明变量会导致变量挂载在 window 上，其他两者不会
- let 和 const 作用基本一致，但是后者声明的变量不能再次赋值

### • 模块化

> 参考：<https://juejin.cn/post/6844903744518389768>

#### 模块化的好处

- 解决命名冲突；
- 提供复用性；
- 提高代码可维护性。

#### 立即执行函数

在早期，使用立即执行函数实现模块化是很常见的手段，通过函数作用域解决了命名冲突、全局作用域被污染的问题。

```js
(function(globalVariable) {
  globalVariable.test = function() {}
  // ... 声明各种变量、函数都不会污染全局作用域
})(globalVariable)
```

#### CommonJS (Node)

**1）概述：**

CommonJS最早是在Node中使用的，目前也仍然广泛使用，比如在Webpack就是使用CommonJS。Node 应用由模块组成，采用 CommonJS 模块规范。每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。在服务器端，模块的加载是运行时同步加载的；在浏览器端，模块需要提前编译打包处理。  
当然目前Node中的模块管理已经和CommonJS有一些区别了。

**2）基本语法：**

- 暴露模块：`module.exports = value`或`exports.xxx = value`
- 引入模块：`require(xxx)`,如果是第三方模块，xxx为模块名；如果是自定义模块，xxx为模块文件路径

此处我们有个疑问：CommonJS暴露的模块到底是什么? CommonJS规范规定，每个模块内部，`module`变量代表当前模块。这个变量是一个对象，它的`exports`属性（即`module.exports`）是对外的接口。加载某个模块，其实是加载该模块的`module.exports`属性。

```js
// a.js
module.exports = {
  a: 1
}
// or
exports.a = 1;

// b.js
var module = require('./a.js');
module.a; // 1
```

**3）特点：**

- 所有代码都运行在模块作用域，不会污染全局作用域。
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存。
- 模块加载的顺序，按照其在代码中出现的顺序；
- 加载机制：**输入的是被输出的值的拷贝**。也就是说，**一旦输出一个值，模块内部的变化就影响不到这个值**。这点与ES6模块化有重大差异（下文会介绍）

  ```js
  // lib.js
  var counter = 3;
  function incCounter() {
    counter++;
  }
  module.exports = {
    counter: counter,
    incCounter: incCounter,
  };

  // main.js
  var counter = require('./lib').counter;
  var incCounter = require('./lib').incCounter;

  console.log(counter);  // 3
  incCounter();
  console.log(counter); // 3
  ```

#### AMD(RequireJS)

**1）特点：**

- CommonJS规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。AMD规范则是非同步加载模块，允许指定回调函数。  
- 由于Node.js主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以CommonJS规范比较适用。但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用AMD规范。此外AMD规范比CommonJS规范在浏览器端实现要来着早。

**2）基本语法：**

```js

// 定义暴露模块 - 没有依赖
define(function(){
   return 模块
})

//定义暴露模块 - 有依赖
define(['module1', 'module2'], function(m1, m2){
   return 模块
})

// 引用使用模块
require(['module1', 'module2'], function(m1, m2) {
  // 使用m1, m2
})
```

#### CMD(SeaJS)

**1）特点：**

- CMD规范专门用于浏览器端，模块的加载是**异步**的，模块使用时才会加载执行。
- CMD规范整合了CommonJS和AMD规范的特点。
- 在 Sea.js 中，所有 JavaScript 模块都遵循 CMD模块定义规范。

**2）基本语法：**

```js

// 定义暴露模块 - 没有依赖
define(function(require, exports, module){
  exports.xxx = value
  module.exports = value
})

// 定义暴露模块 - 有依赖
define(function(require, exports, module){
  //引入依赖模块(同步)
  var module2 = require('./module2')
  //引入依赖模块(异步)
  require.async('./module3', function (m3) {})
  //暴露模块
  exports.xxx = value
})

// 引用使用模块
define(function (require) {
  var m1 = require('./module1')
  var m4 = require('./module4')
  m1.show()
  m4.show()
})
```

#### ES Module

**1）概述：**  
export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。

**2）基本语法：**

```js

/** 语法1 export { } **/

// 定义模块 math.js
var basicNum = 0;
var add = function (a, b) {
    return a + b;
};
export { basicNum, add };

// 引用模块
import { basicNum, add } from './math';
function test(ele) {
    ele.textContent = add(99 + basicNum);
}

/** 语法2：export default **/

// export-default.js
export default function () {
  console.log('foo');
}

// import-default.js
import customName from './export-default';
customName(); // 'foo'
```

**3）ES Module 与 CommonJS的差异：**

它们有两个重大差异：

- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的动态引用。
  - ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
  - CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

#### 小结

- CommonJS规范主要用于服务端编程，加载模块是**同步**的，这并不适合在浏览器环境，因为同步意味着阻塞加载，浏览器资源是异步加载的，因此有了AMD CMD解决方案。
- AMD规范在浏览器环境中**异步加载**模块，而且可以**并行**加载多个模块。不过，AMD规范开发成本高，代码的阅读和书写比较困难，**模块定义方式的语义不顺畅**。
- CMD规范与AMD规范很相似，都用于浏览器编程，依赖就近，**延迟执行**，可以很容易在Node.js中运行。不过，依赖SPM 打包，模块的**加载逻辑偏重**；
- ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

### • Proxy

#### Proxy简介

> MDN Proxy: <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy>  
> MDN Reflect: <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect>

如果你平时有关注 Vue 的进展的话，可能已经知道了在 Vue3.0 中将会通过`Proxy`来替换原本的`Object.defineProperty`来实现数据响应式。 `Proxy`是 ES6 中新增的功能，用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

```js
let p = new Proxy(target, handler)
```

`target`代表需要添加代理的对象，`handler`用来自定义对象中的操作，比如可以用来自定义`set`或者`get`函数。

#### Proxy实现数据响应式

```js
let onWatch = (obj, setBind, getLogger) => {
  let handler = {
    get(target, property, receiver) {
      getLogger(target, property)
      return Reflect.get(target, property, receiver)
    },
    set(target, property, value, receiver) {
      setBind(value, property)
      return Reflect.set(target, property, value)
    }
  }
  return new Proxy(obj, handler)
}

let obj = { a: 1 }
let p = onWatch(
  obj,
  (v, property) => {
    console.log(`监听到属性${property}改变为${v}`)
  },
  (target, property) => {
    console.log(`'${property}' = ${target[property]}`)
  }
)
p.a = 2 // 监听到属性a改变
p.a // 'a' = 2
```

在上述代码中，我们通过自定义 set 和 get 函数的方式，在原本的逻辑中插入了我们的函数逻辑，实现了在对对象任何属性进行读写时发出通知。

当然这是简单版的响应式实现，如果需要实现一个 Vue 中的响应式，需要我们在 get 中收集依赖，在 set 派发更新，之所以 Vue3.0 要使用 Proxy 替换原本的 API 原因在于 Proxy 无需一层层递归为每个属性添加代理，一次即可完成以上操作，性能上更好，并且原本的实现有一些数据更新不能监听到，但是 Proxy 可以完美监听到任何方式的数据改变，唯一缺陷可能就是浏览器的兼容性不好了。

### • 并行和并发的区别

## JS异步

### • Generator

Generator 算是 ES6 中难理解的概念之一了，Generator 最大的特点就是可以控制函数的执行。在这一小节中我们不会去讲什么是 Generator，而是把重点放在 Generator 的一些容易困惑的地方。

#### 栗子

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

#### Generator 解决 回调地狱

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

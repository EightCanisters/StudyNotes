## HTML

## CSS

## JS

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

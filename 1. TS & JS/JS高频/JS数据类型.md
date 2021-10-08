## 1. 基础数据类型

在 JS 中，存在着 7 种原始值，分别是：

- boolean
- null
- undefined
- number
- string
- symbol
- bigint
  
首先原始类型存储的都是值，是没有函数可以调用的，比如`undefined.toString()`。

此时你肯定会有疑问，这不对呀，明明`'1'.toString()`是可以使用的。其实在这种情况下，'1' 已经不是原始类型了，而是被强制转换成了`String`类型也就是`对象类型`，所以可以调用`toString`函数。

除了会在必要的情况下强转类型以外，原始类型还有一些坑。

其中 JS 的 number 类型是浮点类型的，在使用中会遇到某些 Bug，比如`0.1 + 0.2 !== 0.3`，但是这一块的内容会在后面讲到。`string`类型是不可变的，无论你在 string 类型上调用何种方法，都不会对值有改变。

另外对于`null`来说，很多人会认为他是个对象类型，其实这是错误的。虽然`typeof null`会输出`object`，但是这只是**JS 存在的一个悠久 Bug**。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。

## 2. 对象类型与基础类型的不同

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

## 3. 类型判断

### 3.1. 用typeOf

目前有8中可能的取值👇

```js
// null
typeof null // 'object'

// 基础类型
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof BigInt(1) // 'bigint'

// 引用类型
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```

由此可见，typeof只能判断**除null以外的基础类型**。

### 3.2. 用原型 - instanceof方法（返回Boolean值）

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

### 3.3. 用原型 - Object.prototype.toString.call()（返回'[Object xxx]'）

![](https://gitee.com/ahuang6027/blog-images/raw/master/images/面试集锦-类型判断.png)
![](https://gitee.com/ahuang6027/blog-images/raw/master/images/20211008212342.png)

### 3.4. 类型判断总结

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

## 4. 类型转换

首先我们要知道，在 JS 中类型转换只有三种情况，分别是：

- 转换为布尔值
- 转换为数字
- 转换为字符串

我们先来看一个类型转换表格，然后再进入正题
![](https://gitee.com/ahuang6027/blog-images/raw/master/images/20210906210431.png)

### 4.1. 转Boolean

在条件判断时，除了`undefined， null， false， NaN， ''， 0， -0`，其他所有值都转为`true`，包括所有对象。

### 4.2. 对象转原始类型

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

### 4.3. 四则运算符

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

### 4.4. 比较运算符

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

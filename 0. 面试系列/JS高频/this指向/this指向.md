## 1. 前言

this也算是面试必问的问题之一了。
但很多人对this理解得模模糊糊，工作时得打印出来看看才敢往下写，面试时只能回答个大概，细节经不起推敲。
今天我们就针对这个痛点，解决掉它！

现在我们来看道题：

```js
var number = 5;
var obj = {
    number: 3,
    fn: (function () {
        var number;
        this.number *= 2;
        number = number * 2;
        number = 3;
        return function () {
            var num = this.number;
            this.number *= 2;
            console.log(num);
            number *= 3;
            console.log(number);
        }
    })()
}
var myFun = obj.fn;
myFun.call(null);
obj.fn();
console.log(window.number);
```

答案依次是：```10 9 3 27 20```  
惊不惊喜，意不意外？如果你比较容易就答对了，那说明你对this的理解还是非常到位的。不然，就跟我一块来看看这篇文章呗~ 这道题的解析在[思考1](#41-思考1)哦~

## 2. this是啥？

在讨论this的时候，一般都会说“指向xxx”。this就是一个指针，在了解具体指向之前，我们先引入几个名词：

- 默认绑定
- 隐式绑定
- 显示绑定
- new绑定

而且它们的**优先级**：```new绑定 > 显示绑定 > 隐式绑定 > 默认绑定```。

### 2.1. 默认绑定

- 在不能应用其它绑定规则时使用，通常是**独立函数调用**。
- 独立函数：是指在全局上下文中的函数，它的this指向如下：
  - 非严格且处于Node环境：```globalThis```；
  - 非严格且处于Windows环境：```window```；
  - 严格模式下： ```undefined```。

没有特殊声明的话，本文都是浏览器环境执行的结果。

```js
function getName(){
  console.log('Name: ', this.name);
}
var name = 'laohuang';
getName();
```

**解析**：调用```getName()```时，它处于全局上下文，应用了默认绑定，this指向全局对象window，所以控制台会打印：```Name: laohuang```。

### 2.2. 隐式绑定

- 函数的调用是通过某个对象调的，或者说调用位置上存在对象，也即```obj.fn()```；
- this指向对象属性链中最后一层。比如```obj1.obj2.obj3.fn(), this指向obj3```；
- 隐式绑定存在绑定丢失的情况。请记住：`obj.fn()`是隐式绑定，但如果`fn()`前啥都没有，属于默认绑定。

#### 2.2.1. 典型的```obj.fn```

```js
function getName(){
  console.log('Name: ', this.name);
}
var laohuang = {
  name: 'laohuang',
  getName: getName
}
var name = 'feifei';
laohuang.getName();
```

**解析**：```getName```函数在```laohuang```外部声明。```laohuang```内部的``getName``相当于做了一次赋值操作。在调用`laohuang.getName()`时，调用位置是laohuang，隐式绑定会把getName里的`this`绑定到`laohuang`上，所以控制台会打印：`Name: laohuang`。

#### 2.2.2. this指向对象属性链中最后一层

```js
function getName(){
  console.log('Name: ', this.name);
}
var feifei = {
  name: 'feifei',
  getName: getName
}
var laohuang = {
  name: 'laohuang',
  friend: feifei
}
var name = 'FEHuang';
laohuang.friend.getName();
```

**解析**：`this`指向对象属性链中最后一层，所以隐式绑定会把`this`绑定到`laohuang.frend`即`feifei`上，所以控制台会打印：`Name: feifei`。

#### 2.2.3. 隐式绑定的大陷阱 - 绑定丢失

**1. 绑定丢失 - 将函数的引用给另一变量时：**

```js
function getName(){
  console.log('Name: ', this.name);
}
var laohuang = {
  name: 'laohuang',
  getName: getName
}
var name = 'FEHuang';
var getNameCopy = laohuang.getName;
getNameCopy();
```

**解析**：`var getNameCopy = laohuang.getName`将`getName`的引用赋值给了`getNameCopy`，`getNameCopy`直接指向`getName方法`。`getNameCopy()`前啥都没有，所以它是**默认绑定**，`this`指向**全局上下文**。所以控制台会打印：`Name: FEHuang`。

**2. 绑定丢失 - 回调函数中：**

```js
function getName(){
  console.log('Name: ', this.name);
}
var feifei = {
  name: 'feifei',
  getName: getName
}
var laohuang = {
  name: 'laohuang',
  getName: function() {
    setTimeout(function() {
      console.log('Name: ', this.name)
    })
  }
}
var name = 'FEHuang';
laohuang.getName(); // Name: FEHuang
setTimeout(feifei.getName, 1000); // Name: FEHuang
setTimeout(function() {
  feifei.getName(); // Name: feifei
}, 1000)
```

**解析**：

- `laohuang.getName()`: 这里很好理解，`setTimeout`的回调函数中，`this`使用的是默认绑定，此时又是非严格模式，因此打印`Name: FEHuang`；
- `setTimeout(feifei.getName, 1000)`: 这里相当于将`feifei.getName`的引用直接给了`setTimeout`第一个变量，最后执行了这个变量。这里绑定丢失，使用了默认绑定，因此指向全局上下文，打印：`Name: FEHuang`；
- `setTimeout(function() { feifei.getName(); }, 1000)`: 虽然也是在`setTimeout`的回调中，但这里是直接执行了`feifei.getName()`，使用隐式绑定，`this`指向`feifei`。所以打印：`Name: feifei`。

### 2.3. 显示绑定

- 显示绑定就是通过`call`,`apply`,`bind`的方式，显式的指定`this`所指向的对象。
- `call`,`apply`和`bind`的第一个参数，就是对应函数的`thi`s所指向的对象。`call`和`apply`的作用一样，只是传参方式不同。`call`和`apply`都会执行对应的函数，而`bind`方法不会。
- 注意`call`,`apply`的特殊传参会被转换：传null/undefined --> 全局上下文；原始值 --> 对象(非严格模式)/原始值(严格模式)

#### 2.3.1. 典型的显示绑定

```js
function getName(){
  console.log('Name: ', this.name);
}
var laohuang = {
  name: 'laohuang',
  getName: getName
}
var name = 'FEHuang';
var getNameCopy = laohuang.getName;
getNameCopy.call(laohuang);
```

**解析**：显示绑定直接将`this`绑定到了`laohuang`，所以控制台会打印：`Name: laohuang`。

#### 2.3.2. 特殊情况 - 使用call, apply, bind时也可能会遇到绑定丢失

那么，使用了显示绑定，是不是意味着不会出现隐式绑定所遇到的绑定丢失呢？显然不是这样的，不信，继续往下看。

```js
function getName(){
  console.log('Name: ', this.name);
}
var laohuang = {
  name: 'laohuang',
  getName: getName
}
var name = 'FEHuang';
var getNameCopy = function(fn) {
  fn();
};
getNameCopy.call(laohuang, laohuang.getName);
```

**解析**：`getNameCopy.call(laohuang, laohuang.getName)`的确将`this`绑定到`laohuang`的`this`了。但`call`的第二个参数传的`getName的引用`，所以在执行`fn()`的时候，相当于直接调用了`getName()`方法。所以控制台会打印：`Name: FEHuang`。
**思考**: 如果希望绑定不会丢失，要怎么做？(答案在最后的[思考2](#42-思考2))

#### 2.3.3. 特殊情况 - call, apply, bind的特殊传参

在非严格模式下使用`call`和`apply`时，如果用作`this`的值不是对象，则会被尝试转换为对象。`null`和`undefined`被转换为`全局对象`。`原始值`如 7 或 'foo' 会使用相应构造函数转换为`对象`。

**1. 传null/undefined**:
会将其转换成全局对象，实际使用默认绑定。

```js
var laohuang = {
  name: 'laohuang'
}
var name = 'FEHuang';
function getName() {
  console.log(this.name);
}
getName.call(null); //FeHuang 
```

**解析**：实际应用默认绑定，所以控制台会打印：`FEHuang`。

**2. 传原始值**:
会将其转换成对应的对象

```js
var doSth = function(name){
  console.log(this);
  console.log(name);
}
doSth.call(2, 'laohuang'); // Number{2}, 'laohuang'
var doSth2 = function(name){
  'use strict';
  console.log(this);
  console.log(name);
}
doSth2.call(2, 'laohuang'); // 2, 'laohuang'
```

### 2.4. new绑定

#### 2.4.1. new干了什么？

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new#%E6%8F%8F%E8%BF%B0)上的介绍时这样的：

1. 创建一个空的简单JavaScript对象（即{}）；
2. 链接该对象（设置该对象的`constructor`）到另一个对象；
3. 将步骤1新创建的对象作为`this`的上下文；
4. 如果该函数没有返回对象，则返回`this`。

#### 2.4.2. 举例

```js
function getName(name) {
    this.name = name
}

var laohuang = new getName('laohuang');
console.log('Name: ', laohuang.name);
```

**解析**：在`var laohuang = new getName('laohuang')`这步，会将`getName`中的`this`绑定到对象`laohuang`上。所以控制台会打印：`Name: laohuang`。

### 2.5. 箭头函数

先来看看箭头函数的特点：

- 函数体内的`this`对象，继承的是外层代码块的`this`。**注意**：箭头函数内的this不是定义时所在的对象，而是外层代码块的this。
- 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
- 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用`rest`参数代替。
- 不可以使用`yield`命令，因此箭头函数不能用作`Generator`函数。
- 箭头函数没有自己的`this`，所以不能用`call()、apply()、bind()`这些方法去改变`this`的指向.

```js
var names = {
    getName0: function() {
        console.log(this);
        return () => {
            console.log(this);
        }
    },
    getName1: function() {
        return function() {
            console.log(this);
            return () => {
                console.log(this);
            }
        }
    },
    getName2: () => {
        console.log(this);
    }
}

// 第一段
var name0 = names.getName0(); // names对象
name0(); // names对象

// 第二段
var name1 = names.getName1();
var _name1 = name1(); // window对象
_name1(); // window对象

// 第三段
names.getName2(); // window对象
```

**解析**：

第一段：

- `names.getName0()`对应隐式绑定，`this`绑定在了`names`上，所以控制台会打印：names对象；
- `name0()`执行的就是箭头函数。箭头函数的`this`继承上一个代码段的`this`(即`getName0()`运行时的`this`，即`names`)。所以控制台也会打印：names对象；

第二段：

- `name1`是`names.getName1()`运行后返回的一个全新的函数，对应了上边说到的隐式绑定丢失的情况。此时应用的是默认绑定，`this`指向了`全局对象window`。所以`name1()`打印的是：window对象；
- `_name1()`执行的是箭头函数。
  - 如果箭头函数的this继承自定义时的对象，那`_name1()`应该打印names对象才对，但这里打印的是window对象，显然这种理解是**错误**的。
  - 按照`箭头函数的this是继承于外层代码块的this`就很好理解了。外层代码块我们刚刚分析了，`this`指向的是`window`，因此这里控制台打印：window对象。

第三段：

- names.getName2()执行的是箭头函数。由于当前的代码块names中不存在this，只能往上层查找。所以这里控制台打印：window对象。

#### 2.5.1. 请牢记：箭头函数中的this继承于外层代码库块的this

因为箭头函数里的this也有可能是动态的哟~ 不信看下面的代码：

```js
var names = {
    getName1: function() {
        return function() {
            console.log(this);
            return () => {
                console.log(this);
            }
        }
    },
}

var name0 = names.getName1();

var n1 = name0(); // window
n1(); // window

var n2 = name0.call(names); // names
n2(); // names  
```

## 3. 总结

### 3.1. 如何准确判断this的指向

再来复习一下，绑定的**优先级**是：new绑定 > 显示绑定 > 隐式绑定 > 默认绑定。  
然后我们就可以按以下步骤来判断了：

- 函数是否在new中调用(new绑定)，如果是，那么this绑定的是新创建的对象；
- 函数是否通过call,apply调用，或者使用了bind(显示绑定)，如果是，那么this绑定的就是指定的对象；
- 函数是否在某个上下文对象中调用(隐式绑定)，如果是的话，this绑定的是那个上下文对象。一般是obj.fun()；
- 如果以上都不是，那么使用默认绑定。如果在严格模式下，则绑定到undefined，否则绑定到全局对象(node环境的全局对象是globalThis，浏览器环境就是window)；
- 如果把null或者undefined作为this的绑定对象传入call、apply或者bind，这些值在调用时会被忽略，实际应用的是默认绑定规则；
- 如果是箭头函数，箭头函数的this继承的是外层代码块的this。

最后，this指向还需要多加练习，本文只是列举了个大概，只有不断练习才能熟练掌握哦~  
有错误，欢迎指正哦~

## 4. 思考

### 4.1. 思考1

```js
var number = 5;
var obj = {
    number: 3,
    fn: (function () {
        var number;
        this.number *= 2;
        number = number * 2;
        number = 3;
        return function () {
            var num = this.number;
            this.number *= 2;
            console.log(num);
            number *= 3;
            console.log(number);
        }
    })()
}
var myFun = obj.fn;
myFun.call(null);
obj.fn();
console.log(window.number);
```

**解析**：

- 定义阶段：在定义obj的时候，fn对应的闭包就执行了。执行闭包中的代码、返回函数时，显然这里不是new绑定 (没有new关键字)，不是显示绑定 (没有call, aply, bind)，不是隐式绑定(没有obj.fun())，所以是默认绑定，this指向的是全局变量window。数据变化过程如下：

```js
  var number; //新声明的number。因为是闭包，这个number不会被销毁。
  this.number *= 2; // this指向window，所以window.number：5 * 2 --> 10.
  number = number * 2; // 没有通过this调用，这里number是闭包中新声明的那个。闭包的number：undefined --> NAN.
  number = 3; // 闭包的number: NAM --> 3.
```

- var myFun = obj.fn：将obj.fn的引用赋值给myFun。这里很明显的隐式绑定丢失，所以应该是默认绑定，myFun的this会指向全局变量window。只是赋值操作，没有方法调用，所以数据不变。
- myFun.call(null)：用了call，但第一个参数是null，所以还是应用默认绑定。数据变化如下：

```js
// myFunc
function () {
    var num = this.number; // this指向window。所以num === window.number，值为10.
    this.number *= 2; // this指向window。所以window.number：10 * 2 --> 20.
    console.log(num); // num的值为10，打印10.
    number *= 3; // 没有通过this调用，这里number是闭包中的那个。闭包的number：3 * 3 --> 9.
    console.log(number); // 打印闭包的number，打印9.
}
```

- obj.fn()：典型的默认绑定，这里this指向obj。因此数据变化如下：

```js
// obj.fn
function () {
    var num = this.number; // this指向obj。所以num === obj.number，值为3.
    this.number *= 2; // this指向obj。所以obj.number: 3 * 2 --> 6.
    console.log(num); // num为3，打印3
    number *= 3; //  没有通过this调用，这里number是闭包中的那个。闭包的number：9 * 3 --> 27.
    console.log(number); // 打印闭包的number，打印27
}
```

- console.log(window.number)：此时，window.number值为20。
- 所以，最后打印的结果依次是：10, 9, 3, 27, 20。

[回到前言](#前言)

### 4.2. 思考2

问题：显示绑定 - 如果希望绑定不会丢失，要怎么做？  
解答：在调用fn的时候，也给它做个显示绑定。

```js
function getName(){
    console.log('Name: ', this.name);
}
var laohuang = {
    name: 'laohuang',
    getName: getName
}
var name = 'FEHuang';
var getNameCopy = function(fn) {
  fn().bind(this);
};
getNameCopy.call(laohuang, laohuang.getName);
```

[回到显示绑定](#典型的显示绑定)

## 5. 参考

- [嗨，你真的懂this吗？](https://juejin.cn/post/6844903805587619854)
- [MDN - this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)
- [面试官问：JS的this指向](https://juejin.cn/post/6844903746984476686)

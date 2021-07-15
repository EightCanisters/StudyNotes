# this指向

## 前言

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
惊不惊喜，意不意外？如果你比较容易就答对了，那说明你对this的理解还是非常到位的。不然，就跟我一块来看看这篇文章吧~

## this是啥？

在讨论this的时候，一般都会说“指向xxx”。this就是一个指针，在了解具体指向之前，我们先引入几个名词：

- 默认绑定
- 隐式绑定
- 显示绑定
- new绑定

而且它们的**优先级**：```new绑定 > 显示绑定 > 隐式绑定 > 默认绑定```。

### 默认绑定

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

### 隐式绑定

- 函数的调用是通过某个对象调的，或者说调用位置上存在对象，也即```obj.fn()```；
- this指向对象属性链中最后一层。比如```obj1.obj2.obj3.fn(), this指向obj3```；
- 隐式绑定存在绑定丢失的情况。请记住：`obj.fn()`是隐式绑定，但如果`fn()`前啥都没有，属于默认绑定。

#### 典型的```obj.fn```

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

#### this指向对象属性链中最后一层

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

#### 隐式绑定的大陷阱 - 绑定丢失

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

**解析**：`var getNameCopy = laohuang.getName`将`getName`的引用赋值给了`getNameCopy`，`getNameCopy`直接指向`getName方法`。`getNameCopy()`前啥都没有，所以它是**隐式绑定**，`this`指向**全局上下文**。所以控制台会打印：`Name: FEHuang`。

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

### 显示绑定

- 显示绑定就是通过`call`,`apply`,`bind`的方式，显式的指定`this`所指向的对象。
- `call`,`apply`和`bind`的第一个参数，就是对应函数的`thi`s所指向的对象。`call`和`apply`的作用一样，只是传参方式不同。`call`和`apply`都会执行对应的函数，而`bind`方法不会。
- 注意`call`,`apply`的特殊传参会被转换：传null/undefined --> 全局上下文；原始值 --> 对象(非严格模式)/原始值(严格模式)

#### 经典显示绑定

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

#### 显示绑定中也可能会遇到绑定丢失

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
**思考**: 如果希望绑定不会丢失，要怎么做？(答案在最后的思考中)

#### call, apply, bind的特殊传参

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

### new绑定


## 思考

### 显示绑定 - 如果希望绑定不会丢失，要怎么做？

在调用fn的时候，也给它做个显示绑定。

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

## 参考

- [嗨，你真的懂this吗？](https://juejin.cn/post/6844903805587619854)
- [MDN - this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)
- [面试官问：JS的this指向](https://juejin.cn/post/6844903746984476686)

## 1. instanceof简介

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)是这样描述的：  
`instanceof`运算符用于检测构造函数的`prototype`属性是否出现在某个实例对象的**原型链**上。

## 2. 手写instanceof

```js
function myInstanceof(left, right) {
  // 获取构造函数的原型
  const consPrototype = right.prototype
  // 获取实例对象的原型
  let objPrototype = left.__proto__;
  // 判断构造函数的原型是否出现在实例对象的原型链上
  while (true) {
    if(objPrototype === null || objPrototype === undefined) {
      return false;
    }
    if(objPrototype === consPrototype) {
      return true;
    }
    objPrototype = objPrototype.__proto__;
  }
}
```

再验证一下，看看是否和`instanceof`一致：

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);

myInstanceof(auto, Car); // true
myInstanceof(auto, Object); // true
myInstanceof(auto, Function); // false
```

✌一致哒~

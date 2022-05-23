> MDN对[`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)的解释是这样的：
> `new`创建一个用户定义的对象类型的实例或者具有构造函数的内置对象的实例。

## 1. new到底做了什么

`new`会进行如下的操作：

1. 新生成一个对象：创建一个空的简单JacaScript对象（即`{}`）；
2. 链接到原型：为步骤1新创建的对象添加属性`__proto__`，将该属性链接至构造函数的原型对象；
3. 绑定`this`：将步骤1新创建的对象作为`this`的上下文；
4. 返回新对象：如果该构造函数没有返回对象，则返回`this`（即步骤1新建的对象）。

由步骤4可知，如果构造函数有返回值可能会有意想不到的结果。到底是什么样的结果，我们一起来试试🤔

## 2. 构造函数返回值对new的影响

### 2.1. 构造函数无返回值

栗子🌰：

```js
function Person(name, sex) {
  this.name = name;
  this.sex = sex;
}

Person.prototype.sayHi = function() {
  return 'Hi, ' + this.name;
}

const zs = new Person('张三', '男');
console.log('zs实例：', zs);
console.log('zs说Hi：', zs.sayHi());
```

打印结果如下：  
![](http://rc9frlwp7.hn-bkt.clouddn.com/new-构造函数无返回值.png)

从打印结果可以看出：

- 构造函数无返回值时，`new`出了一个`Person`的实例`zs`。恰好验证了上节中的步骤一和四；
- 实例`zs`可以访问到构造函数原型中的属性`sayHi`。也就是说：通过`new`，实例与构造函数通过原型链链接了起来，验证了步骤二；
- 实例`zs`通过`new`，拥有了`name`和`sex`属性，恰好验证了步骤三。

### 2.2. 构造函数返回基本类型

栗子🌰：

```js
function Person(name, sex) {
  this.name = name;
  this.sex = sex;
  return '匿名';
}

Person.prototype.sayHi = function() {
  return 'Hi, ' + this.name;
}

const zs = new Person('张三', '男');
console.log('zs实例：', zs);
console.log('zs说Hi：', zs.sayHi());
```

打印结果：  
与构造函数无返回值时完全一致。

从打印结果可以看出：
构造函数如果返回基本类型（虽然例子中只有返回了一个字符串，但是你可以试试其他的原始值，结果还是一样的），那么这个返回值毫无意义。

### 2.3. 构造函数返回对象

栗子🌰：

```js
function Person(name, sex) {
  this.name = name;
  this.sex = sex;
  return {
    name: '匿名鬼'
  };
}

Person.prototype.sayHi = function() {
  return 'Hi, ' + this.name;
}

const zs = new Person('张三', '男');
console.log('zs实例：', zs);
console.log('zs说Hi：', zs.sayHi());
```

打印结果：  
![](http://rc9frlwp7.hn-bkt.clouddn.com/new-构造函数返回对象.png)

从打印结果可以看出：
构造函数如果返回值为对象，那么这个返回值会被正常使用，`new`将无效。

### 2.4. 小结

- 构造函数有返回值且返回值为对象，那么`new`会无效化，直接返回这个对象；
- 构造函数无返回值或返回值为原始值(基本类型)，那么`new`会被正常使用，返回新建的实例。

## 3. 手写new

```js
function create(Con, ...args) {
  // 创建一个空对象，并将空对象的__protp__设置为构造函数的prototype
  // 也可以写成：const obj = new Object(); Object.setPrototypeOf(obj, Con.prototype)
  let obj = Object.create(Con.prototype); 
  // 绑定this，执行构造函数
  let result = Con.apply(obj, args);
  // 若构造函数返回值result为对象，返回对象(create无效)；否则返回刚刚的空对象obj
  return result instanceof Object ? result : obj;
}
```

再验证一下，看看是否和`new`一致：

```js
function P(name, sex) {
  this.name = name;
  this.sex = sex;
  return {
    name: '匿名鬼'
  };
}
P.prototype.sayHi = function() {
  return 'Hi, ' + this.name;
}

function Person(name, sex) {
  this.name = name;
  this.sex = sex;
}
Person.prototype.sayHi = function() {
  return 'Hi, ' + this.name;
}

// 见证奇迹的时刻：
create(P, '张三', '男');
create(Person, '李四', '女');
```

打印结果：  
![](http://rc9frlwp7.hn-bkt.clouddn.com/手写create.png)

✌，看起来跟`new`一致呢~

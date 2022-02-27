## 1. [`Set`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

ES6 提供了新的数据结构`Set`，它**类似于数组**。`Set`对象允许你存储任何类型的**唯一**值，无论是**原始值**或者是**对象引用**。

先来瞅瞅Set的结构：  
![](https://gitee.com/ahuang6027/blog-images/raw/master/images/Set结构.png)

### 1.1. Set的基本使用

- `Set`本身是一个构造函数，用来生成`Set数据结构`：

  ```js
  const s = new Set();

  [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

  for (let i of s) {
    console.log(i);
  }
  // 2 3 5 4
  ```

- 可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化：

  ```js
  // 例一 接受数组作为参数
  const set = new Set([1, 2, 3, 4, 4]);
  [...set]
  // [1, 2, 3, 4]

  // 例二 接受数组作为参数
  const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
  items.size // 5

  // 例三 接受类似数组的对象作为参数
  const set = new Set(document.querySelectorAll('div'));
  set.size // 56

  // 类似于
  const set = new Set();
  document
  .querySelectorAll('div')
  .forEach(div => set.add(div));
  set.size // 56
  ```

- 向 Set 加入值的时候，不会发生类型转换：  
  向 Set 加入值的时候，不会发生类型转换，所以`5`和`"5"`是两个不同的值。`Set`内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它**类似于精确相等运算符（===）**，主要的**区别**是向`Set`加入值时认为**NaN等于自身**，而精确相等运算符认为NaN不等于自身。

  ```js
  // Set内部认为NaN等于自身
  let set = new Set();
  let a = NaN;
  let b = NaN;
  set.add(a);
  set.add(b);
  set // Set {NaN}

  // 需要注意，就算是Set内，{}和{}也不相等
  let set = new Set();
  set.add({});
  set.size // 1
  set.add({});
  set.size // 2
  ```

### 1.2. Set实例的属性

Set 结构的实例有以下属性：

- `Set.prototype.constructor`：构造函数，默认就是Set函数；
- `Set.prototype.size`：返回Set实例的成员总数。

### 1.3. Set实例的方法

Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。

#### 1.3.1. 操作方法（增`add`删`delete`查`has`清`clear`）

- `Set.prototype.add(value)`：添加某个值，返回`Set`结构本身。
- `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
- `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
- `Set.prototype.clear()`：清除所有成员，没有返回值。

```js
const s = new Set();
s.add(1).add(2).add(2);
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false
```

#### 1.3.2. 遍历方法（`keys, values, entries, forEach`）

`Set`结构的实例有四个遍历方法，可以用于遍历成员：

- `Set.prototype.keys()`：与`values()`方法相同，返回一个**新的迭代器对象**，该对象包含Set对象中的按插入顺序排列的所有元素的值；
- `Set.prototype.values()`：返回一个**新的迭代器对象**，该对象包含Set对象中的按插入顺序排列的所有元素的值；
- `Set.prototype.entries()`：返回一个**新的迭代器对象**，该对象包含Set对象中的按插入顺序排列的所有元素的值的`[value, value]`数组。为了使这个方法和Map对象保持相似，每个值的键和值相等；
- `Set.prototype.forEach(callbackFn[, thisArg])`：按照插入顺序，为Set对象中的每一个值调用一次`callBackFn`。如果提供了`thisArg`参数，回调中的`this`会是这个参数。
  
需要特别指出的是，**Set的遍历顺序就是插入顺序**。这个特性有时非常有用，比如使用`Set`保存一个回调函数列表，调用时就能保证按照添加顺序调用。

迭代器也称遍历器，都是指Iterator，下文也有写成遍历器的地方，不要在意，都是指Iterator。

##### 1.3.2.1. `keys()`, `values()`, `entries()`

`keys`方法、`values`方法、`entries`方法返回的都是**迭代器对象**。由于`Set`结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。

```js
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

`Set`结构的实例**默认可遍历**，它的默认遍历器生成函数就是它的`values`方法。

```js
Set.prototype[Symbol.iterator] === Set.prototype.values
// true
```

这意味着，可以省略`values`方法，直接用`for...of`循环遍历`Set`：

```js
let set = new Set(['red', 'green', 'blue']);

for (let x of set) {
  console.log(x);
}
// red
// green
// blue
```

##### 1.3.2.2. `forEach(callbackFn[, thisArg])`

- Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值。
- 这里需要注意，Set 结构的键名就是键值（两者是同一个值），因此回调的第一个参数与第二个参数的值永远都是一样的。

```js
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9
```

### 1.4. Set的应用

#### 1.4.1. 数组/字符串去重

扩展运算符（`...`）内部使用`for...of`循环，所以也可以用于`Set`结构。

```js
// 数组去重1：借助Set+拓展运算符...
[...new Set([1, 2, 3, 3, 4, 4, 5])]; // [1, 2, 3, 4, 5]
// 数组去重2：借助Set+Array.from()
Array.from(new Set([1, 2, 3, 3, 4, 4, 5])); // Array.from方法可以将 Set 结构转为数组。

// 字符串去重
[...new Set('ababbc')].join(''); // "abc"
```

#### 1.4.2. 取数组的并集（Union）、交集（Intersect）和差集（Difference）

利用拓展运算符`...`，数组的`map`和`filter`方法也可以间接用于`Set`了。

```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

#### 1.4.3. 在遍历操作中改变原来的`Set`结构

```js
// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6
```

## 2. [`WeakSet`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

`WeakSet`对象允许你将弱保持对象存储在一个集合中。它的结构与`Set`类似，也是不重复的值的集合。

先来瞅瞅结构：
![](https://gitee.com/ahuang6027/blog-images/raw/master/images/WeakSet结构.png)

### 2.1. `WeakSet`与`Set`的区别

`WeakSet`和`Set`对象的区别有两点。

#### 2.1.1. `WeakSet`**只能是对象的集合**，而不能是任何类型的任意值

  ```js
  const ws = new WeakSet();
  ws.add(1)
  // TypeError: Invalid value used in weak set
  ws.add(Symbol())
  // TypeError: invalid value used in weak set
  ```

#### 2.1.2. `WeakSet`持**弱引用**

`WeakSet`集合中对象的引用为弱引用，即垃圾回收机制不考虑`WeakSet`对该对象的引用。如果没有其他的对`WeakSet`中对象的引用，那么这些对象会被当成垃圾回收掉。这也意味着WeakSet中没有存储当前对象的列表。正因为这样，**`WeakSet`是不可枚举的**。

### 2.2. WeakSet的基本使用

- `WeakSet`是一个构造函数，可以使用`new`命令，创建`WeakSet`数据结构。
- 作为构造函数，`WeakSet`可以接受一个**数组或类似数组的对象**作为参数。（实际上，任何具有 Iterable 接口的对象，都可以作为 WeakSet 的参数。）该数组的所有成员，都会自动成为 WeakSet 实例对象的成员。

  ```js
  const a = [[1, 2], [3, 4]];
  const ws = new WeakSet(a);
  // WeakSet {[1, 2], [3, 4]}

  // WeakSet的成员只能是对象
  const b = [3, 4];
  const ws = new WeakSet(b); // Uncaught TypeError: Invalid value used in weak set(…)
  ```

### 2.3. WeakSet实例的方法

- `WeakSet.prototype.add(value)`：向`WeakSet`实例添加一个新成员；
- `WeakSet.prototype.delete(value)`：清除`WeakSet`实例的指定成员；
- `WeakSet.prototype.has(value)`：返回一个布尔值，表示某个值是否在`WeakSet`实例之中。
- **注**：`WeakSet`没有`size`属性，没有办法遍历它的成员。
  
```js
const ws = new WeakSet();
const obj = {};
const foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false

ws.delete(window);
ws.has(window);    // false
```

## 3. [`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

> JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。为了解决这个问题，ES6提供了`Map`数据结构。它**类似于对象**，也是键值对的集合，但是“键”的范围**不限于字符串，各种类型的值（包括对象）都可以当作键**。也就是说，`Object`结构提供了“字符串—值”的对应，`Map`结构提供了“值—值”的对应，是一种更完善的Hash结构实现。如果你需要“键值对”的数据结构，`Map`比`Object`更合适。

`Map`对象保存键值对，并且**能够记住键的原始插入顺序**。**任何值(对象或者原始值)** 都可以作为一个键或一个值。

先来瞅瞅它的结构：  
![](https://gitee.com/ahuang6027/blog-images/raw/master/images/Map结构.png)

### 3.1. Map的基本使用

#### 3.1.1. 作为构造函数时的参数

不仅仅是数组，**任何具有`Iterator`接口、且每个成员都是一个双元素的数组的数据结构**都可以当作Map构造函数的参数。

- 使用一般数组作参：

  ```js
  // 
  const arrMap = new Map([
    ['name', '张三'],
    ['title', 'Author']
  ]);
  arrMap.size // 2
  arrMap.has('name') // true
  arrMap.get('name') // "张三"
  arrMap.has('title') // true
  arrMap.get('title') // "Author"
  ```

- 使用`Set`或`Map`作参：

  ```js
  const set = new Set([
    ['foo', 1],
    ['bar', 2]
  ]);
  const m1 = new Map(set);
  m1.get('foo') // 1

  const m2 = new Map([['baz', 3]]);
  const m3 = new Map(m2);
  // 这里m2和m3的结构打印出来完全一致
  m2.get('baz') // 3
  m3.get('baz') // 3
  ```

#### 3.1.2. Map键的特点

- 如果对同一个键多次赋值，后面的值将覆盖前面的值：

  ```js
  const map = new Map();

  map
  .set(1, 'aaa')
  .set(1, 'bbb');

  map.get(1) // "bbb"
  ```

- 只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心：

  ```js
  const map = new Map();

  map.set(['a'], 555);
  map.get(['a']) // undefined
  ```

- 如果`Map`的键是一个**简单类型**的值（数字、字符串、布尔值），则只要两个值**严格相等**，`Map`将其视为一个键。  
  所以`0`和`-0`就是一个键，`布尔值true`和`字符串true`则是两个不同的键，`undefined`和`null`也是两个不同的键

  ```js
  let map = new Map();

  map.set(-0, 123);
  map.get(+0) // 123

  map.set(true, 1);
  map.set('true', 2);
  map.get(true) // 1

  map.set(undefined, 3);
  map.set(null, 4);
  map.get(undefined) // 3
  ```

- 虽然NaN不严格相等于自身，但`Map`将其视为同一个键。

  ```js
  let map = new Map();
  map.set(NaN, 123);
  map.get(NaN) // 123
  ```

### 3.2. Map实例的属性

- `Map.prototype.size`：返回 Map 结构的成员总数。

  ```js
  const map = new Map();
  map.set('foo', true);
  map.set('bar', false);

  map.size // 2
  ```

### 3.3. Map实例的方法

与Set类似，也分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。

#### 3.3.1. 操作方法（增改`set`删`delete`查`has, get`清`clear`）

##### 3.3.1.1. `Map.prototype.set(key, value)`

- 设置键名`key`对应的键值为`value`，然后返回整个`Map`结构。如果`key`已经有值，则键值会被更新，否则就新生成该键。
- set方法返回的是当前的Map对象，因此可以采用链式写法。

```js
const m = new Map();

m.set('edition', 6)        // 键是字符串
m.set(262, 'standard')     // 键是数值
m.set(undefined, 'nah')    // 键是 undefined

// 链式写法
let map = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');
```

##### 3.3.1.2. `Map.prototype.get(key)`

`get`方法读取`key`对应的键值，如果找不到`key`，返回`undefined`。

```js
const m = new Map();
const hello = function() {console.log('hello');};
m.set(hello, 'Hello ES6!') // 键是函数
m.get(hello)  // Hello ES6!
```

##### 3.3.1.3. `Map.prototype.has(key)`

`has`方法返回一个布尔值，表示某个键是否在当前`Map`对象之中。

```js
const m = new Map();

m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');

m.has('edition')     // true
m.has('years')       // false
m.has(262)           // true
m.has(undefined)     // true
```

##### 3.3.1.4. `Map.prototype.delete(key)`

`delete`方法删除某个键，成功返回`true`。如果删除失败，返回`false`。

```js
const m = new Map();
m.set(undefined, 'nah');
m.has(undefined)     // true

m.delete(undefined)
m.has(undefined)       // false
```

##### 3.3.1.5. `Map.prototype.clear(key)`

`clear`方法清除所有成员，没有返回值。

```js
let map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
map.clear()
map.size // 0
```

#### 3.3.2. 遍历方法（`keys, values, entries, forEach`）

Map 结构原生提供三个遍历器生成函数和一个遍历方法。

- `Map.prototype.keys()`：返回键名的遍历器。
- `Map.prototype.values()`：返回键值的遍历器。
- `Map.prototype.entries()`：返回所有成员的遍历器。
- `Map.prototype.forEach(callbackFn[, thisArg])`：遍历 Map 的所有成员。对Map对象中出现的每个键值对按插入顺序调用callbackFn一次。如果向forEach提供了thisArg参数，它将被用作每次回调的this值。
  
需要特别注意的是，Map 的遍历顺序就是插入顺序。

```js
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
```

### 3.4. 与其他数据结构转换

#### 3.4.1. `Map`转为数组

`Map`转为数组最方便的方法，就是使用扩展运算符（`...`）。

```js
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
```

#### 3.4.2. 数组转为`Map`

将数组传入`Map`构造函数，就可以转为`Map`。

```js
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }
```

#### 3.4.3. `Map`转为对象

如果所有`Map`的键都是字符串，它可以无损地转为对象。

```js
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
```

如果有非字符串的键名，那么这个键名会被转成字符串，再作为对象的键名。

#### 3.4.4. 对象转为`Map`

对象转为`Map`可以通过`Object.entries()`。

```js
let obj = {"a":1, "b":2};
let map = new Map(Object.entries(obj));
此外，也可以自己实现一个转换函数。

function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}
```

#### 3.4.5. `Map`转为`JSON`

`Map`转为`JSON`要区分两种情况。

一种情况是，`Map`的键名都是字符串，这时可以选择转为对象`JSON`。

```js
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'
```

另一种情况是，`Map`的键名有非字符串，这时可以选择转为数组`JSON`。

```js
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'
```

#### 3.4.6. `JSON`转为`Map`

`JSON`转为`Map`，正常情况下，所有键名都是字符串。

```js
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}
```

但是，有一种特殊情况，整个`JSON`就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为`Map`。这往往是`Map`转为数组`JSON`的逆操作。

```js
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}
```

## 4. [`WeakMap`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

`WeakMap`结构与`Map`结构类似，也是用于生成键值对的集合。

先来瞅瞅它的结构：  
![](https://gitee.com/ahuang6027/blog-images/raw/master/images/WeakMap结构.png)

### 4.1. WeakMap与Map的区别

`WeakMap`与`Map`的区别有两点。

#### 4.1.1. `WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名

  ```js
  const map = new WeakMap();
  map.set(1, 2)
  // TypeError: 1 is not an object!
  map.set(Symbol(), 2)
  // TypeError: Invalid value used as weak map key
  map.set(null, 2)
  // TypeError: Invalid value used as weak map key
  ```

#### 4.1.2. `WeakMap`的键名所指向的对象，不计入垃圾回收机制

WeakMap的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。一旦不再需要这个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放它占用的内存。一旦忘记手动删除，就会造成内存泄露。

WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。

注意，**WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用**。

```js
const wm = new WeakMap();
let key = {};
let obj = {foo: 1};

wm.set(key, obj);
obj = null;
wm.get(key)
// Object {foo: 1}

// 键值obj是正常引用。所以，即使在 WeakMap 外部消除了obj的引用，WeakMap 内部的引用依然存在。
```

### 4.2. WeakMap实例的属性和方法

`WeakMap`与`Map`在API上的区别主要是两个：

- 没有遍历操作：即**没有**`keys()`、`values()`和`entries()`方法，也**没有**`size`属性。因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。
- 无法清空，即**不支持`clear`**方法。
  
因此，`WeakMap`只有四个方法可用：`get()`、`set()`、`has()`、`delete()`。

### 4.3. WeakMap的用途

#### 4.3.1. DOM 节点作为键名

```js
let myWeakmap = new WeakMap();

myWeakmap.set(
  document.getElementById('logo'),
  {timesClicked: 0})
;

document.getElementById('logo').addEventListener('click', function() {
  let logoData = myWeakmap.get(document.getElementById('logo'));
  logoData.timesClicked++;
}, false);
```

上面代码中，`document.getElementById('logo')`是一个`DOM`节点，每当发生`click`事件，就更新一下状态。我们将这个状态作为键值放在`WeakMap`里，对应的键名就是这个节点对象。一旦这个`DOM`节点删除，该状态就会自动消失，不存在内存泄漏风险。

#### 4.3.2. 部署私有属性

```js
const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
// DONE
```

上面代码中，Countdown类的两个内部属性_counter和_action，是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏。


- 在方法名或变量名前加上static关键字之后，就表示该方法不会被实例继承，而是直接通过类来调用。

  ```js
  class People {
    static getName() {
      console.log('名字');
    }
  }
  People.getName(); // 名字

  const p1 = new People();
  p1.getName(); // TypeError: p1.getName is not a function
  ```

- 注意：
  - 如果静态方法包含this关键字，这个this指的是类，而不是实例；
  - 静态方法可以与非静态方法重名（因为非静态方法其实是放在prototype里的），类调用自身的方法时，会优先查找静态方法。
  
  例：

  ```js
  class People {
    static getName() {
      this.printName()
    }
    static printName() {
      console.log('当前的this：', this);
    }
    // 这个getName会被放到People的prototype里
    getName() {
      console.log('性别');
    }
  }

  People.getName(); // 打印了类People本身
  ```

上面代码中，静态方法`getName`调用打印了`this`，这里的`this`指的是`People类`，而不是`People的实例`，等同于调用`People.printName()`。另外，从这个例子还可以看出，静态方法可以与非静态方法重名。

- 父类的静态方法，可以被子类继承；

  ```js
  class People {
    static getName() {
      console.log('名字');
    }
  }

  class Girl extends People {
    constructor(){
      super();
    }
  }

  Girl.getName(); //名字
  ```

- 静态方法也可以从`super`对象上调用：
- `super`可作为函数和对象使用：
  - 当作为函数使用时，只可在子类的构造函数中使用，表示父类的构造函数，但是 `super`中的`this`指向的是子类的实例，因此在子类中`super()`表示的是`Parent.prototype.constructor.call(this)`。
  - 当作为对象使用时，`super`表示父类原型对象，即`Parent.prototype`。

  ```js
  class People {
    static getName() {
      return '名字'
    }
  }

  class Girl extends People {
    static getName() {
      console.log('super调用' + super.getName());
    }
  }

  Girl.getName(); // super调用名字
  ```

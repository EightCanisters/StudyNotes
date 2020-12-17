/**
 * namespace模式：简单对象封装
 * 作用：减少全局变量
 * 问题：不安全，数据不是私有的，能直接更改模块内部变量值
 */

let myModule2 = {
  data: 'module2 data',
  foo() {
    console.log(`module2 foo() ${this.data}`);
  },
  bar() {
    console.log(`module2 bar() ${this.data}`);
  }
}
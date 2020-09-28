/**
 * namespace模式：简单对象封装
 * 作用：减少了全局变量
 * 问题：不安全（数据是私有的，外部课可以直接修改）
 */

let myModule = {
  data: "module1's data",
  foo() {
    console.log(`module1 foo() ${this.data}`);
  },
  bar() {
    console.log(`module1 bar() ${this.data}`);
  }
}
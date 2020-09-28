/**
 * 全局函数模式：将不同的功能封装成不同的全局函数
 * 问题：global被污染了，很容易引起命名冲突
 */

var data1 = 'data'; //相当于window.data1 = 'data';
// let data1 = 'data'; //此时window.data1为undefined;

function foo() {
  console.log('foo()');
  var b = 'foo函数里边的变量';
  console.log('打印b', b);
  console.log('打印window.b', window.b);
}

function bar() {
  console.log('bar()');
}

console.log(this) // window
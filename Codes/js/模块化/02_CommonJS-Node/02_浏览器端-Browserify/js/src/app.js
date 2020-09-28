/**
 * 1. 定义暴露模块
 *  module.exports = value;
 *  exports.xxx = value;
 * 2. 引入模块
 *  var module = require(模块名或模块路径);
 */

 //根目录下运行browserify js/src/app.js -o js/dist/bundle.js打包js

 'use strict'

 //引用模块
 let module1 = require('./module1');
 let module2 = require('./module2');
 let module3 = require('./module3');
 let uniq = require('uniq');
 let fs = require('fs');

 //使用模块
 module1.foo(); //module1 foo()
 module2(); // module2() 
 module3.foo(); //moduls3 foo()
 module3.bar(); //module3 bar()

 console.log(uniq([1,3,1,4,3])); // [ 1, 3, 4 ]

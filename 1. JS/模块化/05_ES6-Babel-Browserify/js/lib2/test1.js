'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test1Incre = exports.test1Count = undefined;

var _module = require('./module1');

console.log('test1 - 初始count：', _module.count);
(0, _module.increment)();
console.log('test1 - 自增一次：', _module.count);

var test1Count = _module.count;
var test1Incre = _module.increment;
exports.test1Count = test1Count;
exports.test1Incre = test1Incre;
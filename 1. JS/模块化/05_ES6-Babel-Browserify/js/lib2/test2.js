'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.test2Incre = exports.test2Count = undefined;

var _module = require('./module1');

console.log('test2 - 初始count：', _module.count);

var test2Count = _module.count;
var test2Incre = _module.increment;
exports.test2Count = test2Count;
exports.test2Incre = test2Incre;
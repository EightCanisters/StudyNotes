'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.increment = increment;
var count = exports.count = 1;
function increment() {
  exports.count = count += 1;
  console.log('module内部：', count);
}
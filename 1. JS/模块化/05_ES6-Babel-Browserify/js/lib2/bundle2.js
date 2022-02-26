(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _test = require('./test1');

var _test2 = require('./test2');

console.log('main中：', _test.test1Count, _test2.test2Count, _test.test1Incre === _test2.test2Incre);
},{"./test1":3,"./test2":4}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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
},{"./module1":2}],4:[function(require,module,exports){
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
},{"./module1":2}]},{},[1]);

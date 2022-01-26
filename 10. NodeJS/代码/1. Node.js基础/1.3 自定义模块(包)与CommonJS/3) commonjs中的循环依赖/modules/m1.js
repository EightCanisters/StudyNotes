console.log('m1开始执行');

exports.done = false;
const m2 = require('./m2');
console.log('m1中-打印m2.done: ', m2.done);

exports.done = true;
console.log('m1执行完毕');

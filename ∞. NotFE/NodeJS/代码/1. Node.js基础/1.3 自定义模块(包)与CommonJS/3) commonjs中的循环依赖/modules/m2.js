console.log('m2开始执行');

exports.done = false;
const m1 = require('./m1');
console.log('m2中-打印m1.done: ', m1.done);

exports.done = true;
console.log('m2执行完毕');

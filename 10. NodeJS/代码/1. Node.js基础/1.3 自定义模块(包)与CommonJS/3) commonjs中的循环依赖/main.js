console.log('main开始执行');
const m1 = require('./modules/m1');
const m2 = require('./modules/m2');

console.log('main中-打印m1和m2的done', m1.done, m2.done);

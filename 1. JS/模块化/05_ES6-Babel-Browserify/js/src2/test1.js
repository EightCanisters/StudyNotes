import { count, increment } from './module1';

console.log('test1 - 初始count：', count);
increment();
console.log('test1 - 自增一次：', count);

const test1Count = count;
const test1Incre = increment;
export {test1Count, test1Incre};

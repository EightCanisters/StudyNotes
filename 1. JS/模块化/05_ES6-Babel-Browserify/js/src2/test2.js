import { count, increment } from './module1';

console.log('test2 - 初始count：', count);

const test2Count = count;
const test2Incre = increment;
export {test2Count, test2Incre};

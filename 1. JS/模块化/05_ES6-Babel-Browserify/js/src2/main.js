import { test1Count, test1Incre } from './test1';
import { test2Count, test2Incre } from './test2';

console.log('main中：', test1Count, test2Count, test1Incre === test2Incre);

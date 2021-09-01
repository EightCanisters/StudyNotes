import { mul } from './test';
import '../styles/index.css';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

const a = mul(2, 3);
// eslint-disable-next-line
console.log(a);
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));

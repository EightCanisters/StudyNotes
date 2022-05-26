import { mul } from './test';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(mul(2, 3));
// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));

// 注册serviceWorker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        // eslint-disable-next-line
        console.log('sw注册成功了');
      })
      .catch(() => {
        // eslint-disable-next-line
        console.log('sw注册失败了');
      });
  });
}

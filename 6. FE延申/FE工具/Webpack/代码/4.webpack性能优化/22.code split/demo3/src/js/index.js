function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4));

/**
 * 通过动态import，将某个文件被单独打包成chunk
 */
import(/* webpackChunkName: 'test' */'./test')
  .then(({ mul, count }) => {
    // eslint-disable-next-line
    console.log('文件加载成功~', mul(2, 5), count(6, 3));
  })
  .catch(() => {
    // eslint-disable-next-line
    console.log('文件加载失败~');
  })

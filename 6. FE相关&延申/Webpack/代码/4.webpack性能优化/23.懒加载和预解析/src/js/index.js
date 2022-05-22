console.log('index.js文件被加载了~');

// 懒加载：当文件需要使用时才加载
document.getElementById('btn').onclick = function() {
  import(/* webpackChunkName: 'test' */'./test')
    .then(({ mul }) => {
      console.log('test.js加载成功了~ ', mul(3, 4))
    })
    .catch(() => {
      console.log('test.js加载失败了~')
    })
};

/**
 * 预加载（prefetch）：在文件使用前，提前加载js文件
 *  - 与正常加载的区别：
 *    - 正常加载：可以认为是并行加载（同一时间加载多个文件）；
 *    - 预加载：等其他资源加载完毕，在浏览器空闲的时候，再偷偷加载资源。
 */
// document.getElementById('btn').onclick = function() {
//   import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test')
//     .then(({ mul }) => {
//       console.log('test.js加载成功了~ ', mul(3, 4))
//     })
//     .catch(() => {
//       console.log('test.js加载失败了~')
//     })
// };

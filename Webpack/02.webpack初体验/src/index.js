/**
 * index.js: webpack入口起点文件
 * 
 * 1. 运行指令
 *    开发环境：webpack ./src/index.js -o ./build_dev/ --mode=development
 *             含义：webpack会以./src/index.js为入口文件开始打包，打包后输出到./build_dev/main.js，整体打包环境是开发环境
 *    生产环境：webpack ./src/index.js -o ./build_prod/ --mode=production
 *             含义：webpack会以./src/index.js为入口文件开始打包，打包后输出到./build_prod/main.js，整体打包环境是生产环境
 * 2. 结论
 *    1) webpack能自动处理js、json文件; 不能处理css、img等其他资源；
 *    2) 生产环境和开发环境将ES6模块化编译成浏览其能识别的模块化；
 *    3) 生产环境比开发环境多一个压缩js代码；
 */

import data from './test.json';
// import './index.css';

console.log(data);

function add(x, y) {
  return x + y;
}

add(1, 2)
console.log(add(1, 2))
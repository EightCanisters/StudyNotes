/**
 * process.argv：获取控制台输入的参数
 *  - 返回：数组，数组第一项是node的安装位置，第二项是当前运行文件所在位置，从第三项开始才是控制台输入的参数。
 */

console.log("process.argv: ", process.argv);
console.log("输入的参数: ", process.argv.slice(2));

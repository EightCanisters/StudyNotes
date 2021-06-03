/**
 * IIFE模式增强：引入依赖
 * 这是现代模块实现的基石
 */
(function(window, $){
  let data = 'www.baidu.com';
  function foo() {
    console.log(`foo() ${data}`);
    $('body').css('background', 'red');
  }
  function bar() {
    console.log(`bar() ${data}`)
    otherFun();
  }
  function otherFun() {
    console.log('otherFun()')
  }

  //暴露行为
  window.myModule = {foo, bar}
})(window, jQuery)
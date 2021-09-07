/**
 * 作用：数据是私有的，外部只能通过暴露的方法操作
 * 编码：将数据和行为封装到一个函数内部，通过给window添加属性来向外暴露接口
 * 问题：如果当前这个模块依赖另一个模块怎么办？
 */

(function(window){
  let data = 'www.baidu.com';
  function foo() {
    console.log(`foo() ${data}`)
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
})(window)
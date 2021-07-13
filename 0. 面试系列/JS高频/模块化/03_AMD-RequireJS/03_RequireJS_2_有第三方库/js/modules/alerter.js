// 定义有依赖的模块
define(['dataService', 'jquery'], function(dataService, $) {
  let name = 'Tom';
  function showMsg() {
    alert(dataService.getMsg() + ', ' + name);
  }
  $('body').css('background', 'green');
  return { showMsg }
})
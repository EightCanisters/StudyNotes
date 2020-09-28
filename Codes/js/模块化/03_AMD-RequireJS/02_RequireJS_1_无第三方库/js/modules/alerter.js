// 定义有依赖的模块
define(['dataService'], function(dataService) {
  let name = 'Tom';
  function showMsg() {
    alert(dataService.getMsg() + ', ' + name);
  }
  return { showMsg }
})
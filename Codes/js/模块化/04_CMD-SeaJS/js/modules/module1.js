define(function(require, exports, module) {
  //内部变量数据
  var data = 'asdfajogda';
  //内部函数
  function show() {
    console.log('module1 show()' + data)
  };

  exports.show = show;
})
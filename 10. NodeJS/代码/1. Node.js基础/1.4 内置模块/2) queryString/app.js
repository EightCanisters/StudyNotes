const querystring = require('querystring');

// parse方法
var qs = 'x=3&y=4';
var parsed = querystring.parse(qs);
console.log(parsed);

// stringify方法
var qo = {
  x: 3,
  y: 4,
};
var parsed = querystring.stringify(qo);
console.log(parsed);

// escape方法
var str = 'id=3&city=北京&url=https://www.baidu.com';
var escaped = querystring.escape(str);
console.log(escaped);

// unescape方法
var str =
  'id%3D3%26city%3D%E5%8C%97%E4%BA%AC%26url%3Dhttps%3A%2F%2Fwww.baidu.com';
var unescaped = querystring.unescape(str);
console.log(unescaped);

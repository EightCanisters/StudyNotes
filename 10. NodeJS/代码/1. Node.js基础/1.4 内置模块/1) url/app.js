const url = require('url');

// parse方法
const urlString =
  'https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110';
const parsedStr = url.parse(urlString);
console.log(parsedStr);

// format方法
const urlObject = {
  protocol: 'https:',
  slashes: true,
  auth: null,
  host: 'www.baidu.com:443',
  port: '443',
  hostname: 'www.baidu.com',
  hash: '#tag=110',
  search: '?id=8&name=mouse',
  query: { id: '8', name: 'mouse' },
  pathname: '/ad/index.html',
  path: '/ad/index.html?id=8&name=mouse',
  href: 'https://www.baidu.com:443/ad/index.html?id=8&name=mouse#tag=110',
};
const parsedObj = url.format(urlObject);
console.log(parsedObj);

// resolve方法
var a = url.resolve('/one/two/three', 'four');
var b = url.resolve('http://example.com/', '/one');
var c = url.resolve('http://example.com/one', '/two');
console.log(a + ',' + b + ',' + c);

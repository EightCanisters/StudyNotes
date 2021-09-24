const fs=require('fs');
const http=require('http');
const url=require('url');
const path=require('path');

// 手写一个简单的静态服务器
const server=http.createServer((req, res) => {
  const {pathname}=url.parse(req.url);
  const filePath=path.join(__dirname, pathname);

  fs.stat(filePath, (err, stats) => {
    if(err) {
      res.statusCode=404;
      res.end('Not found!');
    } else {
      if(stats&&stats.isFile()) {
        console.log(filePath)
        res.setHeader('Cache-Control', 'no-cache'); // 关掉强缓存
        const mtime=stats.mtime.toUTCString(); // mtime: 指示最后一次修改此文件的时间戳。

        // 拿到请求头中的 if-modified-since，与文件最后一次的修改时间作比较：
        //  1）若相等，状态码置为304返回给浏览器；
        //  2）若不等，设置响应头Last-Modified值为文件修改时间
        if(req.headers['if-modified-since']==mtime) {
          res.statusCode=304;
          res.end();
        } else {
          res.setHeader('Last-Modified', mtime)
          fs.createReadStream(filePath).pipe(res);
        }
      } else {
        res.statusCode=404;
        res.end('Not found!')
      }
    }
  })
});

server.listen(3000, console.log('server listening on 3000'));
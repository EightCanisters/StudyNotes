const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');

// 手写一个简单的静态服务器
const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    const filePath = path.join(__dirname, pathname);

    fs.stat(filePath, (err, stats) => {
        if(err) {
            res.statusCode = 404;
            res.end('Not found!');
        }
        if(stats?.isFile()) {
            console.log(filePath)
            // 设置后：第一次请求后30秒内再发请求都走浏览器缓存
            res.setHeader('Cache-Control', 'max-age=600'); // max-age单位为秒，相对时间
            res.setHeader('Expires', new Date(Date.now() + 1000 * 600).toUTCString()); // expires针对低版本浏览器，且设置的是绝对时间
            fs.createReadStream(filePath).pipe(res);
        } else {
            res.statusCode = 404;
            res.end('Not found!')
        }
    })
});

server.listen(3000, console.log('server listening on 3000'));
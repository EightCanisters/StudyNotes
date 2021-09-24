const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');

// 手写一个简单的静态服务器
const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    const filePath = path.join(__dirname, pathname);

    // fs.stat - 根据地址检查文件是否存在，而不对其进行操作。并在回调中返回文件的状态信息。http://nodejs.cn/api/fs.html#fs_fs_stat_path_options_callback
    fs.stat(filePath, (err, stats) => {
        if(err) {
            res.statusCode = 404;
            res.end('Not found!');
        }
        // 如果该路径指向一个文件，设置缓存；否则返回状态404
        if(stats?.isFile()) {
            console.log(filePath)
            // 设置后：第一次请求后30秒内再发请求都走浏览器缓存
            res.setHeader('Cache-Control', 'max-age=30'); // max-age单位为秒，相对时间
            res.setHeader('Expires', new Date(Date.now() + 1000 * 30).toUTCString()); // expires针对低版本浏览器，且设置的是绝对时间
            fs.createReadStream(filePath).pipe(res);
        } else {
            res.statusCode = 404;
            res.end('Not found!')
        }
    })
});

server.listen(3000, console.log('server listening on 3000'));
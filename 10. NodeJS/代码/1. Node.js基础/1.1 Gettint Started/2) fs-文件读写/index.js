const fs = require("fs");

fs.writeFile("./test.txt", "这是写入的内容", (err, data) => {
  if (!err) {
    console.log("文件创建成功");
  }
});

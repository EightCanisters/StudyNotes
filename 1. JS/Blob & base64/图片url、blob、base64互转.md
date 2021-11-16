## base64优缺点

**优点：**
base64格式的图片是文本格式，占用内存小，转换后的大小比例大概为1/3，降低了资源服务器的消耗；
网页中使用base64格式的图片时，不用再请求服务器调用图片资源，减少了服务器访问次数。
base64编码的字符串，更适合不同平台、不同语言的传输；
算法是编码, 不是压缩, 编码后只会增加字节数，但是算法简单, 几乎不会影响效率，算法可逆, 解码很方便, 不用于私密信息通信;
解码方便, 但毕竟编码了, 肉眼还是不能直接看出原始内容;

**缺点：**
base64格式的文本内容较多，存储在数据库中增大了数据库服务器的压力；
网页加载图片虽然不用访问服务器了，但因为base64格式的内容太多，所以加载网页的速度会降低，可能会影响用户的体验。
base64无法缓存，要缓存只能缓存包含base64的文件，比如js或者css，这比直接缓存图片要差很多，而且一般HTML改动比较频繁，所以等同于得不到缓存效益。

## 图片url转base64

**思路如下：**

- 构造一个img元素，将url赋给img;
- 等待图片加载完成;
- 构造一个canvas元素;
- 将img元素画到canvas上;
- 通过canvas的api将url转化为base64.

```js
// 原理： 利用canvas.toDataURL的API转化成base64
function urlToBase64(url) {
  return new Promise((resolve, reject) => {
    let image = new Image();
    // CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
    image.setAttribute("crossOrigin", 'anonymous');
    image.src = url;
    image.onload = function () {
      let canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      // 将图片插入画布并开始绘制
      canvas.getContext('2d').drawImage(image, 0, 0);
      const result = canvas.toDataURL('image/png');
      resolve(result);
      canvas = null;
    };
    // 图片加载失败的错误处理
    image.onerror = () => {
      reject(new Error('图片流异常'));
    }
  })
}
```

调用：

```js
let imgUrL = `./test.png`; // 在同级目录下新建一个图片
urlToBase64(imgUrL).then(res => {
  // 转化后的base64图片地址
  console.log('base64', res);
})
```

## base64转blob

**思路如下：**

- 从base64数据中获取类型和base64字符串;
- 利用atob方法，将base64字符串解码;
- 将解码后的字符串转换为Uint8Array;
- 最后转换为blob.

```js
function base64ToBlob(b64Data) {
  return new Promise((resolve, reject) => {
    // 从b64Data中获取类型、base64字段
    const [mimeStr, b64Str] = b64Data.split(',');

    // 转换成blob
    let dB64Str = atob(b64Str),
      mime = mimeStr.match(/:(.*?);/)[1],
      n = dB64Str.length,
      u8Arr = new Uint8Array(n);
    while (n--) {
      u8Arr[n] = dB64Str.charCodeAt(n)
    }
    resolve(new Blob([u8Arr], { type: mime }));
  })
}
```

调用：

```js
const base64Data = 'data:image/png;base64,xxxxxxx==';
base64ToBlob(base64Data).then(data => {
  console.log('TODO: > file: test.html > line 40 > base64ToBlob > data', data);
});
```

## blob转base64

```js
function blobToBase64(blobData) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(blobData);
    fileReader.onload = e => {
      resolve(e.target.result);
    }
    fileReader.onerror = () => {
      reject(new Error('文件流异常'));
    };
  })
}
```

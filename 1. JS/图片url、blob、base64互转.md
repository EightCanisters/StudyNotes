## 前言

## 图片 url 转 base64

```js
// 原理： 利用canvas.toDataURL的API转化成base64
function urlToBase64(url) {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.onload = function () {
      let canvas = document.createElement('canvas');
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      // 将图片插入画布并开始绘制
      canvas.getContext('2d').drawImage(image, 0, 0);
      const result = canvas.toDataURL('image/png');
      resolve(result);
    };
    // CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
    image.setAttribute('crossOrigin', 'Anonymous');
    image.src = url;
    // 图片加载失败的错误处理
    image.onerror = () => {
      reject(newError('图片流异常'));
    };
  });
}
let imgUrL = `https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/2/12/168e107f524b1b76~tplv-t2oaga2asx-watermark.awebp`;
urlToBase64(imgUrL).then((res) => {
  // 转化后的base64图片地址
  console.log('base64', res);
});
```

调用：

```js
let imgUrL = `https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/2/12/168e107f524b1b76~tplv-t2oaga2asx-watermark.awebp`;
this.getDataUri(imgUrL).then((res) => {
  // 转化后的base64图片地址
  console.log('base64', res);
});
```

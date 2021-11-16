## 1. 前言

> 工作中遇到需要将图片url转换为base64的场景，搜索出来一个方法👇  
>
> ![function urlToBase64](https://gitee.com/ahuang6027/blog-images/raw/master/images/urlToBase64.png)
>
> 这个方法使用了canvas, dataURL相关的知识。顺藤摸瓜找下去，就出现了这篇文章。

**我们的目标🚩：**

1. 以Blob为起点，了解Blob, File, FileReader, Buffer, ArrayBuffer, TypedArrays, DataView， Canvas的属性和方法，画出它们的关系图；
2. 搞清楚DataURL、BlobURL是什么，它们有哪些异同；
3. 以上面两点为支撑，得出涉及到这些对象、概念的转换关系。

## 2. 属性方法总览

### 2.1. [Blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)

Blob 对象表示一个不可变、原始数据的类文件对象。它的数据可以按文本或二进制的格式进行读取，也可以转换成 ReadableStream 来用于数据操作。

#### (1) 构造函数

```js
// Blob() 构造函数返回一个新的 Blob 对象。 blob的内容由参数数组中给出的值的串联组成。
var aBlob = new Blob( array, options );
```

**🍡参数：**

- array：是一个由`ArrayBuffer`, `ArrayBufferView`, `Blob`, `DOMString`等对象构成的`Array` ，或者其他类似对象的混合体，它将会被放进 Blob。DOMStrings会被编码为UTF-8；
  - DOMString：是一个UTF-16字符串。由于JavaScript已经使用了这样的字符串，所以DOMString 直接映射到 一个String；
  - ArrayBuffer：用来表示通用的、固定长度的**原始二进制数据缓冲区**。它是一个字节数组，通常在其他语言中称为“byte array”。
- options：可选，可以指定如下两个属性：
  - type：默认值为 ""，它代表了将会被放入到blob中的数组内容的MIME类型。
  - endings：默认值为"transparent"，用于指定包含行结束符\n的字符串如何被写入。它是以下两个值中的一个：
    - "native"：代表行结束符会被更改为适合宿主操作系统文件系统的换行符；
    - "transparent"：代表会保持blob中保存的结束符不变。

**🌰栗子：**

```js
//🌰1：创建一个包含DomString对象的Blob对象
const domstringBlob = new Blob(['<div>AHuang</div>'], { type: 'text/xml' });
console.log(domstringBlob); // Blob {size: 17, type: 'text/xml'}

//🌰2：创建一个包含ArrayBuffer对象的Blob对象
const abf = new ArrayBuffer(8);
const abfBlob = new Blob([abf], { type: 'text/plain' });
console.log(abfBlob); // Blob {size: 8, type: 'text/plain'}

// 🌰3：创建一个包含ArrayBufferView对象的Blob对象
const abf1 = new ArrayBuffer(8);
const abfv = new Int16Array(abf1);
const abfvBlob = new Blob(abfv, { type: 'text/plain' });
console.log(abfvBlob); // Blob {size: 4, type: 'text/plain'}
```

#### (2) 属性

| 属性名 | 描述 |
| :--- | :---------------- |
| size (只读) | Blob 对象中所包含数据的大小（字节）。 |
| type (只读) | 一个字符串，表明该 Blob 对象所包含数据的 MIME 类型。如果类型未知，则该值为空字符串。 |

#### (3) 方法

| 方法名 | 描述 |
| :--- | :---------- |
| slice([start[, end[, contentType]]]) | 返回一个新的 Blob 对象，包含了源 Blob 对象中指定范围内的数据。 |
| stream() | 返回一个能读取blob内容的 ReadableStream。 |
| text() | 返回一个promise且包含blob所有内容的UTF-8格式的 USVString。 |
| arrayBuffer() | 返回一个promise且包含blob所有内容的二进制格式的 ArrayBuffer。 |

### 2.2. [File](https://developer.mozilla.org/zh-CN/docs/Web/API/File)

File对象是特殊类型的`Blob`，且可以用在任意的`Blob`类型的context中。比如说，`FileReader`, `URL.createObjectURL()`, `createImageBitmap()`(en-US), 及`XMLHttpRequest.send()`都能处理`Blob`和`File`。

#### (1) 构造函数

```js
// Blob() 构造函数返回一个新的 Blob 对象。 blob的内容由参数数组中给出的值的串联组成。
var myFile = new File(bits, name[, options]);
```

**🍡参数：**

- bits：一个包含ArrayBuffer，ArrayBufferView，Blob，或者 DOMString 对象的 Array — 或者任何这些对象的组合。这是 UTF-8 编码的文件内容；
- name：USVString，表示文件名称，或者文件路径。
- options：可选；选项对象，包含文件的可选属性。可用的选项如下：
  - type: DOMString，表示将要放到文件中的内容的 MIME 类型。默认值为 "" 。
  - lastModified: 数值，表示文件最后修改时间的 Unix 时间戳（毫秒）。默认值为 Date.now()。
  
**🌰栗子：**

```js
const file = new File(["foo"], "foo.txt", {
  type: "text/plain",
});
```

#### (2) 属性

| 属性名 | 描述 |
| :--- | :---------------- |
| lastModified (只读) | 返回当前 File 对象所引用文件最后修改时间。 |
| name (只读) | 返回当前 File 对象所引用文件的名字。 |
| size (只读) | 返回文件的大小。 |
| webkitRelativePath (只读) | 返回 File 相关的 path 或 URL。 |
| type (只读) | 返回文件的 多用途互联网邮件扩展类型（MIME Type）。 |

#### (3) 方法

File 对象没有自己的实例方法，由于继承了 Blob 对象，因此可以使用 Blob 的实例方法slice()。

#### (4) File的获取

![File的获取](https://gitee.com/ahuang6027/blog-images/raw/master/images/file的来源.png)

##### a. 选择文件返回的FileList对象

```html
<input type="file" multiple id="select-file">
<script>
  const inputEl = document.getElementById('select-file');
  inputEl.onchange = function (e) {
    const files = e.target.files;
    const file = files[0];
    console.log(files); // FileList {0: File, 1: File, length: 2}
    console.log(files instanceof FileList); // true
    console.log(file.__proto__.__proto__); // Blob {arrayBuffer: ƒ, slice: ƒ, stream: ƒ, …}
  }
</script>
```

##### b. 拖拽操作生成DataTransfer对象

```html
<div style="width: 200px;height: 150px; border: 1px solid blue;" ondrop="dropHandler(event)"
  ondragover="dragOverHandler(event)">拖拽生效区</div>

<script>
  function dropHandler(e) {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files); // FileList {0: File, length: 1}
    console.log(files instanceof FileList); // true
  };
  function dragOverHandler(e) {
    e.preventDefault();
  }
</script>
```

### 2.3. Buffer

`Buffer`是`Node.js`提供的对象，前端没有。 它一般应用于`IO操作`，例如接收前端请求数据时候，可以通过Buffer相关的API创建一个专门存放二进制数据的缓存区对接收到的前端数据进行整合，一个Buffer类似于一个整数数组，但它对应于V8堆内存之外的一块原始内存。

### 2.4. [ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

`ArrayBuffer`表示固定长度的二进制数据的原始缓冲区，它的作用是分配一段可以存放数据的连续内存区域，因此对于高密度的访问（如音频数据）操作而言它比JS中的`Array`速度会快很多，`ArrayBuffer`存在的意义就是作为数据源提前写入在内存中，因此其长度固定。

#### (1) 构造函数

```js
// 返回一个指定大小的 ArrayBuffer 对象，其内容被初始化为 0
new ArrayBuffer(length);
```

**🍡参数：**

- length：要创建的`ArrayBuffer`的大小，单位为**字节**。
  
**🌰栗子：**

```js
const buffer = new ArrayBuffer(8);
console.log(buffer.byteLength); // 8
```

#### (2) 属性

| 属性名 | 描述 |
| :--- | :---------------- |
| length | ArrayBuffer 构造函数的 length 属性，其值为1。 |
| byteLength (只读) | 表示 ArrayBuffer 的byte的大小，在ArrayBuffer构造完成时生成，不可改变。 |

#### (3) 方法

| 方法名 | 描述 |
| :--- | :---------------- |
| isView(arg) | 如果参数是 ArrayBuffer 的视图实例则返回 true，例如 类型数组对象 或 DataView 对象；否则返回 false。 |
| slice(begin[, end]) | 返回一个新的 ArrayBuffer ，它的内容是这个ArrayBuffer的字节副本，从begin（包括），到end（不包括）。 |

#### (4) ❗注意

不能直接操作`ArrayBuffer`的内容，而是要通过`类型数组对象(TypedArrays)`或`DataView`对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。

### 2.5. 操作ArrayBuffer内容的对象

#### 2.5.1. [TypedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)

类型化数组(TypedArrays)是JavaScript中新出现的一个概念，专为访问原始的二进制数据而生，本质上，类型化数组和ArrayBuffer是一样的，只不过是他具备读写功能。

##### (1) ❗注意

TypedArray只是一个概念分类，不是对象，以下都是TypedArray：

| 名称 | 大小（以字节为单位） | 说明 |
| :--- | :--- | :--- |
| Int8Array | 1 | 8位有符号整数 |
| Uint8Array | 1 | 8位无符号整数 |
| Uint8ClampedArray | 1 | 8位无符号整型固定数组 |
| Int16Array | 2 | 16位有符号整数 |
| Uint15Array | 2 | 16位无符号整数 |
| Int32Array | 4 | 32位有符号整数 |
| Uint32Array | 4 | 32位无符号整数 |
| Float32Array | 4 | 32位浮点数 |
| Float64Array | 8 | 64位浮点数 |

**🌰栗子:**

让我们看看ArrayBuffer的本质：

```js
// 创建一个8字节的ArrayBuffer  
var b = new ArrayBuffer(8);  
  
// 创建一个指向b的视图v1，采用Int32类型，开始于默认的字节索引0，直到缓冲区的末尾  
var v1 = new Int32Array(b);  
  
// 创建一个指向b的视图v2，采用Uint8类型，开始于字节索引2，直到缓冲区的末尾  
var v2 = new Uint8Array(b, 2);  
  
// 创建一个指向b的视图v3，采用Int16类型，开始于字节索引2，长度为2  
var v3 = new Int16Array(b, 2, 2);  
```

上面的代码里变量的数据结构如下表所示：
![](https://gitee.com/ahuang6027/blog-images/raw/master/images/arraybuffer-exp.png)

##### (2) 构造函数

```js
// 下面代码是语法格式，不能直接运行，
// TypedArray 关键字需要替换为底部列出的构造函数。
new TypedArray(); // ES2017中新增
// length: 当传入 length 参数时，一个内部的数组缓冲区会被创建在内存中，该缓存区的大小（类型化数组中 byteLength 属性的值）是传入的 length 乘以数组中每个元素的字节数（BYTES_PER_ELEMENT），每个元素的值都为0。
new TypedArray(length);
// typedArray: 根据typedArray生成新的类型化数组。新生成的类型化数组对象将会有跟传入的数组相同的长度（译者注：比如原来的类型化数组的 length==2，那么新生成的数组的 length 也是 2，只是数组中的每一项进行了转化）。
new TypedArray(typedArray);
// object: 当传入一个 object 作为参数时，就像通过 TypedArray.from() 方法创建一个新的类型化数组一样。
new TypedArray(object);
// 当传入一个 buffer 参数，或者再另外加上可选参数 byteOffset 和 length 时，一个新的类型化数组视图将会被创建，并可用于呈现传入的 ArrayBuffer 实例。byteOffset 和length 参数指定了类型化数组视图将要暴露的内存范围。如果两者都未传入，那么整个buffer 都会被呈现；如果仅仅忽略 length，那么 buffer 中偏移了 byteOffset 后剩下的 buffer 将会被呈现。
new TypedArray(buffer [, byteOffset [, length]]);
```

##### (3) 属性

| 属性名 | 描述 |
| :--- | :---------------- |
| length | 类型化数组中元素的个数，例如 new Int8Array(3).length === 3。 |
| BYTES_PER_ELEMENT | 返回一个数值，代表不同类型的类型化数组对象中，单个元素的字节大小。 |

##### (4) 方法

| 方法名 | 描述 |
| :--- | :---------------- |
| from() | 使用类数组(array-like)或迭代对象创建一个新的类型化数组.参见[Array.from()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from). |
| of() | 通过可变数量的参数创建新的类型化数组.参见[Array.of()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of). |

#### 2.5.2. [DataView](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView)

`DataView`对象可以在`ArrayBuffer`中的任意位置读取和存储不同类型的二进制数据。

##### (1) 构造函数

```js
new DataView(buffer [, byteOffset [, byteLength]]);
```

**🍡参数：**

- buffer：一个 已经存在的ArrayBuffer 或 SharedArrayBuffer  对象，DataView 对象的数据源；
- byteOffset：可选。此 DataView 对象的第一个字节在 buffer 中的字节偏移。如果未指定，则默认从第一个字节开始；
- byteLength：可选。此 DataView 对象的字节长度。如果未指定，这个视图的长度将匹配buffer的长度。

##### (2) 属性

| 属性名 | 描述 |
| :--- | :---------------- |
| buffer | 表示ArrayBuffer |
| byteOffset | 指缓冲区开始处的偏移量 |
| byteLength | 指缓冲区部分的长度 |

##### (3) 方法

| 方法名 | 描述 |
| :--- | :---------------- |
| getInt8() | 在从视图开始的指定字节偏移处获取一个带符号的8位整数(字节)。 |
| setInt8() | 在从视图开始的指定字节偏移处存储一个有符号的8位整数(字节)值。 |
| ... | ...(还有很多，都是getxxx, setxxx，意思差不多) |

### 2.6. [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)

我们无法直接访问Blob或者文件对象的内容，如果想要读取它们并转化为其他格式的数据，可以借助FileReader对象的API进行操作。

#### (1) 属性

| 属性名 | 描述 |
| :--- | :---------------- |
| error (只读) | 代表在读取文件中出现的错误。 |
| readyState (只读) | 指文件读取的状态：0-empty-尚未加载任何数据；1-loading-当前正在加载数据；2-done-整个读请求已经完成。 |
| result (只读) |文件的内容。此属性仅在读取操作完成后有效，数据的格式取决于启动读取操作的方法。 |

#### (2) Event Handler

| Name | 描述 |
| :--- | :---------------- |
| onabort | 每次读取操作中止时都会触发此事件。 |
| onerror | 每次读取操作遇到错误时都会触发此事件。 |
| onload | 每次读取操作成功完成时都会触发此事件。 |
| onloadstart | 每次读取开始时都会触发此事件。 |
| onloadend | 每次读取操作完成（成功或失败）时都会触发此事件。 |
| onprogress | 读取Blob内容时触发此事件。 |

#### (3) 方法

| 方法名 | 描述 |
| :--- | :---------------- |
| abort()| 中止读取操作。返回后，readyState将是DONE。 |
| readAsArrayBuffer()| 开始读取指定的内容Blob，一旦完成，该result属性包含一个ArrayBuffer代表文件的数据。 |
| readAsBinaryString() | 开始读取指定 的内容Blob，完成后，该result属性包含来自文件的原始二进制数据作为字符串。 |
| readAsDataURL() | 开始读取指定 的内容Blob，完成后，该result属性包含data:表示文件数据的URL。 |
| readAsText()| 开始读取指定的内容Blob，完成后，该result属性包含作为文本字符串的文件内容。可以指定可选的编码名称。 |

#### (4) 🌰栗子

```js
const blob = new Blob(['<xml>foo</xml>'], { type: 'text/xml' });
console.log(blob); // Blob(14) {size: 14, type: "text/xml"}

const reader = new FileReader();
reader.onload = () => {
  console.log(reader.result);
};
reader.readAsText(blob); // <xml>foo</xml>
reader.readAsArrayBuffer(blob); // ArrayBuffer(14) {}
reader.readAsDataURL(blob); // data:text/xml;base64,PHhtbD5mb288L3htbD4
```

### 2.7. Canvas

Canvas对象元素负责在页面中设定一个区域，然后就可以通过 JavaScript 动态地在这个区域中绘制图形。

#### (1) 方法

> Canvas这块后续会有一篇文章专门讲。这里只列出部分方法。

- `toDataURL(type, encoderOptions))`：以指定格式返回 DataUrl,该方法接收两个可选参数
  - type：表示图片格式，默认为 image/png；
  - encoderOptions：表示图片的质量，在指定图片格式为 image/jpeg 或 image/webp 的情况下，可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92，其他参数会被忽略。
- `toBlob(callback, type, encoderOptions)`：创造Blob对象， 用于展示canvas的图片，默认图片类型是image/png，分辨率是96dpi
  - callback: 参数是blob对象的回调函数
- `getImageData(x,y,width,height)`：返回 ImageData 对象，该对象拷贝了画布指定矩形的像素数据。
  - x: 开始复制的左上角位置的 x 坐标。
  - y: 开始复制的左上角位置的 y 坐标。
  - width: 将要复制的矩形区域的宽度。
  - height: 将要复制的矩形区域的高度。
- putImageData(imgData,x,y,dirtyX,dirtyY,dirtyWidth,dirtyHeight)：将图像数据（从指定的 ImageData 对象）放回画布上。
  - imgData: 规定要放回画布的 ImageData 对象。
  - x: ImageData 对象左上角的 x 坐标，以像素计。
  - y: ImageData 对象左上角的 y 坐标，以像素计。
  - dirtyX: 可选。水平值（x），以像素计，在画布上放置图像的位置。
  - dirtyY: 可选。水平值（y），以像素计，在画布上放置图像的位置。
  - dirtyWidth: 可选。在画布上绘制图像所使用的宽度。
  - dirtyHeight: 可选。在画布上绘制图像所使用的高度。

## 3. BlobURL与DataURL

### 3.1. BlobURL

BlobURL（ObjectURL）是一种伪协议，只能由浏览器在内部生成，我们知道script/img/video/iframe等标签的src属性和background的url可以通过url和base64来显示，我们同样可以把blob或者file转换为url生成BlobURL来展示图像，BlobURL允许Blob和File对象用作图像，下载二进制数据链接等的URL源。

#### (1) 获取BlobURL: `createObjectURL()`

```js
// 根据不同浏览器封装一个转换BlobUrl的方法:file可以是File对象也可以是Blob对象
const getObjectURL = (file) => {
  let url;
  if (window.createObjectURL) {
    url = window.createObjectURL(file);
  } else if (window.URL) {
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL) {
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
};
```

#### (2) 🌰文件下载

```html
<button onclick="download()">下载download.txt</button>
<script>
  const getObjectURL = (file) => {
    let url;
    if (window.createObjectURL) {
      url = window.createObjectURL(file);
    } else if (window.URL) {
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL) {
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  };

  function download() {
    const fileName = 'download-test.txt';
    const currBlob = new Blob(['测试文件下载', { type: 'text/plain' }]);
    const link = document.createElement('a');
    link.href = getObjectURL(currBlob);
    console.log(link.href); // blob:http://127.0.0.1:5500/aafe9575-3016-4813-a21c-61a42eaca78d
    link.download = fileName;
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  }
</script>
```

### 3.2. DataURL

dataURL允许内容的创建者将较小的文件嵌入到文档中。与常规的URL使用场合类似。

#### (1) 语法格式

```
data:[<mediatype>][;base64],data
```

- data: 前缀;
- mediatype: 表明数据类型,是一个MIME类型字符串，如image/jpeg表示一个JPEG图片文件。如果省略，默认值为text/plain;charset=US-ASCII。
- base64: 标志位（如果是文本，则可选）
- data: 数据本身

#### (2) 获取DataUrl：三种方式

##### 法1：FileReader的`readAsDataURL()`

##### 法2：`btoa()`和`atob()`

- atob(): 负责解码已经使用base64编码了的字符串。
- btoa(): 将二进制字符串转为base64编码的ASCII字符串。

```js
btoa('<xml>foo</xml>') // "PHhtbD5mb288L3htbD4="
atob('PHhtbD5mb288L3htbD4=') // "<xml>foo</xml>"
```

##### 法3：Canvas的`toDataURL()`

1）🌰栗子：

```js
<canvas id="canvas" width="200" height="50"></canvas>
<textarea id="content" style="width: 200px; height: 200px"></textarea>

<script>
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    // canvas的绘制
    ctx.fillText('johnYu', 10, 30);
    // 获取 Data URL
    document.getElementById('content').value = canvas.toDataURL();
  }
</script>
```

2）结果：
![](https://gitee.com/ahuang6027/blog-images/raw/master/images/dataURL-canvas.png)

如果我们将前面的返回结果`data:text/xml;base64,PHhtbD5mb288L3htbD4=`放在浏览器的地址栏中，可以看到canvas的内容。

### 3.3. 区别

BlobURL基本用法与DataUrl相同，都可以通过将其放在地址栏中进行检查也可以用作普通URL使用。
但是，存在以下差异。

1. BlobUrl始终是唯一字符串，即时你每次传递相同的Blob，每次也会生成不同的BlobUrl；DataUrl值跟随blob变化；
2. 就BlobUrl而言，它并不代表数据本身，数据存储在浏览器中，BlobUrl只是访问它的key，数据会一直有效，直到关闭浏览器或者手动清除。而DataUrl是直接编码的数据本身，因此关闭浏览器后仍然可以在地址栏访问后DataUrl；
3. BlobUrl的长度一般比较短，但DataUrl因为直接存储图片base64编码后的数据，往往很长(Base64编码的数据体积通常会比二进制格式的图片体积大1/3。)，因此当显式大图片时，使用BlobUrl能获取更好的可能性，速度和内存比DataUrl更有效；
4. BlobUrl可以方便的使用XMLHttpRequest获取源数据（xhr.responseType = 'blob'）。对于DataUrl，并不是所有浏览器都支持通过XMLHttpRequest获取源数据的；
5. BlobUrl除了可以用作图片资源的网络地址，BlobUrl也可以用作其他资源的网络地址，例如html文件、json文件等，为了保证浏览器能正确的解析BlobUrl返回的文件类型，需要在创建Blob对象时指定相应的type；

   ```js
    const createDownload = (fileName, content) => {
      const blob = new Blob([content], { type: 'text/html' });
      const link = document.createElement('a');
      link.innerHTML = fileName;
      link.download = fileName;
      link.href = getObjectURL(blob);
      document.getElementsByTagName('body')[0].appendChild(link);
    };
    createDownload('download.html', '<button>foo</button>');
   ```

6. DataUrl不会被浏览器缓存，这意味着每次访问这样页面时都被下载一次。这是一个使用效率方面的问题——尤其当这个图片被整个网站大量使用的时候。但是小部分可以通过css缓存。

## 4. 转换关系

祭出大图👇
![](https://gitee.com/ahuang6027/blog-images/raw/master/images/blob转换.png)

###

## 5. 使用场景

### 图像灰度化

主要使用canvas和imageData的转换，思路：

- 获取示意图片副本；
- 取得副本的图像数据；
- 图像数据的灰度计算；
- 重新设置副本的图像数据。

```html
<body>
    <button onclick="drawngray()">黑白图片</button>
    <img src="./syz.jpg" alt="" />
    <canvas id="myCanvas">canvas</canvas>
    <script>
      var drawngray = function () {
        var myCanvas = document.getElementById('myCanvas');
        if (myCanvas.getContext) {
          var context = myCanvas.getContext('2d');
          var image = document.images[0];
          // 动态设置canvas的大小
          myCanvas.width = image.width;
          myCanvas.height = image.height;
          var imageData, data, i, len, average, red, green, blue, alpha;
          //绘制原始图像
          context.drawImage(image, 0, 0);
          //取得图像数据
          imageData = context.getImageData(0, 0, image.width, image.height);
          data = imageData.data;
          for (i = 0, len = data.length; i < len; i += 4) {
            red = data[i];
            green = data[i + 1];
            blue = data[i + 2];
            // alpha = data[i + 3];
            //求得 rgb 平均值
            average = Math.floor((red + green + blue) / 3);
            //设置颜色值，透明度不变
            data[i] = average;
            data[i + 1] = average;
            data[i + 2] = average;
          }

          //回写图像数据并显示结果
          imageData.data = data;
          context.putImageData(imageData, 0, 0);
        }
      };
    </script>
  </body>

```

### 图片压缩

**compress.js：**

```js
const MAX_WIDTH = 800; // 图片最大宽度

function compress(base64, quality, mimeType) {
  let canvas = document.createElement('canvas');
  let img = document.createElement('img');
  img.crossOrigin = 'anonymous';
  return new Promise((resolve, reject) => {
    img.src = base64;
    img.onload = () => {
      let targetWidth, targetHeight;
      if (img.width > MAX_WIDTH) {
        targetWidth = MAX_WIDTH;
        targetHeight = (img.height * MAX_WIDTH) / img.width;
      } else {
        targetWidth = img.width;
        targetHeight = img.height;
      }
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      let ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, targetWidth, targetHeight); // 清除画布
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      // 通过toDataURL压缩后的base64
      let imageData = canvas.toDataURL(mimeType, quality / 100);
      resolve(imageData);
    };
  });
}
```

**test.html：**

```html
  <body>
    <input type="file" accept="image/*" onchange="loadFile(event)" />
    <script src="./compress.js"></script>
    <script>
      function dataUrlToBlob(base64) {
        var arr = base64.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
      }

      function uploadFile(url, blob) {
        let formData = new FormData();
        let request = new XMLHttpRequest();
        // 封装到FormData中进行文件的上传
        formData.append('image', blob);
        request.open('POST', url, true);
        request.send(formData);
      }

      const loadFile = function (event) {
        const reader = new FileReader();
        reader.onload = async function () {
          let compressedDataURL = await compress(reader.result, 90, 'image/jpeg');
          // 压缩后将base64转为Blob 对象减少传输数据量
          let compressedImageBlob = dataUrlToBlob(compressedDataURL);
          uploadFile('https://httpbin.org/post', compressedImageBlob);
        };
        // 获取用户选取的图片文件,通过FileReader转化成base64
        reader.readAsDataURL(event.target.files[0]);
      };
    </script>
  </body>
```

### 分片上传

```js
<body>
    <input type="file" name="file" onchange="selfile();" />

    <script>
      const url = 'https://httpbin.org/post';
      /**
       * @param file 原始文件
       * @param chunkSize 默认每次上传分片大小
       */
      async function chunkedUpload(file, chunkSize = 1024 * 1024 * 5) {
        // 将文件拆分成chunkSize大小的分块，然后每次请求只需要上传这一个部分的分块即可
        for (let start = 0; start < file.size; start += chunkSize) {
          // File对象继承自Blob对象，因此可以使用slice方法对大文件进行切
          const chunk = file.slice(start, start + chunkSize + 1);
          const fd = new FormData();
          fd.append('data', chunk);

          await fetch(url, { method: 'post', body: fd })
            .then((res) => res.text())
            .then((res) => console.log(res)); // 打印上传结果
        }
      }

      function selfile() {
        let file = document.querySelector('[name=file]').files[0];

        // 自定义分片大小
        const LENGTH = 1024 * 1024 * 1;
        chunkedUpload(file, LENGTH);
      }
    </script>
  </body>
```

服务器接收到这些切片后，再将他们拼接起来就可以了，下面是PHP拼接切片的示例代码:

```php
$filename = './upload/' . $_POST['filename'];//确定上传的文件名
//第一次上传时没有文件，就创建文件，此后上传只需要把数据追加到此文件中
if(!file_exists($filename)){
    move_uploaded_file($_FILES['file']['tmp_name'],$filename);
}else{
    file_put_contents($filename,file_get_contents($_FILES['file']['tmp_name']),FILE_APPEND);
    echo $filename;
}
```

测试时记得修改nginx的server配置，否则大文件可能会提示413 Request Entity Too Large的错误。

```js
server {
 // ...
 client_max_body_size 50m;
}

```

## 6. 参考

- [聊聊JS的二进制家族：Blob、ArrayBuffer和Buffer](https://zhuanlan.zhihu.com/p/97768916)
- [你不知道的 Blob](https://juejin.cn/post/6844904178725158926#heading-0)
- [「多图预警」那些年，被blob虐过的程序猿觉醒了！](https://juejin.cn/post/6916675943343849479)
- [我用一文总结File base64 Blob对象之间切换自如](https://juejin.cn/post/7017575277102366733)
- [图像RGB值、灰度值、像素值的关系](https://blog.csdn.net/weixin_43042467/article/details/107047960)

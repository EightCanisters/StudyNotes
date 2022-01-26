# 页面性能监控
## 指标
一个页面性能差的话会大大影响用户体验。用户打开页面等待的太久，可能会直接关掉页面，甚至就不再使用了，这种情况在移动端更加明显，移动端用户对页面响应延迟容忍度很低。
为了帮助开发者更好地衡量和改进前端页面性能，W3C性能小组引入了 [Navigation Timing](https://www.w3.org/TR/navigation-timing/#processing-model)，实现了自动、精准的页面性能打点；开发者可以通过 window.performance 属性获取。
![](https://cdn.nlark.com/yuque/0/2021/png/703037/1618801734979-d4c69612-d04b-42d9-989b-a0aaccabe97d.png?x-oss-process=image%2Fresize%2Cw_750%2Climit_0#from=url&id=jxvz0&margin=%5Bobject%20Object%5D&originHeight=448&originWidth=750&originalType=binary&ratio=1&status=done&style=none)


使用以上指标可以得到Web端关键性能指标

| 指标 | 描述 | 计算公式 |
| --- | --- | --- |
| FMP（First Meaningful Paint） | 首次有意义的渲染时间（首屏时间） | 参见[FMP技术实现方案](https://zhuanlan.zhihu.com/p/44933789?spm=a2c63.p38356.879954.9.34aa14c8TZvrKO) |
| FPT（First Paint Time） | 首次渲染时间（白屏时间）：从请求开始到浏览器开始解析第一批HTML文档字节的时间差 | responseEnd - fetchStart |
| TTI（Time to Interact） | 首次可交互时间：页面达到完全可交互状态所需要的时间 | domInteractive - fetchStart |
| Ready | HTML加载完成时间，如果页面有同步执行的JS，则同步JS执行时间=Ready-TTI | domContentLoadEventEnd - fetchStart |
| Load | 页面完全加载时间：首次渲染时间+DOM解析耗时+同步JS执行+资源加载耗时 | loadEventStart - fetchStart |
| FirstByte | 首包时间 | responseStart - domainLookupStart |
| DNS | DNS查询耗时 | domainLookupEnd - domainLookupStart |
| TCP | TCP连接耗时 | connectEnd - connectStart |
| TTFB（Time to First Byte） | 请求响应耗时 | responseStart - requestStart |
| Trans | 内容传输耗时 | responseEnd - responseStart |
| DOM | DOM解析耗时 | domInteractive - responseEnd |
| Res | 资源加载耗时：表示页面中的同步加载资源 | loadEventStart - domContentLoadedEventEnd |
| SSL | SSL安全连接耗时：只在HTTPS下有效 | connectEnd - secureConnectionStart |

上方表格中提到的FMP（首次有意义的渲染）指标，其实在Lighthouse 6.0 已经被废弃了，原因在于页面的任何细微差异对这个指标的影响都太大了，带来了双峰分布（bimodal distribution）的不一致性问题。而且这个测量太依赖浏览器的实现细节了，意味着没法在所有浏览器中标准化。目前可以使用LCP（Largest Contentful Paint）来替代。
​

## 核心指标
基于长期以来的性能指标优化体验，最新的性能指标主要专注于加载、交互、视觉稳定，综合下来就是下面的 3 个指标：
![](https://cdn.nlark.com/yuque/0/2021/png/703037/1618903568517-be07c194-b330-4cc2-8cb2-0ec4aa24645b.png#from=url&id=vxYgj&margin=%5Bobject%20Object%5D&originHeight=333&originWidth=1080&originalType=binary&ratio=1&status=done&style=none)

- Largest Contentful Paint (LCP): 在视窗内，最大的内容元素被渲染的时间。这个指标在 Lighthouse 6.0中正式加入，并且在最终性能评分中，有高达25%的权重。是用来测量加载的性能，最好保证在 2.5 秒以内出现。
- First Input Delay (FID): 第一次输入延迟，用于测量可交互性。应该在 100 毫秒以内。
- Cumulative Layout Shift (CLS)：累计布局位移，是用来衡量视觉界面稳定性的一个指标。这个指标应该小于 0.1。

​

## 分类
### 合成监控
合成监控（Synthetic Monitoring，SYN）是一种模拟网页加载或者脚本运行来测量性能指标的方式，输出网页性能报告。这种方式的价值在于提前发现可能存在的性能问题，不依赖于用户上报。Lighthouse 就是谷歌开发的非常著名的一种合成测试工具，它既可以作为浏览器插件运行，也可以作为 cli 脚本，甚至以程序化的方式运行在你的 Node.js 代码中。


### 真实用户监控
真实用户监控（Real User Monitoring，RUM）是记录用户真实操作的一种被动监控，它的特点是用户真实的网页交互中去评估和记录性能数据。比如咱们常说的性能监控 sdk，就是为此而引入的。web-vitals 就是为了这种类型的监控而生。


# 性能调优
## 核心性能标准 (Web Vitals)
在 web性能监控指标中，Core Web Vitals 是其中最重要的核心，目前包含三个指标：

- LCP（Largest Contentful Paint） 显示最大内容元素所需时间 (衡量网站初次载入速度)
- FID（First Input Delay） 首次输入延迟时间 (衡量网站互动顺畅程度)
- CLS（Cumulative Layout Shift） 累计版面配置移转 (衡量网页元件视觉稳定性)
### LCP(Largest Contentful Paint - 最大内容渲染时间)优化
常见影响LCP的有四个因素：

- 较慢的服务器响应时间
- 渲染阻塞的js和css
- 较慢的资源加载时间
- 客户端渲染
#### 针对较慢的服务器响应时间

1. 使用cdn
   1. 查看现有同域名cdn请求数，考虑新增cdn域名分散域名并行请求限制
   1. 使用 dns-prefetch 和 preconnont （dns-prefetch可以直接使用，preconnect 可以查看目前的资源请求有没有不可缓存的，视情况单独用一个域名用的来加速[preconnect vs dns-prefetch resource hints](https://stackoverflow.com/questions/47273743/preconnect-vs-dns-prefetch-resource-hints)）
   1. http请求转https
2. 开启gzip
   1. gzip压缩等级、文件类型等设置
   1. gzip_static 调研，有继续压缩文件大小、节省nginx cpu消耗的潜力
3. 服务端渲染优化，降低TTFB(Time to First Byte)
   1. 非SEO需求数据（非文字类UI也不需要 ssr，例如图形表）放到客户端请求渲染
   1. 减少渲染端计算逻辑，合理设计接口数据结构，即拿即用
   1. 后端接口根据实际情况聚合，比如用户相关信息、产品相关信息
   1. 接口数据动态性不高且数据量大，可以在后端接口做缓存
   1. 根据业务情况，动态性要求较高的数据调整到客户端渲染，可以在nginx做html缓存，根据业务情况调整缓存时间



#### 针对渲染阻塞的js和css

1. js加载尽量防止阻塞，尽量在header中少放入js，如需放入，最好加上async标记
1. 取数重复加载的js, 埋点, jsbridge等

​

### TBT(Total Block Time)/FID(First Input Delay-首次输入延迟时间)优化
FID是一个现场数据指标，但是TBT可以作为替代品测试。针对TBT的优化想对FID也同样有效。

- 分解长任务
- 优化页面，为交互准备
- 使用Web Worker
- 减少JS执行时间

​

### CLS(Cumulative Layout Shift-累计版面配置移转)优化
常见影响CLS的因素如下：

- 未指定尺寸的图片
- 未指定尺寸的广告、嵌入元素、iframe
- 动态插入内容
- 自定义字体(引发FOIT、FOUT)
- 在更新DOM之前等待网络响应的操作

​

优化方案：

- 图片的尺寸，以及其他嵌入元素的尺寸，最开始就设定好，或者预留足够空间，这样可以有效避免布局偏移
- 利用图片宽高比的属性，可以在优化CLS的同事，做响应式布局
- 尽可能不要往已存在的内容上添加新内容
- web字体尽可能早的加载，避免产生FOIT和FOUT
- 与UI同事配合在交互上避免布局偏移
## 综合性能标准
验证工具：[https://developers.google.com/speed/pagespeed/insights/](https://developers.google.com/speed/pagespeed/insights/)

| **核心参数** | **标准** |
| --- | --- |
| 首次内容渲染时间 | 2秒内 |
| 最大内容渲染时间 | 2.5秒内 |
| 可交互时间 | 3.8秒内 |
| 首次输入延迟 | 100毫秒内 |
| 累积阻塞时长 | 300毫秒内 |
| 累积布局偏移 | 0.1内 |

​

## 优化策略

1. 减少http请求。具体一点的建议是使用sprites图片技术，合并js和css文件
1. 剥离静态资源请求到CDN
一般在主域名下的HTTP请求里都会携带大量Cookie信息，最大4KB，每个域名下最多50条。但如果仅仅访问js/css/jpeg等静态资源文件的话是不需要Cookie信息的，所以可以讲整个站点的静态资源当道一个专门的域名下，以求减小网络开销，也就是Cookie free domain；
3. 多域名存储资源
浏览器在对同一个域名下的并发请求资源数量是有上限的（IE为8个，chrome为4-6个），一个完整的html页面需要加载的资源一般已经超过100个，所以为了缩短加载速度可以将下载资源分布在多个域名下（也不能太多，DNS查询也需要耗时）；这样不仅可以增加资源加载的并发数，还可以实现静态资源Cookie Free加载；
3. 开启gzip压缩
从HTTP1.1开始，Web客户端可以通过HTTP请求中的Accept-Encoding头来表示对压缩的支持：
   1. `Accept-Encoding: gzip,deflate`
如果Web服务器看到请求中有这个头，就会使用客户端列出来的方法中的一种来进行压缩。Web服务器通过响应中的Content-Encoding来通知Web客户端：`Content-Encoding: gzip`。
   1. 在nginx中开启gzip压缩：
```nginx
server{
        gzip  on;
        gzip_comp_level 6;
        gzip_proxied any;
        gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript application/x-font-woff;
        }
```

5. 开启浏览器缓存
   1. `expires`：web服务器响应的头字段，表示浏览器在某个时间点（绝对时间点，存在服务器时区不匹配问题）之前可以使用该资源的缓存；但expires字段是HTTP 1.0的定义，现在浏览器一般默认为HTTP 1.1，所以它的作用基本可以忽略。（另一个基本可以忽略的是pragma: no-cache，由于其属于html文件内容的meta信息，所以仅有某些浏览器支持）
   1. `cache-control`：用于替换expires字段，所以优先级一般高于expires字段，cache-control的值解释如下，max-age用的是当前时间的相对值（Cache-Control: max-age=30000）。
   1. `etag`：属于HTTP 1.1的特性，具有比last-modified更高的优先级，表示有web server根据resource的path,size, last modified date进行hash后生成的值，可以判断文件在前一次响应之后是否有被修改。etag可以解决last-modified的几个问题，last-modified只能精确到秒级别，如果恰好resource在1秒内更新了，则client browser不能根据last-modifed进行判断；如果文件仅仅是被touch，文件内容没有改变，last-modified却改变了。
   1. `If-None-Match`：在client browser判断resource cache已经expire后，如果之前的response里有etag字段，则重新发出请求并带上该字段，web server收到请求后对比request里的etag和web server上resource最新生成的etag值，如果不相等，则响应整个resource并设置status code = 200，否则直接返回status code=304。
   1. `Last-Modified`：表示web server告诉client browser当前resource的最近修改时间。
   1. `If-Modified-Since`：在client browser判断resource cache已经expire后，如果之前的response里有Last-Modified字段的话，则重新发出请求并带上该字段，web server在收到请求后对比request里的Last-Modified和web server上resource的实际的修改时间，如果实际修改时间较新，则响应整个resource并设置status code=200，否则直接返回status code=304。
6. 使用静态页面

​

## 页面性能分析
### 分析工具/渠道

1. chrome自带的性能分析工具Performance
1. lighthouse
1. [https://developers.google.com/speed/pagespeed/insights/](https://developers.google.com/speed/pagespeed/insights/)
1. [https://tools.pingdom.com/](https://tools.pingdom.com/)

​

### 以Performance为例

- 在DevTools中，点击Performance面板
- 确保Screenshots复选框选中
- 点击Capture Settings（右上角的红色设置图标），展开其他设置
- CPU中选择4x slowdown，DevTools会将CPU频率限制到平时的四分之一。
![](https://cdn.nlark.com/yuque/0/2021/jpeg/2421602/1614051699726-59439c0e-f0e5-449c-bf14-049302757627.jpeg#align=left&display=inline&height=1487&margin=%5Bobject%20Object%5D&originHeight=417&originWidth=720&size=0&status=done&style=none&width=2568#from=url&id=ShrUa&margin=%5Bobject%20Object%5D&originHeight=417&originWidth=720&originalType=binary&ratio=1&status=done&style=none)
注意：如果测试其他页面，如果想测试在低端机上的性能，可以选择更低的倍数。这个只是为了更好的演示，选择了小一点的限制。
![](https://cdn.nlark.com/yuque/0/2021/jpeg/2421602/1614051699646-353e3df1-92b0-458f-bbab-1ac22d310e78.jpeg?x-oss-process=image%2Fresize%2Cw_720%2Climit_0#align=left&display=inline&height=1487&margin=%5Bobject%20Object%5D&originHeight=417&originWidth=720&size=0&status=done&style=none&width=2568#from=url&id=uKGrb&margin=%5Bobject%20Object%5D&originHeight=417&originWidth=720&originalType=binary&ratio=1&status=done&style=none)
#### 查看FPS图表
查看FPS图表（图中蓝色方框框住的部分），如果看到了红色长条，就代表帧率太低并已经影响到用户体验了。一般情况下，绿色长条越高，FPS越高。
![](https://cdn.nlark.com/yuque/0/2021/png/2421602/1614059578865-52c787a7-ee43-4368-a843-e15575531065.png?x-oss-process=image%2Fresize%2Cw_750%2Climit_0#align=left&display=inline&height=739&margin=%5Bobject%20Object%5D&originHeight=739&originWidth=800&size=0&status=done&style=none&width=800#from=url&id=FKOVX&margin=%5Bobject%20Object%5D&originHeight=693&originWidth=750&originalType=binary&ratio=1&status=done&style=none)


#### CPU图表
在FPS下面就是CPU图表，图表中的颜色和面板底部的`Summary`tab中的颜色是匹配的。CPU颜色越丰富，代表在录制过程中CPU已经最大化了。如果这段丰富颜色的长条比较长，这就暗示网站应该想办法让CPU做更少的工作了，也就是说代码逻辑需要做优化了。
![](https://cdn.nlark.com/yuque/0/2021/png/2421602/1614059578806-8b3faa56-8abd-4fd0-9523-8d0b1d367b7d.png?x-oss-process=image%2Fresize%2Cw_750%2Climit_0#align=left&display=inline&height=739&margin=%5Bobject%20Object%5D&originHeight=739&originWidth=800&size=0&status=done&style=none&width=800#from=url&id=dEsAk&margin=%5Bobject%20Object%5D&originHeight=693&originWidth=750&originalType=binary&ratio=1&status=done&style=none)
#### Frames部分
在Frames部分，如果将你的鼠标移动至绿色方块部分，会显示在该特定帧上的FPS值，此例中每帧可能远低于60FPS的目标。的确，在这个例子中，这个页面的性能很差并且能很明显地被观察到，但是在实际场景中，可能并不是那么的容易，所以，要用所有这些工具来进行综合测量。、
![](https://cdn.nlark.com/yuque/0/2021/png/2421602/1614059612831-72b4b41c-f918-44e4-85b5-083df5d05003.png?x-oss-process=image%2Fresize%2Cw_750%2Climit_0#align=left&display=inline&height=739&margin=%5Bobject%20Object%5D&originHeight=739&originWidth=800&size=0&status=done&style=none&width=800#from=url&id=JTwIm&margin=%5Bobject%20Object%5D&originHeight=693&originWidth=750&originalType=binary&ratio=1&status=done&style=none)


## 🌰优化案例-加载时间优化
打开chrome开发者工具的Network，刷新页面
![image.png](https://cdn.nlark.com/yuque/0/2021/png/2421602/1613721896447-80fbccd0-c95b-4b34-94d6-79e8aa1a994b.png?x-oss-process=image%2Fresize%2Cw_750%2Climit_0#align=left&display=inline&height=407&margin=%5Bobject%20Object%5D&name=image.png&originHeight=407&originWidth=1202&size=94582&status=done&style=none&width=1202#from=url&id=rAFVE&margin=%5Bobject%20Object%5D&originHeight=254&originWidth=750&originalType=binary&ratio=1&status=done&style=none)
然后在底部会出现当前页面加载的总体分析。可以看到dom结构加载完回话了1.38s, 页面完全加载完花了3.89s。

从上图可以看出当前页面的html文件加载花了558ms，算是比较长的，然后总共发出了79个请求。

接下来就要从html文件加载速度和请求数量入手：
### 优化html加载速度

1. 这个页面采用后端请求，在node.js日志中我们可以查看请求后端接口花了多少时间，然后让端同学优化下接口的响应速度。
1. 果页面不是经常变动的话可以添加nginx缓存，这样只会在第一次被请求到的时候会比较慢，后面由于都是从缓存返回速度就会快很多。示例：
```html
    location ~* /(hmb)(.*) {
        include /etc/nginx/conf.d/common/cache-study-shortterm.conf; # 添加上这段即可
        proxy_pass http://hz_hzzz_portal-next-msupport-pc-v3;
    }
```
从缓存返回的页面在Response Header中会带有**  X-Portal-Cache:  HIT from www.huize.com **这个头部，不是从缓存返回会带有 **X-Portal-Cache:  MISS from www.huize.com **头部。

3. 减小html体积，不必要的<style>标签和<script>标签都采用外链形式
# 参考：
[https://www.cnblogs.com/MarcoHan/p/5295398.html](https://www.cnblogs.com/MarcoHan/p/5295398.html)
[https://blog.csdn.net/smile_to_lin/article/details/88970666](https://blog.csdn.net/smile_to_lin/article/details/88970666)
[https://www.chinaz.com/web/2014/0527/353092.shtml](https://www.chinaz.com/web/2014/0527/353092.shtml)
[https://www.cnblogs.com/leo-chen-2014/p/9508534.html](https://www.cnblogs.com/leo-chen-2014/p/9508534.html)

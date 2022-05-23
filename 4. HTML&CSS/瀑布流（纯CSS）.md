## 前言

头两天面试被问到瀑布流。我是这么回答的：  

- 根据每列的宽度计算出需要展示的列数，分别用数组管理；
- 遍历API返回的数据，遍历时：比较每列展示的高度，找到最小高度列，将当前这条数据push到这个最小高度列对应的数组。

面试官听完尴尬一笑：我现在其实是在考察css😂😂😂

我下来一看，原来有个css3有种布局叫[多列布局](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Multiple-column_Layout)，里头有个属性叫[colums](https://developer.mozilla.org/zh-CN/docs/Web/CSS/columns)

## colums介绍

### 兼容性

查看[兼容性](https://caniuse.com/?search=columns)：
![](http://rc9frlwp7.hn-bkt.clouddn.com/瀑布流colums.png)

### 语法

```css
columns: 200px 3; // 简写，宽度为200px，3列
column-count: 3; // 列数
column-width: 200px; // 列宽

column-gap: 30px; // 列间间隙
column-rule: 4px outset red; // 列之间的规则的宽度、样式和颜色
column-span: all; // 属性规定元素应跨越多少列。
```

## colums实现瀑布流

### 效果

![](http://rc9frlwp7.hn-bkt.clouddn.com/瀑布流效果.png)

### 代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .box {
        width: 1440px;
        margin: 20px auto;
        columns: 3;
        column-gap: 30px;
        column-fill: revert;
    }
    .item {
      width: 100%;
      break-inside: avoid;
      margin-bottom: 30px;
      border: 1px solid lightgray;
    }
    .item img {
      width: 100%;
    }
    .item h2 {
      padding: 8px 0;
    }
    .item P {
      color: #555;
    }
  </style>
</head>

<body>
  <div class="box">
    <div class="item"><img src="http://source.unsplash.com/random/400x600" /><h2>item标题</h2><p>item1</p></div>
    <div class="item"><img src="http://source.unsplash.com/random/200x300" /><h2>item标题</h2><p>item2</p></div>
    <div class="item"><img src="http://source.unsplash.com/random/400x300" /><h2>item标题</h2><p>item3</p></div>
    <div class="item"><img src="http://source.unsplash.com/random/400x600" /><h2>item标题</h2><p>item4</p></div>
    <div class="item"><img src="http://source.unsplash.com/random/400x600" /><h2>item标题</h2><p>item5</p></div>
    <div class="item"><img src="http://source.unsplash.com/random/400x600" /><h2>item标题</h2><p>item6</p></div>
    <div class="item"><img src="http://source.unsplash.com/random/400x300" /><h2>item标题</h2><p>item7</p></div>
    <div class="item"><img src="http://source.unsplash.com/random/400x600" /><h2>item标题</h2><p>item8</p></div>
    <div class="item"><img src="http://source.unsplash.com/random/400x600" /><h2>item标题</h2><p>item9</p></div>
    <div class="item"><img src="http://source.unsplash.com/random/400x600" /><h2>item标题</h2><p>item10</p></div>
    <div class="item"><img src="http://source.unsplash.com/random/200x300" /><h2>item标题</h2><p>item11</p></div>
    <div class="item"><img src="http://source.unsplash.com/random/400x600" /><h2>item标题</h2><p>item12</p></div>
    <div class="item"><img src="http://source.unsplash.com/random/400x600" /><h2>item标题</h2><p>item13</p></div>
    <div class="item"><img src="http://source.unsplash.com/random/400x600" /><h2>item标题</h2><p>item14</p></div>
    <div class="item"><img src="http://source.unsplash.com/random/400x600" /><h2>item标题</h2><p>item15</p></div>
    <div class="item"><img src="http://source.unsplash.com/random/400x600" /><h2>item标题</h2><p>item16</p></div>
  </div>
</body>
</html>
```

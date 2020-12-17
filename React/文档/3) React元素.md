### 1. React元素

 与浏览器的 DOM 元素不同，React 元素是创建开销极小的普通对象。React DOM 会负责更新 DOM 来与 React 元素保持一致 

```jsx
const element = <h1>Hello, world</h1>;
```

### 2. 元素特点：

-  React 元素是[不可变对象](https://en.wikipedia.org/wiki/Immutable_object)。一旦被创建，你就无法更改它的子元素或者属性 。
- React只更新它需要更新的部分： React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。 

### 3. 元素渲染： [`ReactDOM.render()`](https://react.docschina.org/docs/react-dom.html#render)

```jsx
// 假设你的 HTML 文件某处有一个 <div>：
<div id="root"></div>

// 渲染：
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```


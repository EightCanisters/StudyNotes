##### 1. React所有DOM特性和属性都应是小驼峰命名方式：

如：html中tabindex --> React中tabIndex。

注意 `aria-*` 以及 `data-*` 例外，一律使用小写字母明名。

##### 2. checked

-  `<input>` 组件的 type 类型为 `checkbox` 或 `radio` 时，组件支持 `checked` 属性；
-  `defaultChecked` 是非受控组件的属性，用于设置组件首次挂载时是否被选中 。

##### 3. className

html: class --> React: className

##### 4. dangerouslySetInnerHTML

html: innerHTML --> React: dangerouslySetInnerHTML

###### 4.1 原因： 

通常来讲，使用代码直接设置 HTML 存在风险，因为很容易无意中使用户暴露于[跨站脚本（XSS）](https://en.wikipedia.org/wiki/Cross-site_scripting)的攻击 

###### 4.2 使用：

向其传递包含 key 为 `__html` 的对象 ：

```js
function createMarkup() {
  return {__html: 'First &middot; Second'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

##### 5. htmlFor

html: for --> React: htmlFor

##### 6. onChange

未有使用浏览器已有的默认行为 --> React: 每当表单字段变化时，该事件都会被触发 

##### 7. selected

React:  `<option>` 组件支持 `selected` 属性。你可以使用该属性设置组件是否被选择。 

##### 8. style

React:  接受一个采用小驼峰命名属性的 JavaScript 对象，而不是 CSS 字符串 

```js
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Hello World!</div>;
}
```

注意：样式不会自动补齐前缀。需手动补充：

```js
const divStyle = {
  WebkitTransition: 'all', // note the capital 'W' here
  msTransition: 'all' // 'ms' is the only lowercase vendor prefix
};

function ComponentWithTransition() {
  return <div style={divStyle}>This should work cross-browser</div>;
}
```

 浏览器引擎前缀都应以大写字母开头，除了 `ms`。

##### 9. suppressContentEditableWarning

html: contentEditable --> React: suppressContentEditableWarning

##### 10. value

 `<input>` 和 `<textarea>` 组件支持 `value` 属性。你可以使用它为组件设置 value。这对于构建受控组件是非常有帮助。`defaultValue` 属性对应的是非受控组件的属性，用于设置组件第一次挂载时的 value。 

##### 11. suppressHydrationWarning

如果你使用 React 服务端渲染，通常会在当服务端与客户端渲染不同的内容时发出警告。但是，在一些极少数的情况下，很难甚至于不可能保证内容的一致性。例如，在服务端和客户端上，时间戳通常是不同的。

如果设置 `suppressHydrationWarning` 为 `true`，React 将不会警告你属性与元素内容不一致。它只会对元素一级深度有效，并且打算作为应急方案。因此不要过度使用它。你可以在 [`ReactDOM.hydrate()` 文档](https://react.docschina.org/docs/react-dom.html#hydrate) 中了解更多关于 hydration 的信息。

##### 12. 具体看官网文档：[DOM元素](https://react.docschina.org/docs/dom-elements.html)
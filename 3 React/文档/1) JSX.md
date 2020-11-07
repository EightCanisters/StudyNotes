### 1. 什么是 JSX

- 是一个 JavaScript 的语法扩展 。形如：`const element = <h1>Hello, world!</h1>;`
- JSX 也是一个表达式。在编译后，JSX 表达式会被转成普通 JS 函数调用，并在对其取值后得到 JS 对象

### 2. 使用JSX

#### 2.1 在 JSX 中嵌入表达式: {  }

 在大括号内放置任何有效的 [JavaScript 表达式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions)：

```jsx
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

注意：

-  建议将内容包裹在括号中，虽然这样做不是强制要求的，但是这可以避免遇到[自动插入分号](http://stackoverflow.com/q/2846283)陷阱 ；
-  在属性中嵌入 JavaScript 表达式时，不要在大括号外面加上引号 ；
-  因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 `camelCase`（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定 

#### 2.2 使用 "  "，将属性值指定为字符串字面量：

```jsx
const element = <div tabIndex="0"></div>;
```

#### 2.3  使用 `/>` 来闭合标签 

```jsx
const element = <img src={user.avatarUrl} />;
```

#### 2.4 包含多个子元素

```jsx
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

### 4. JSX 防注入：

React DOM 在渲染所有输入内容之前，默认会进行[转义](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html)。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 [XSS（cross-site-scripting, 跨站脚本）](https://en.wikipedia.org/wiki/Cross-site_scripting)攻击。

### 5. JSX 表示对象的含义: JSX 与 React.createElement()实际上都创建了一个对象 -- React元素

Babel 会把 JSX 转译成一个名为 `React.createElement()` 函数调用 ：

```jsx
/**
* 以下两种代码完全等效
*/
// 代码1:
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
// 代码2:
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

`React.createElement()` 会预先执行一些检查，以帮助你编写无错代码，但实际上它创建了一个这样的对象， 这些对象被称为 “React 元素” ：

```js
// 注意：这是简化过的结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```


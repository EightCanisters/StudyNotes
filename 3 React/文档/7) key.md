### 1. key介绍

在使用`map()`渲染多个组件的时候，通常会要求添加key属性。\

```jsx
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

#### 1.1 key的作用

​	帮助 React 识别哪些元素改变了，比如被添加或删除 
​	注： key 会传递信息给 React ，但不会传递给你的组件。如果你的组件中需要使用 `key` 属性的值，请用其他属性名显式传递这个值： 

#### 1.2 用什么作为key值

 一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。

- 通常，数据 中的 id 来作为元素的 key ；
-  万不得已时，可以使用元素索引 index 作为 key 
  - 注： 如果列表项目的顺序可能会变化，我们不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题 

### 2. 用 key 提取组件

 元素的 key 只有放在就近的数组上下文中才有意义 

**例子：不正确的使用 key 的方式**

```jsx
function ListItem(props) {
  const value = props.value;
  return (
    // 错误！你不需要在这里指定 key：    <li key={value.toString()}>      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 错误！元素的 key 应该在这里指定：    <ListItem value={number} />  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

**例子：正确的使用 key 的方式**

```jsx
function ListItem(props) {
  // 正确！这里不需要指定 key：  return <li>{props.value}</li>;}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 正确！key 应该在数组的上下文中被指定    <ListItem key={number.toString()}              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

### 3. key 只是在兄弟节点之间必须唯一

 不需要是全局唯一的 。 当我们生成两个不同的数组时，我们可以使用相同的 key 值 ：

```jsx
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```


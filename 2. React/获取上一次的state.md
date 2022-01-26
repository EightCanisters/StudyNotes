> 利用useRef返回的ref对象在组件的整个生命周期内保持不变特性

## 借助useRef+useEffect获取

```jsx
  // useRef + useEffect获取
  const RefDemo = () => {
    const [count, setCount] = React.useState(0);
    const preCountRef = React.useRef();
    // 因useEffect会在每轮渲染结束后执行，所以preCount取出来的值永远为上一次的值。
    React.useEffect(() => {
      preCountRef.current = count;
    })
    const preCount = preCountRef.current;
    return (
      <div>
        <button onClick={() => setCount(count => ++count)}>加1</button>
        <button onClick={() => setCount(count => --count)}>减1</button>
        <div>现在的值：{count}</div>
        <div>上一次的值：{preCount}</div>
      </div>
    )
  }
  const App = () => {
    return (
      <div>
        <RefDemo />
      </div>
    )
  }
  ReactDOM.render(<App />, document.querySelector('#main'));
```

## 借助useReducer + useRef获取

```jsx
  // useReducer + useRef获取
  const ReducerDemo = () => {
    const previewRef = React.useRef();
    function reducer(state, action) {
      previewRef.current = state.count;
      switch (action.type) {
        case 'increment':
          return { count: state.count + 1 }
        case 'decrement':
          return { count: state.count - 1 }
        default:
          throw new Error();
      }
    }
    const [count, dispatch] = React.useReducer(reducer, { count: 0 })
    const preCount = previewRef.current;
    return (
      <div>
        <button onClick={() => dispatch({ type: 'increment' })}>加1</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>减1</button>
        <div>现在的值：{count.count}</div>
        <div>上一次的值：{preCount}</div>
      </div>
    )
  }
  const App = () => {
    return (
      <div>
        <ReducerDemo />
      </div>
    )
  }
  ReactDOM.render(<App />, document.querySelector('#main'));
```

## 借助useState + useRef获取

```jsx
  // useState + useRef获取
  const StateDemo = () => {
    const [count, setCount] = React.useState(0);
    const preCountRef = React.useRef();

    const add = (isAdd) => {
      setCount(pre => {
        preCountRef.current = pre;
        return isAdd ? ++pre : --pre;
      })
    }

    const preCount = preCountRef.current;
    return (
      <div>
        <button onClick={() => add(true)}>加1</button>
        <button onClick={() => add(false)}>减1</button>
        <div>现在的值：{count}</div>
        <div>上一次的值：{preCount}</div>
      </div>
    )
  }

  const App = () => {
    return (
      <div>
        <StateDemo />
      </div>
    )
  }
  ReactDOM.render(<App />, document.querySelector('#main'));
```

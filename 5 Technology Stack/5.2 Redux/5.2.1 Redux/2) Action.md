### 1. Action

#### 1.1 Action概念

- 把数据从应用传到 store 的有效载荷
- 是 store 数据的**唯一**来源，一般通过 [`store.dispatch()`](https://www.redux.org.cn/docs/api/Store.html#dispatch) 将 action 传到 store

#### 1.2 使用

- Action 本质上是 JavaScript 普通对象。我们约定，action 内**必须**使用一个字符串类型的 `type` 字段来表示将要执行的动作。
- **应该尽量减少在 action 中传递的数据**

```
// 这就是一个action：
const ADD_TODO = 'ADD_TODO'
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```

### 2. Action创建函数 (Acrion Creator)

#### 2.1 概念

- 就是生成 action 的方法。

- 注意：“action” 和 “action 创建函数” 这两个概念很容易混在一起，使用时最好注意区分。

#### 2.2 使用

```
// 这就是一个Action创建函数：
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}
```

### 3. 完整示例

```
/*
 * action 类型
 */

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

/*
 * 其它的常量
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action 创建函数
 */

export function addTodo(text) {
  return { type: ADD_TODO, text }
}

export function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
```


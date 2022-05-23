#### 1）基本选择器

- 通用选择器(*)：
  - 语法：`*`, `ns|*`, `*|*`
  - 例子：* 将匹配文档的所有元素。
- 元素选择器：
  - 语法：`elementname`
  - 例子：input 匹配任何`<input>`元素。
- 类选择器(class选择器)：
  - 语法：`.classname`
- id选择器：
  - 语法：`#idname`
- 属性选择器：
  - 语法：
    - `[attr]`：匹配带有属性`attr`的元素；
    - `[attr=value]`：匹配带有**属性**`**attr**`，且**属性值**为`value`的元素；
    - `[attr~=value]`：匹配带有**属性**`**attr**`，且该属性的属性是以空格作为分隔的值列表，且值列表中包含`value`；
    - `[attr^=value]`：匹配带有**属性**`**attr**`，且**属性值**以`value`开头的元素；
    - `[attr$=value]`：匹配带有**属性**`**attr**`，且**属性值**以`value`结尾的元素；
    - `[attr|=value]`：匹配带有**属性**`**attr**`，且**属性值**为`value`或以`value-`为前缀的元素；
    - `[attr*=value]`：匹配带有**属性**`**attr**`，且**属性值**为至少包含一个`value`的元素；
    - `[attr operator value i]`：在属性选择器的右方括号前添加一个用空格隔开的字母 i（或 I），可以在匹配属性值时忽略大小写。

#### 2）分组选择器

- 选择器列表：
  - 语法：`A, B`
  - 例子：`span, div, p {}`

#### 3）组合器

- 后代组合器：
  - `（空格）`：选择前一个元素的后代节点。
  - 语法：`A B`，匹配B，且B是A的后代节点；
- 直接子代组合器：
  - `>`：选择前一个元素的直接子代的节点。
  - 语法：`A > B`，匹配B，且B是A的直接子代；
- 一般兄弟组合器：
  - `~`：选择兄弟元素，也就是说，后一个节点在前一个节点后面的任意位置，并且共享同一个父节点。
  - 语法：`A ~ B`，匹配所有B，且A、B同属一个父节点，且B在A的后面；
- 紧邻兄弟组合器：
  - `+`：选择相邻元素，即后一个元素紧跟在前一个之后，并且共享同一个父节点。
  - 语法：`A + B`，匹配B，且A、B同属一个父节点，且B紧跟在在A的后面；
- 列组合器：
  - `||`：选择属于某个表格行的节点。
  - 语法：`A || B`
  - 例子：`col || td`会匹配所有`<col>`作用域内的`<td>`元素。

#### 4）伪选择器

- 伪类(:)
  - `:`支持按照未被包含在文档树中的**状态信息**来选择元素。
  - [MDN标准伪类索引](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes#%E6%A0%87%E5%87%86%E4%BC%AA%E7%B1%BB%E7%B4%A2%E5%BC%95)
![](http://rc9frlwp7.hn-bkt.clouddn.com/20210918143342.png#id=b84mg&originHeight=717&originWidth=944&originalType=binary&ratio=1&status=done&style=none)
- 伪元素(::)
  - `::`用于表示无法用 HTML 语义表达的**实体**。
  - [MDN标准为元素索引](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements#%E6%A0%87%E5%87%86%E4%BC%AA%E5%85%83%E7%B4%A0%E7%B4%A2%E5%BC%95)
![](http://rc9frlwp7.hn-bkt.clouddn.com/20210918161009.png#id=Kq37J&originHeight=180&originWidth=898&originalType=binary&ratio=1&status=done&style=none)

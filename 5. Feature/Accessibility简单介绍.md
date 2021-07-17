# 概念介绍

## 什么是Accessibility？

![](https://cdn.nlark.com/yuque/0/2021/webp/5380242/1621431453192-d2fe23b4-3c52-4bb1-9cb7-4e1a545ff672.webp#align=left&display=inline&height=328&margin=%5Bobject%20Object%5D&originHeight=914&originWidth=1280&size=0&status=done&style=none&width=460)
Accessibility，通常缩写为 **A11Y** ，这缩写取的是首字母 + 中间字母长度 + 结尾字母，译为 **“可访问性”**。
无论是一般人或者是身心障碍的朋友，都需要有规范的网站方可便捷地获取信息，无障碍网页则是拓展对网页的规范，以更严谨的态度及条件来设计网页，使网页内容落实“无障碍”让不同程度或需求的用户，可以顺畅的获取网站上的信息。那么我们日常需要考虑的障碍类型有哪些呢？

## 我们所应该关注的障碍类型

> 根据W3C所处的[Web内容无障碍指南（WACG）](https://www.w3.org/Translations/WCAG21-zh/) 所提到的，主要的障碍类型有以下四类：
>
> - 视力障碍
> - 听力障碍
> - 行动障碍
> - 认知障碍

世界卫生组织(World Health Organization)的残疾和健康(Disability and health)状况说明书指出，“超过10亿人，约占世界人口的15%，患有某种形式的残疾”，“1.1亿至1.9亿成年人在功能上存在重大困难。”

**
**视力障碍（Visual impairments）**
视力障碍，是指视力下降到一定程度，导致某种程度的问题无法通过通常的手段（例如眼镜）解决。有些人还包括因无法接触眼镜或隐形眼镜而导致视力下降的人。视力障碍可能会导致人们在日常日常活动（例如驾车，阅读，社交和步行）中遇到困难。这部分的人通常会使用一些辅助的功能来阅读屏幕，例如放大镜，屏幕缩放以及屏幕阅读器。常见的屏幕阅读器有：

- 付费的产品：JAWS (Windows) 和 Dolphin Screen Reader (Windows)。
- 免费的产品：NVDA (Windows)，ChromeVox (Chrome, Windows and Mac OS X)和 Orca (Linux)。
- 内置的产品：VoiceOver (macOS, iPadOS, iOS)，Narrator (Microsoft Windows，ChromeVox (on Chrome OS)和 TalkBack (Android).

**听力障碍（Hearing impairments）**
听觉障碍又称听力缺损，指听觉部分或完全丧失，而耳聋人士则是指完全没有或几乎没有听力者。听力缺损可能发生在单耳或双耳，有可能是暂时或永久性质。孩童的听力问题可能影响语言学习，而对成人可能造成工作上的困难。对某些人而言，尤其是老年人口，听力缺损可能造成孤独感。
听力障碍的人可能听力水平低或甚至完全听不见声音，听力受损的人可能会使用ATs(请参阅针对患有听力、语音、言语或语言障碍的人的辅助设备)，不过在Web中并没有专门的ATs可以使用。

**行动障碍（Mobility impairments）**
行动障碍是指一个人不能使用他/她的一条或多条四肢，或缺乏行走、抓取或抬起物体的力量。轮椅、拐杖或助行器的使用可用于辅助行动。活动能力障碍可能由多种因素引起，如疾病、事故或先天性疾病，也可能是神经肌肉和骨科损伤所致。
声控轮椅是提高行动障碍人士生活质量最重要的发明之一。声控轮椅最初发明于1977年。
缺少手臂或者手指的障碍人士会严重影响使用键盘与鼠标，但是在近些年，语音识别设备跟软件都有了极大的发展，也为这部分障碍人士提供了不少的便利。

**认知障碍（Cognitive impairments）**
认知障碍是一种范围广泛的残疾类型，从能力最有限的智障人士到我们随着年龄增长和思考和记忆困难而出现的所有人。 该范围包括患有精神疾病的人，例如抑郁症和精神分裂症。 它还包括有学习障碍的人，例如阅读障碍和注意力缺陷多动障碍。 重要的是，尽管认知障碍的临床定义存在很多差异，但与之相关的人们会遇到一系列常见的功能问题。 其中包括难以理解内容，记住如何完成任务以及因网页布局不一致而引起的混乱。
另外提一点，就是癫痫患者也属于我们认知障碍者的范畴，我们在开发的时候，这部分人士也是我们需要考虑的。

## WCAG - Web内容可访问性指南

> [Web内容可访问性指南(WCAG)](https://www.w3.org/Translations/WCAG21-zh/#abstract)是由互联网的主要国际标准组织万维网联盟(W3C)的Web可访问性倡议(WAI)发布的一系列Web可访问性指南的一部分。它们是一组使Web内容更易于访问的建议，主要针对残疾人，但也适用于所有用户代理，包括高度受限的设备，如移动电话。WCAG2.0，于2008年12月发布，并于2012年10月成为国际标准化组织标准，ISO/IEC 40500：2012。WCAG 2.1于2018年6月成为W3C推荐标准。

**

- 可感知性 (Perceivable): 信息和用户界面组件必须以可感知的方式呈现给用户；
- 可操作性 (Operable): 用户界面和导航必须可操作；
- 可理解性 (Understandable): 信息和用户界面必须是可理解的；
- 鲁棒性 (Robust): 内容必须健壮到可信地被种类繁多地用户代理(包括辅助技术)所解释。

所以，在[MDN](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/What_is_accessibility)上有为了认知障碍者总结的开发守则：

- 用多种方式展示内容，例如通过文本，语音或视频；
- 编写易于理解的内容，例如少用方言或者颜文字；
- 重要的内容要细心写；
- 尽量减少干扰，例如一些没什么用的功能与广告；
- 网页布局与导航要一致；
- 常规的元素样式，例如带下划线的链接（未访问时为蓝色）和访问时为紫色；
- 流程交互要具有进度以及步骤指示；
- 用户权限认证方式要简单；
- 错误信息要展示清楚；
- 表单要便于填写与操作。

# 前端要怎么做

## 各种注意点

### 标题，段落，列表等内容的保持良好的结构

- 从左到右，从上到下；
- 对于 Accessibility 来说，良好的标题，段落，列表结构也会提高辅助设备对用户的良好体验，比如屏幕阅读器在阅读到相对于的语义化标签的时候，是会自动地将对于标签读给用户听的。
            ![](https://cdn.nlark.com/yuque/0/2021/webp/5380242/1621433684500-06e85175-6023-47bd-a5ee-6a859c82c3f0.webp#align=left&display=inline&height=458&margin=%5Bobject%20Object%5D&originHeight=1246&originWidth=1200&size=0&status=done&style=none&width=441)

### 尽量使用语义化的标签

可能平时大家很少关注一个叫 Accessibility tree 的东西，翻译过来叫无障碍树，当你选中一段 DOM 的时候，在 Devtools 里面都可以看到，浏览器实际呈现给屏幕阅读器的就是这个结构 (浏览器获取 DOM 树，并将其修改成适用于辅助技术的形式) 将DOM 树变成无障碍树，所以良好的使用语义化标签，能让辅助设备更合理地将你网站的内容转化成 Accessibility tree，从而解读给用户。
                ![](https://cdn.nlark.com/yuque/0/2021/webp/5380242/1621433510925-a2d7d137-6a33-46f5-8c61-a64deafc41a4.webp#align=left&display=inline&height=334&margin=%5Bobject%20Object%5D&originHeight=578&originWidth=1200&size=0&status=done&style=shadow&width=693)
所以确保页面中的重要元素具有正确的无障碍角色、状态和属性并确保指定无障碍名称和说明，浏览器便可让辅助技术获取该信息以打造自定义体验，这一点很重要。

### 为任何非文本内容提供文本替代项

图像是大多数网页的重要组成部分，当然也是对弱视用户造成阻碍的一个特定因素，特别是那些浏览图片的网站，这时候添加文本替代性是非常重要的，举个简单的 🌰

```html
<img src="/160204193356-01-cat-500.jpg" alt="一只目光汹汹凝视远方的猫”>
```

alt 允许指定在图像不可用时（例如图像加载失败、被网络爬虫访问或被屏幕阅读器读取时）使用的简单字符串，alt 不同于 title 或任何类型的字幕，因为它只在图像不可用时使用。
另一方面，**描述图像并不总是有用**。
例如，假定在一个包含文本“搜索”的搜索按钮内有一幅放大镜图像。如果其中不包含文本，您肯定会指定“搜索”作为这幅图像的 alt 值。 但由于文本处于可见状态，屏幕阅读器将拾取并朗读“搜索”一词；因此，图像上完全相同的 alt 值就成了多余的内容, 如果将 alt 省略，我们听到的很可能不是替代文本，而是图像文件名，只需使用空的 alt 属性就可让屏幕阅读器将图像整个跳过。

```html
<img src="magnifying-glass.jpg" alt=“”>
```

**所有图像都应有 alt 属性，但它们无需都包含文本。 重要的图像应使用描述性替代文本简洁地说明图像内容，而装饰性图像应使用空的 alt 属性，即 alt=“”**

### 表单输入有关联的文本标签

- 将 input 元素置于 label 元素内
- 使用 label 的 for 属性并引用元素的 id
推荐使用后者，举个简单的 🌰

```html
<input id="promo" type="checkbox"></input>
<label for="promo">This is a checkbox</label>
```

屏幕阅读器便可报告元素角色为 checkbox，处于 checked 状态，名称为“This is a checkbox”。

### DOM 顺序和视觉顺序保持一致

一般我们设计的时候，往往考虑的都是视觉可见得用户，那其实对于只能使用屏幕阅读器浏览网站的用户，这时候如果 DOM 结果不一致的话，就会造成用户的疑惑。

### Focus和Tab index

#### Focus下的outline

大家应该都发现过我们在使用 Tab/ Shift Tab 键或者上下左右键的时候，也可以和网页进行交互，这种设计不仅方便与一般人的操作，其实对不能使用鼠标的用户来说是不必可少的设计。同样，我们应该也见到过不同的浏览器会有不同的样式，Chrome 通常使用蓝色边框突出显示聚焦的元素，而 Firefox 则是使用虚线边框，每个浏览器都有自己默认的 Outline 样式。但是，又会发现很多网站是没有这些交互的，这就是在网页设计以及实现的时候禁用了这写功能或者说没有使用合理的标签。
> Web AIM 检查清单才会在其第 2.1.1 节中指出，[所有页面功能应该都能使用键盘来执行](http://webaim.org/standards/wcag/checklist#sc2.1.1)

关于 Outline，官网上是这样说的
> **禁止设置 outline 为 none， 在不提供替代项的情况下**

**HTML 默认的 focusable 元素**，它们是自动插入到 Tab 键顺序中，并且内置了键盘事件处理，默认支持 keyboard 功能，基本的都可以在 [这里](https://www.w3.org/TR/2011/WD-html5-20110525/editing.html) 找到。
所以，关于 Focus 我们可以做的有

- 不要移除原生支持的 outline 样式，除非你有更好看的样式替代它；
- 尽量使用原生支持的 focusable 的元素；
- 如果有复杂的 UI, 需要使用非语义化的标签但确实是和用户有交互的时候，请为它加上 tabindex；
- 可以自己写一些 js 或者一些库来区分键盘和鼠标或者触摸事件，来实现不同的 outline 样式，比如只想在使用键盘的时候有 outline，使用鼠标或者触摸的时候去掉 outline，我觉得这是相对合理的设计，比如 [Google 的 Accessibility 页面](https://www.google.com/accessibility/)。

#### Tab index

- 主要用于允许 tabbable 元素具有自定义Tab键顺序（以正数顺序指定，从小到大），而不是仅按其默认源顺序进行标记；
- 使可用tab键选择，但不允许enter/return激活（需要js添加监听事件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div {
            width: 50px;
            height: 30px;
            border: 1px solid;
            margin: 10px;
        }
    </style>
</head>
<body>
    <div tabindex="1" class="tab1">tab1</div>
    <div tabindex="2" class="tab2">tab2</div>
    <div tabindex="3" class="tab3">tab3</div>
    

    <div tabindex="6" class="tab1">tab6</div>
    <div tabindex="5" class="tab2">tab5</div>
    <div tabindex="4" class="tab3">tab4</div>
</body>
</html>
```

### 对比度

- W3C推荐小字体文本与其背景的对比度至少为 4.5 : 1；
- 大字体文本（加粗14pt或大于18pt）与其背景的对比度至少为 3 : 1。

## WAI-ARIA

### 角色（Roles）

> WAI-ARIA角色是使用role属性在元素上设置的，类似于role属性[role]中定义的role属性。

```html
<li role="menuitem">Open file…</li>
```

**role** 可选属性有点多，但其实主要就分了四类：

1. [抽象角色（Abstract Roles）](https://www.w3.org/TR/2014/REC-wai-aria-20140320/roles#landmark_roles)
1. [小部件角色（Widget Roles）](https://www.w3.org/TR/2014/REC-wai-aria-20140320/roles#widget_roles)
1. [文件结构角色（Document Structure Roles）](https://www.w3.org/TR/2014/REC-wai-aria-20140320/roles#document_structure_roles)
1. [地标角色（Landmark Roles）](https://www.w3.org/TR/2014/REC-wai-aria-20140320/roles#landmark_roles)

其主要作用为：

- 角色信息描述。
- 相关角色的等级信息。
- 角色上下文。
- 引用其他规范中的相关概念。
- 使用OWL（Web Ontology Language）提供允许语义继承的类型层次结构。
- 每个角色支持的状态和属性。

### 状态与属性（States and Properties）

WAI-ARIA提供了可访问性状态和属性的集合，这些状态和属性用于支持各种操作系统平台上的平台可访问性API。辅助技术可以通过公共的用户代理应用（例如读屏软件）DOM或通过映射到平台可访问性API来访问这些信息。当与角色结合时，用户代理应用可以为辅助技术提供用户界面信息，以便随时传递给用户。状态或属性的更改将导致向辅助技术发出通知，这可能会警告用户发生了更改。
我们来看个例子：

```html
<li role="menuitemcheckbox" aria-checked="true">Sort by Last Modified</li>
```

上面的例子里，使用了一个`<li>`来创建一个可点击的菜单，通过JS的事件来改变`aria-checked`，从而让用户代理应用理解这部分的功能作用。
由于这部分是用户主动进行的操作，并非默认状态，所以为了更佳的体验，我们可以对`aria-checked="true"`时`li`进行样式处理，如下：

```css
[aria-checked="true"] { font-weight: bold; }
[aria-checked="true"]:before { background-image: url(checked.gif); }
```

WAI-ARIA状态与属性分类如下：

1. [小部件属性](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#attrs_widgets)
   - [`aria-autocomplete`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-autocomplete)
   - [`aria-checked` (state)](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-checked)
   - [`aria-disabled` (state)](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-disabled)
   - [`aria-expanded` (state)](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-expanded)
   - [`aria-haspopup`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-haspopup)
   - [`aria-hidden` (state)](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-hidden)
   - [`aria-invalid` (state)](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-invalid)
   - [`aria-label`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-label)
   - [`aria-level`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-level)
   - [`aria-multiline`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-multiline)
   - [`aria-multiselectable`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-multiselectable)
   - [`aria-orientation`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-orientation)
   - [`aria-pressed` (state)](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-pressed)
   - [`aria-readonly`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-readonly)
   - [`aria-required`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-required)
   - [`aria-selected` (state)](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-selected)
   - [`aria-sort`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-sort)
   - [`aria-valuemax`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-valuemax)
   - [`aria-valuemin`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-valuemin)
   - [`aria-valuenow`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-valuenow)
   - [`aria-valuetext`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-valuetext)
2. [实时区域属性](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#attrs_liveregions)
   - [`aria-atomic`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-atomic)
   - [`aria-busy` (state)](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-busy)
   - [`aria-live`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-live)
   - [`aria-relevant`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-relevant)
3. [拖放属性](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#attrs_dragdrop)
   - [`aria-dropeffect`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-dropeffect)
   - [`aria-grabbed` (state)](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-grabbed)
4. [关系属性](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#attrs_relationships)
   - [`aria-activedescendant`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-activedescendant)
   - [`aria-controls`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-controls)
   - [`aria-describedby`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-describedby)
   - [`aria-flowto`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-flowto)
   - [`aria-labelledby`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-labelledby)
   - [`aria-owns`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-owns)
   - [`aria-posinset`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-posinset)
   - [`aria-setsize`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/states_and_properties#aria-setsize)

### 焦点管理（Managing Focus）

WAI-ARIA里提倡，所有的用户交互对象都应该是可聚焦的，就是键盘可选中的。
当我们使用标准的HTML标签以及WAI-ARIA小部件时，开发者应该按顺序创建键盘可访问的节点，例如Tabs键，方向键等。
开发者应该对以下的容器角色进行焦点管理：

- [`combobox`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/roles#combobox)
- [`grid`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/roles#grid)
- [`listbox`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/roles#listbox)
- [`menu`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/roles#menu)
- [`menubar`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/roles#menubar)
- [`radiogroup`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/roles#radiogroup)
- [`tree`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/roles#tree)
- [`treegrid`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/roles#treegrid)
- [`tablist`](https://www.w3.org/TR/2014/REC-wai-aria-20140320/roles#tablist)

焦点管理这部分内容其实一个更加感性的内容，很多时候我们得依赖我们的业务逻辑以及技术选型。
例如在如今很常见的单页面应用里，当我们进行路由切换，或者通过AJAX进行内容更改的时候，对于视力正常的人来说，我们很容易就会知道了，但是如果是依赖读屏软件的失明人士，可能会不知所措，我明明是点击了下一页，怎么内容不知道读到哪里去了？
例如这样：

```html
<nav>
  <a href="/">Home</a>
  <a href="/goods">goods</a>
  <a href="/user">user</a>
</nav>
<main>
    <Link />
</main>
```

但是如果我们加上切换路由或者进行数据交互时重置焦点的功能，那么对读屏软件来说，便可以重头开始读，对失明人士来说便不会感觉到突兀：

```html
<nav>
  <a href="/">Home</a>
  <a href="/goods">goods</a>
  <a href="/user">user</a>
</nav>
<main>
    <h1 tabindex="-1">鱼头家的商城</h1>
    <Link />
</main>
<script>
    function routerChange() {
        const heading = document.querySelector('h1')
        heading.focus()
        document.title = heading.textContent
    }
</script>
```

# Links

- [W3C 向我们展示如何标注元素](https://www.w3.org/WAI/tutorials/forms/labels/)
- [WebAIM 向我们展示如何标注元素](https://webaim.org/techniques/forms/controls)
- React官网：[https://zh-hans.reactjs.org/docs/accessibility.html](https://zh-hans.reactjs.org/docs/accessibility.html)

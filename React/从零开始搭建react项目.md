### 1. Setup
首先，为你的React应用创建一个新目录。然后，用`npm init`初始化你的项目，并在你选择的编辑器中打开它。这也是进行`git init`的好时机。在新项目文件夹中，创建以下结构:

```
.
+-- public
+-- src
```
稍微提前考虑一下，我们最终会想要构建我们的应用程序，我们可能会想要从提交中排除构建版本和我们的节点模块，所以让我们继续添加一个`.gitignore`文件，(至少)排除`node_modules`和`dist`目录。

我们的`public`目录将处理任何静态资产，最重要的是存放我们的`index.html`文件，react将利用它来渲染你的应用。请随意将以下内容复制到公共目录中的新文件index.html中。

```html
<!-- sourced from https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html -->
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>React Starter</title>
</head>

<body>
  <div id="root"></div>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <script src="../dist/bundle.js"></script>
</body>

</html>
```

需要注意的最重要的是`<div id="root"></div>`，这是我们的React应用将会连接到的根代码，以及`<script src="../dist/bundle.js"></script>`，它引用了我们(即将)构建的React应用。你可以给你的构建脚本起任何你喜欢的名字，但在本教程中我将使用bundle.js。

现在我们已经设置好了HTML页面，我们可以开始认真了。我们还需要准备一些东西。首先，我们需要确保我们写的代码可以被编译，所以我们需要Babel。

### 2. Babel
继续运行：`npm install --save-dev @babel/core@7.1.0 @babel/cli@7.1.0 @babel/preset-env@7.1.0 @babel/preset-react@7.0.0`。
- `babel-core`是babel的主要包——我们需要它来对我们的代码进行任何转换。
- `babel-cli`允许您从命令行编译文件。
- [`preset-react`](https://babeljs.io/docs/en/babel-preset-react)和[`preset-env`](https://babeljs.io/docs/en/babel-preset-env)都是转换特定代码风格的预置——在本例中，`env`预置允许我们将ES6+转换为更传统的javascript, react预置也可以做同样的事情，但使用的是JSX。

在项目根目录下，创建一个名为`.babelrc`的文件。这里，我们告诉babel，我们将使用`env`和`react`预置。
```
{
  "presets": ["@babel/env", "@babel/preset-react"]
}
```

Babel还有大量可用的插件，如果你只需要转换特定的特性，或者一些你需要的特性没有被env覆盖，你可以使用这些插件。我们现在不担心这些，但你可以在[这里](https://babeljs.io/docs/en/plugins/)查看它们。

### 3. webpack
现在我们需要获取和配置Webpack。我们还需要一些包，你需要将它们保存为开发依赖项: `npm install --save-dev webpack@4.19.1 webpack-cli@3.1.1 webpack-dev-server@3.1.8 style-loader@0.23.0 css-loader@1.0.0 babel-loader@8.0.2`。

Webpack使用[loaders](https://webpack.js.org/loaders/)来处理不同类型的文件进行打包。它还可以轻松地与开发服务器一起工作，我们将使用开发服务器在开发中为React项目提供服务，并在React组件(已保存)更改时重新加载浏览器页面。为了利用这些，我们需要配置Webpack来使用我们的loaders并准备开发服务器。

在项目的根目录下创建一个名为`webpack.config.js`的新文件。这个文件导出了一个带有webpack配置的对象。
```js
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
```
让我们快速浏览一下: 
- `entry: "./src/index.js"`告诉Webpack我们的应用程序从哪里开始并从哪里开始打包我们的文件。
- `mode: "development"`让webpack知道我们在开发模式下工作——这样我们就不用在运行开发服务器时添加一个模式标志。
- `module`对象帮助定义如何转换导出的javascript模块，以及根据给定的[规则](https://webpack.js.org/configuration/module/#module-rules)数组包含哪些模块。   
    第一个规则：
    - 我们的第一个规则是关于转换我们的ES6和JSX语法。
    - [`test`](https://webpack.js.org/configuration/module#rule-test)和[`exclude`](https://webpack.js.org/configuration/module#rule-exclude)属性是匹配文件的条件。在本例中，它将匹配`node_modules`和`bower_components`目录之外的任何内容。
    - 因为我们也要转换我们的`.js`和`.jsx`文件，所以我们需要引导Webpack使用Babel。
    - 最后，我们在[`options`](https://webpack.js.org/configuration/module#rule-options-rule-query)中指定要使用env预置。

    第二个规则：
    - 下一个规则是处理CSS。因为我们没有对CSS进行前置或后置处理，所以我们只需要确保将`style-loader`和`css -loader`添加到[`use`](http://use/)属性中。
    - css加载器需要样式加载器才能工作。
    - 当只使用一个加载器时，`loader`是`use`属性的简写。

- [`output`](https://webpack.js.org/configuration/output)属性告诉Webpack把打包好的代码放到哪里。
    - [`publicPath`](https://webpack.js.org/configuration/output#output-publicpath)属性指定bundle应该放在哪个目录，还告诉`webpack-dev-server`从哪里提供文件。
    - `publicPath`属性是一个特殊的属性，它可以帮助我们开发服务器。它指定了目录的公共URL——至少`webpack-dev-server`会知道或关心这个目录。如果这个设置不正确，你会得到404，因为服务器不会从正确的位置提供你的文件!

- 我们在[`devServer`](https://webpack.js.org/configuration/dev-server)属性中设置了`webpack-dev-server`。这对我们的需求没有太多要求——只需要提供静态文件的位置(比如`index.html`)和我们想要运行服务器的端口。
    - 注意，`devServer`也有一个[`publicPath`](https://webpack.js.org/configuration/dev-server/#devserver-publicpath-)属性。这个公共路径告诉服务器绑定代码的实际位置。

- 最后一点可能有点让人困惑——这里要特别注意: [`output.publicPath`](https://webpack.js.org/configuration/output/#output-publicpath)和[`devServer.publicPath`](https://webpack.js.org/configuration/dev-server/#devserver-publicpath-)是不同的。阅读这两个条目。两次。

- 最后，因为我们希望使用热模块替换([Hot Module Replacement](https://webpack.js.org/guides/hot-module-replacement/))，所以我们不必不断刷新来查看更改。在这个文件中，我们所做的就是在[`plugins`](https://webpack.js.org/configuration/plugins/)属性中实例化一个新的插件实例，并确保我们在devServer中将`hotOnly`设置为`true`。但是，在HMR工作之前，我们仍然需要在React中设置另外一件事。

我们已经完成了繁重的准备工作。现在让我们让React工作!

### 4. React
首先，我们需要获得另外两个包:`react@16.5.2`和`react-dom@16.5.2`。继续并将它们保存为常规依赖项。
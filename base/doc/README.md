## webpack4 配置笔记

这是一份记录 webpack4 配置的笔记文件，作为一份学习的记录进行存储。

**注意！！！**

**注意！！！**

**注意！！！**

这是一份笔记！不是教程！只是作为日常工作学习中的一份备忘录，不是循序渐进的教程教学，更多的是**坑点**、**难点**和**易错点**的记录，对新手极不友好！

<br/>


### 基础配置篇

#### 笔记 1 ：CSS 的一些配置

css 配置其实主要分为 3 类：兼容性，资源文件引入和引用方式。说明如下：

1.  兼容性：`less` `sass` `postcss` 转 `css` 需要各种对应的 `loader` 转换，比如说 `less-loader`；浏览器兼容性可以用 `postcss-loader` 处理，加各种浏览器私有前缀
2.  资源文件引入：主要是处理 `url` 和 `@import` 引入的资源文件，当我们打包后，资源文件路径肯定会发生变化，这时候我们就要用 `css-loader` 对资源文件路径进行处理
3.  引用方式：css 引入方式主要是两种：
    1.  一种以 `<style>..</style>` 标签引入，我们可以用 `style-loader` 做这样的工作，要**注意**的是，插入 `style` 标签是 `js` 动态插入的！打包好的 `html` 文件中并没有此 `css` 的 `style` 标签，你只能在浏览器中看到 `style` 标签；
    2.  第二种方式是以 `<link />` 标签的形式引入，我们用的是 `mini-css-extract-plugin` 这个插件，这个插件比较特殊，首先要在 `plugins` 里 `new` 一下，然后要在 `css` 的 `loader` 配置里添加 `MiniCssExtractPlugin.loader`，这样才算配置成功


<br/>

#### 笔记 2 ：JavaScript 的一些配置

JavaScript 配置主要是用 `babel-loader` 进行 ES6 转 ES5 的一些操作。一般 `presets` 设置为 `@babel/preset-env`，然后加各种 `plugin` 就好了。


<br/>


#### 笔记 3 HTML 的一些配置

HTML 配置主要是用 `html-webpack-plugin` 将 模板 `HTML` 和我们的构建结果关联起来，这个属于入门级别的配置，不难。

<br/>


#### 笔记 4 ：打包图片

1.  `JavaScript` 中创建图片 ：通过 `require` 或 `import` 语法引入图片
2.  `css` 中引用图片 ：正常 `url` 引用就可，可以用 `css-loader` 处理资源引用依赖
3.  `html` 中引用图片 ：使用 `html-withimg-loader` 处理

<br/>


#### 笔记 5 ：打包文件

在前端资源里，文件除了代码文件，也就剩些图片文件，媒体文件了。所以操作起来也比较简单。

1.  `file-loader`：直接输出文件，把构建后的文件路径返回
2.  `url-loader`：把小于某个限制的图片转为 `base64` 格式，转换失败的话默认用 `file-loader`
3.  `copy-webpack-plugin`：原封不动把 A 文件夹文件复制到 B 文件夹下面

<br/>


#### 笔记 6 ：引入第三方模块
 
1.  `expose-loader` ：把模块直接挂载到 `window` 变量上。比如说直接把 `$` 挂载到 `window` 上，我们可以直接访问 `window.$` 或 `$`.具体配置可见 `base/configs/webpack.common.js` 文件
2.  `providePlugin` ：在每个模块（都是闭包模块）中注入要设置的对象，比如说把 `lodash` 的 `map` 函数注入并重命名为 `_map`，这样我们可以在每个 js 模块中直接使用 `_map` 函数，但是用 `window._map` 形式会报错，因为并没有挂载在 `window` 上
3.  `externals`：例如 `cdn` 引入 `jquery`，`jquery` 就没必要打包了。我们打包时可以使用 `externals` 排除 `jquery`，减少构建时间和打包体积 

<br/>

#### 笔记 7：sourse-map 配置


作用：增加映射文件，帮我们调试源代码

配置链接：https://webpack.docschina.org/configuration/devtool/

其实理解 sourse-map 主要搞清 4 个名词的意义就行了：`eval`, `cheap`，`inline` 和 `module`。具体的意思可以看下面解释。

1.  eval：以 eval 形式注入业务代码，可能会有些报错信息丢失
2.  cheap：报错不会显示列信息，只会显示行信息
3.  inline：转换为 DataUrl 后添加到 bundle 最后，一般是一行显示
4.  module：不但会有业务代码的映射，还会有第三方 module 的映射

<br/>


具体的配置可以看链接，有十几种，我们这里主要讲常见的几种配置。

1.  `source-map`: 产生单独的 soursemap 文件，出错会标识出错的列和行，这个算最基础的设置
2.  `eval-source-map`: 不产生单独的文件, 初始化 source map 时比较慢，但是会在重新构建时提供比较快的速度。它会增加映射文件，帮我们调试源代码
3.  `cheap-module-source-map`: 不会产生列，但是一个单独的文件, 产生后可以保存起来（用的不多，可以在线上用【解决线上 bug】）
4.  `cheap-module-eval-source-map`: 不会长生文件，集成在打包后的文件末尾，不会产生列提示（调试模式推荐）

<br/>

####  笔记 8：热更新配置

1.  `devServer.hot` 设为 `true`
2.  添加 `webpack.NamedModulesPlugin()`，目的是打印热更新的模块路径
3.  添加 `webpack.HotModuleReplacementPlugin()`，这个是热更新要用到的插件

<br/>

####  笔记 9：压缩配置

前端压缩文件不外乎 4 类资源的压缩，分别为下面 4 种资源：

1.  html
2.  css
3.  javascript
4.  图片等媒体资源

资源的压缩一般是减少带宽的占用，所以一般只在生产环境（`production`）压缩。毕竟在用 `webpack` 的 `dev` 环境开发时，大部分资源都在本地内存里，压缩意义不大。

下面我们说说各种资源怎么压缩。

1.  `mode` 设置为 `production` 模式，一般就会默认开启压缩
2.  `html` 可以用 `html-webpack-plugin` 这个插件的配置项压缩，这个插件的主要作用是把模板 html 和构建结果关联起来，并生成结果 html。我们可以用这个插件里的 `minify` 配置定制化压缩。
3.  `css` 压缩可以用 `optimize-css-assets-webpack-plugin` 这个插件，然后加到 `optimization.minimizer` 里，就可以开启 css 压缩了
4.  `JavaScript` 压缩可以用 `uglifyjs-webpack-plugin` 这个插件，也是加到 `optimization.minimizer` 里，有些配置项，配一配就可以压缩了。
5.  图片等媒体文件的压缩，一般是从源头上解决问题，最好不要让 webpack 做，因为这样会加长 webpack 的构建时间。比如说 UED 切图小一些，使用 CDN 时自动压缩图片等等。

<br/>

####  笔记 10：优化 webpack 开发体验

1.  `clean-webpack-plugin`：二次打包输出打包文件前先把 `dist/` 删掉
2.  `webpack-bundle-analyzer`：可视化分析 `webpack` 打包文件大小

<br/>

####  笔记 11：`filename` 和 `chunkFilename` 的区别

1.  `filename`：`filename` 应该比较好理解，就是对应于 `entry` 里面生成出来的文件名

```javascript
{
    entry: {
        "index": "pages/index.jsx"
    },
    output: {
        filename: "[name].min.js",
    }
}
```

生成出来的文件名为 `index.min.js`;

2.  `chunkFilename`：未被列在 `entry` 中，却又需要被打包出来的 `chunk` 文件的名称。默认使用 `[id].js` 或从 `output.filename` 中推断出的值（`[name]` 会被预先替换为 `[id]` 或 `[id].`）

```javascript
// 业务代码中的异步加载
async function getComponent() {
    var element = document.createElement('div');
    const { default: _ } = await import( /* webpackChunkName: "lodash" */ 'lodash');

    element.innerHTML = _.join(['Hello!', 'dynamic', 'imports', 'async+await'], ' ');

    return element;
}

// webpack 配置
{
    output: {
            path: path.resolve(__dirname, '../dist'),
            filename: 'index.[hash:8].js',
            // chunkFilename: '[name].bundle.js',
    }
}

```

比如说上面的代码是异步加载的 `chunk`，当 `entry` 没有指定 `chunkFilename` 名字时，默认输出的是 `1.index.31aa889e.js`；

加入 `output: { chunkFilename: '[name].bundle.js' }` 后，输出的是 `vendors~lodash.bundle.js`。

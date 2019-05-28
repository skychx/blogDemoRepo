// 引入样式文件
require('./style.less')
import './index.css';

// 从 window 获取 jquery（配合 expose-loader）
require('jquery');
console.log('window.$: ', $)
console.log('window.jQuery: ', window.jQuery)
$('.jqueryDom').append("Some appended text.");

// 不在业务代码中直接引用 lodash，使用 lodash map 函数(配合 webpack.ProvidePlugin)
// let providePluginDemo = _map([1, 2, 3], (item) => item * 2);
// console.log('providePluginDemo: ', providePluginDemo);

// 使用 lodash-es 相比 lodash，可以实现按需加载的功能，有效减小打包体积
import { map } from 'lodash-es'

let lodashEsDemo = map([1, 2, 3], (item) => item * 2);
console.log('lodashEsDemo: ', lodashEsDemo);


// CMD 方式引入其他 js 文件
const { log } = require('./utils');

log('index.js');

// ES6 语法
let a = 111;
let b = 222;
let testFunc = (x, y) => x * y;
console.log(testFunc(a, b));




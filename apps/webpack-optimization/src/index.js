// 1.使用 `module.noParse` 优化
// import jquery from 'jquery';
// import _ from 'lodash';

// 2.使用 webpack.IgnorePlugin 插件
// import moment from 'moment';
// // 手动引入中文语言包
// import 'moment/locale/zh-cn';

// moment.locale('zh-cn');
// let testTime = moment().format('MMMM Do YYYY, h:mm:ss a');

// console.log('moment test time: ', testTime);

// 3.DLL 动态链接库
import React from 'react';
import reactDom from 'react-dom';

reactDom.render(<h1>Hello React !</h1>, document.getElementById('root'));

// 4.tree shaking
// import 语法利用 ES2015 模块语法的静态结构特性，例如 import 和 export，移除 JS 上下文未引用代码
// mode 必须为 production 模式，production 默认开启此功能
// import { cube } from './utils';

// console.log('cube: ', cube(3))

// import { Apple } from './utils'

// const appleModel = new Apple({
//     model: 'IphoneX'
// }).getModel()

// console.log(appleModel)

// function component() {
//     var element = document.createElement('pre');

//     element.innerHTML =[
//         'Hello webpack!',
//         '5 cubed is equal to ' + cube(5)
//     ].join('\n\n');

//     return element;
// }

// document.body.appendChild(component());

// 5. 代码分离
// import _ from 'lodash';

// function component() {
//     var element = document.createElement('pre');

//     element.innerHTML = _.join(['Another', 'module', 'loaded!'], ' ')

//     return element;
// }

// document.body.appendChild(component());


// 6.异步加载 chunks
// let btn = document.createElement("button");
// btn.innerHTML = "click me";
// document.body.appendChild(btn);

// promise 写法
// function getComponent() {
//     // 加 /* webpackChunkName: "lodash" */ 会生成 vendors~lodash.bundle.js 的文件名
//     // 不加会生成 1.bundle.js 的文件名
//     return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
//         var element = document.createElement("div");

//         element.innerHTML = _.join(['Hello!', 'dynamic', 'imports', 'promise'], ' ');

//         return element;

//     }).catch(error => console.log('async chunks: ', error));
// }

// async 写法
// async function getAsyncComponent() {
//     var element = document.createElement('div');
//     const { default: _ } = await import( /* webpackPrefetch: true */ /* webpackChunkName: "lodash" */  'lodash');

//     element.innerHTML = _.join(['Hello!', 'dynamic', 'imports', 'async'], ' ');

//     return element;
// }

// btn.addEventListener('click', () => {
//     getAsyncComponent().then(component => {
//         document.body.appendChild(component);
//     })
// })


// import './index.css';
// const { log } = require('./common');

// log('webpack');

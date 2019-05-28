/**
 * 1.webpack 中，module，chunk 和 bundle 的区别是什么？
 */

import './index.css';
const { log } = require('./common');

log('webpack');



/**
 * 2.filename 和 chunkFilename 的区别
 */

// let btn = document.createElement("button");
// btn.innerHTML = "click me";
// document.body.appendChild(btn);

// async function getAsyncComponent() {
//     var element = document.createElement('div');
//     const { default: _ } = await import('lodash');

//     element.innerHTML = _.join(['Hello!', 'dynamic', 'imports', 'async'], ' ');

//     return element;
// }

// btn.addEventListener('click', () => {
//     getAsyncComponent().then(component => {
//         document.body.appendChild(component);
//     })
// })



/**
 * 3.webpackPrefetch、webpackPreload 和 webpackChunkName 到底是干什么的？
 */

// 代码内容和 demo2 一样，可以自行添加魔法注释测试
// import(
    // /* webpackPrefetch: true */ 
    // /* webpackChunkName: "prefetch" */
// 'lodash');

// import(
//     /* webpackPreload: true */
//     /* webpackChunkName: "preload" */
// 'lodash');



/**
 * 4.hash、chunkhash、contenthash 有什么不同？
 */

// 代码内容和 demo2 一样，主要修改 configs/webpack.common.js 中的内容，详情 请看教程



/**
 * 5.sourse-map 中 eval、cheap、inline 和 module 各是什么意思？
 */


// console.lg('hello source-map !')


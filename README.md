# bz-jsonp
[demo](https://bozhongfe.github.io/bz-jsonp/demo) 通过jsonp获取数据

## command

``` bash
npm run dev
npm run build 
```
打包模块到source/moekit
```bash
npm run build:moe
```
复制demo到source/moekit, demo在dev时生成
```bash
npm run demo 
```
按顺序执行 build build:moe demo
```bash
npm run build:all 
```

## 使用

**npm**
```js
npm install https://github.com/BozhongFE/bz-jsonp;

import BzJsonp from 'bz-jsonp';

BzJsonp({
  url: 'http://example.com/example.json',
  params: {},
}, (res) => {
  console.log(res);
})
```

**Require.js**
```js
require(['mode/bz-jsonp/x.x.x'], (BzJsonp) {
  BzJsonp({
    url: 'http://example.com/example.json',
    params: {},
  }, function(res) {
    console.log(res);
  })
})
```

## 参数

**BzJsonp(options, callback)**

options   `object`    配置，必填

* options.url `string` 请求的接口链接，必填
* options.params `object` 请求时传递给接口的参数，选填
* options.prefix `string` 回调函数名，默认__c，选填

callback  `function`  回调函数

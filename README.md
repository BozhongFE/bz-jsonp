# bz-jsonp

用jsonp请求数据，只适用于GET

# 使用方法

``` bash
# 安装
$ npm install bz-jsonp --save

# 使用
var jsonp = require('jsonp');
// use jsonp

jsonp(url,data,method,callback);
```

# 参数

url       `string`    接口链接，必填

data      `object`    要传给接口的数据，可选，默认为{}

method    `method`    回调函数名称，可选，默认为'__c'

callback  `function`  回调函数，必填


## 全局事件

+ getScript 可以获取组件文件入口内容（只适用于本页面）
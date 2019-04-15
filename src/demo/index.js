/* 仅demo页使用 */
import BzJsonp from 'core';
import {
  renderDom,
  btnListener,
} from './tool.js';

// new Function()内不可直接访问BzJsonp 挂在window
window.BzJsonp = BzJsonp;

const opts = {
  // title: '222',
  desc: `<pre> \
    <span class="tips">// npm</span> \n
    npm install https://github.com/BozhongFE/${name}; \n
    import BzJsonp from '${name}'; \n
    \n
    <span class="tips">// Require.js</span> \n
    require(['mode/${name}/${version}'], (BzJsonp) { \n
      ...
    }) \n
    \n
    <span class="tips">// 使用 BzJsonp(options, callback);</span> \n
    BzJsonp({ \n
      url: 'http://example.com/example.json', <span class="tips">// 请求的接口链接，必填</span>\n
      params: {}, <span class="tips">// 请求时传递给接口的参数，选填</span>\n
      prefix: 'callback', <span class="tips">// 回调函数名，默认__c，选填</span>\n
    }, function(res) { \n
      console.log(res); \n
    }) \n
  </pre>`,
  list: [
    {
      key: 'jsonp',
      code: `
BzJsonp({
  url: \'https://api.douban.com/v2/movie/search\', 
  params: {
    q: \'爱乐之城\'
  },
  prefix: 'callback'
}, function(res) { console.log(res) })`,
      // btn: '运行测试',
    },
  ],
};

renderDom(opts);
btnListener(opts);

/* bz-jsonp v2.0.0 demo*/
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('../dist/bz-jsonp.umd'), require('https://scdn.bozhong.com/source/m/js/art-template.js')) :
  typeof define === 'function' && define.amd ? define(['../dist/bz-jsonp.umd', 'https://scdn.bozhong.com/source/m/js/art-template.js'], factory) :
  (global = global || self, factory(global.BzJsonp, global.artTemplate));
}(this, function (BzJsonp, artTemplate) { 'use strict';

  var version = '2.0.0'; 
  var name = 'bz-jsonp';
  document.title='bz-jsonp#v2.0.0 demo'

  BzJsonp = BzJsonp && BzJsonp.hasOwnProperty('default') ? BzJsonp['default'] : BzJsonp;
  artTemplate = artTemplate && artTemplate.hasOwnProperty('default') ? artTemplate['default'] : artTemplate;

  var renderDom = function renderDom() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var html = artTemplate('tpl-demo', options);
    document.getElementById('demo').innerHTML = html;
  };
  var btnListener = function btnListener() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    document.getElementById('demo').addEventListener('click', function (e) {
      var target = e.target;
      if (target.className !== 'demo-btn') return false;
      var item = options.list[target.dataset.index];
      var code = document.querySelector("#".concat(item.key, "Code")).value;
      if (!code) return false;
      var fn = new Function(code); // 执行代码后释放内存

      fn();
      fn = null;
    });
  };

  /* 仅demo页使用 */

  window.BzJsonp = BzJsonp;
  var opts = {
    // title: '222',
    desc: "<pre>     <span class=\"tips\">// npm</span> \n\n    npm install https://github.com/BozhongFE/".concat(name, "; \n\n    import BzJsonp from '").concat(name, "'; \n\n    \n\n    <span class=\"tips\">// Require.js</span> \n\n    require(['mode/").concat(name, "/").concat(version, "'], (BzJsonp) { \n\n      ...\n    }) \n\n    \n\n    <span class=\"tips\">// \u4F7F\u7528 BzJsonp(options, callback, error);</span> \n\n    BzJsonp({ \n\n      url: 'http://example.com/example.json', <span class=\"tips\">// \u8BF7\u6C42\u7684\u63A5\u53E3\u94FE\u63A5\uFF0C\u5FC5\u586B</span>\n\n      params: {}, <span class=\"tips\">// \u8BF7\u6C42\u65F6\u4F20\u9012\u7ED9\u63A5\u53E3\u7684\u53C2\u6570\uFF0C\u9009\u586B</span>\n\n      prefix: 'callback', <span class=\"tips\">// \u56DE\u8C03\u51FD\u6570\u540D\uFF0C\u9ED8\u8BA4__c\uFF0C\u9009\u586B</span>\n\n    }, function(res) { <span class=\"tips\">// \u6210\u529F\u56DE\u8C03</span>\n\n      console.log(res); \n\n    }, function(err) { <span class=\"tips\">// \u9519\u8BEF\u56DE\u8C03</span>\n\n      console.log(err) \n\n    }) \n\n  </pre>"),
    list: [{
      key: 'jsonp',
      code: "\nBzJsonp({\n  url: 'https://api.douban.com/v2/movie/search', \n  params: {\n    q: '\u7231\u4E50\u4E4B\u57CE'\n  },\n  prefix: 'callback'\n}, function(res) { console.log(res) })" // btn: '运行测试',

    }]
  };
  renderDom(opts);
  btnListener(opts);

}));

/* bz-jsonp version 2.0.0 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.bzBlock = {}));
}(this, function (exports) { 'use strict';

  var main = (function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$params = _ref.params,
        params = _ref$params === void 0 ? {} : _ref$params,
        _ref$url = _ref.url,
        url = _ref$url === void 0 ? '' : _ref$url,
        _ref$prefix = _ref.prefix,
        prefix = _ref$prefix === void 0 ? '__c' : _ref$prefix;

    var callback = arguments.length > 1 ? arguments[1] : undefined;
    if (!url) return console.warn('url无效');
    var callbackName = "jsonp_".concat(Date.now());
    var headEl = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    var symbol = url.indexOf('?') !== -1 ? '&' : '?';
    var scriptUrl = "".concat(url + symbol + prefix, "=").concat(callbackName);
    var urlParams = [];
    Object.keys(params).forEach(function (key) {
      var item = "".concat(key, "=").concat(encodeURIComponent(params[key]));
      urlParams.push(item);
    });
    if (urlParams.length > 0) scriptUrl += "&".concat(urlParams.join('&'));
    script.src = scriptUrl;
    headEl.appendChild(script);

    window[callbackName] = function (json) {
      typeof callback === 'function' && callback(json);
      headEl.removeChild(script);
      window[callbackName] = null;
    };
  });

  exports.default = main;

  Object.defineProperty(exports, '__esModule', { value: true });

}));

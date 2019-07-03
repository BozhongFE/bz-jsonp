/* bz-jsonp version 2.0.0 */
var BzJsonp = function BzJsonp() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$params = _ref.params,
      params = _ref$params === void 0 ? {} : _ref$params,
      _ref$url = _ref.url,
      url = _ref$url === void 0 ? '' : _ref$url,
      _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? '__c' : _ref$prefix;

  var callback = arguments.length > 1 ? arguments[1] : undefined;
  var error = arguments.length > 2 ? arguments[2] : undefined;

  try {
    if (!url) return error && error('url无效');
    var callbackName = "jsonp_".concat(Date.now());
    var headEl = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    var symbol = url.indexOf('?') !== -1 ? '&' : '?';
    var scriptUrl = "".concat(url + symbol + prefix, "=").concat(callbackName);
    var timeoutFn = null; // 报错

    var onError = function onError(err) {
      window[callbackName] = null;
      window.clearTimeout(timeoutFn);
      return error && error(err) || console.error(err);
    }; // 拼接请求参数


    var urlParams = [];
    Object.keys(params).forEach(function (key) {
      var item = "".concat(key, "=").concat(encodeURIComponent(params[key]));
      urlParams.push(item);
    });
    if (urlParams.length > 0) scriptUrl += "&".concat(urlParams.join('&'));

    script.onerror = function () {
      return onError('资源请求失败');
    };

    script.src = scriptUrl;
    headEl.appendChild(script); // 脚本报错不便捕抓，用超时判断

    timeoutFn = setTimeout(function () {
      return onError('请求超时或失败');
    }, 10000);

    window[callbackName] = function (json) {
      window.clearTimeout(timeoutFn);
      typeof callback === 'function' && callback(json);
      headEl.removeChild(script);
      window[callbackName] = null;
    };
  } catch (err) {
    return error && error(err);
  }
};

export default BzJsonp;

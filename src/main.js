const BzJsonp = ({ params = {}, url = '', prefix = '__c' } = {}, callback, error) => {
  try {
    if (!url) return error && error('url无效');
    const callbackName = `jsonp_${Date.now()}`;
    const headEl = document.getElementsByTagName('head')[0];
    const script = document.createElement('script');
    const symbol = url.indexOf('?') !== -1 ? '&' : '?';
    let scriptUrl = `${url + symbol + prefix}=${callbackName}`;
    let timeoutFn = null;
    // 报错
    const onError = (err) => {
      window[callbackName] = null;
      window.clearTimeout(timeoutFn);
      return (error && error(err)) || console.error(err);
    }

    // 拼接请求参数
    const urlParams = [];
    Object.keys(params).forEach((key) => {
      const item = `${key}=${encodeURIComponent(params[key])}`;
      urlParams.push(item);
    });
    if (urlParams.length > 0) scriptUrl += `&${urlParams.join('&')}`;

    script.onerror = () => onError('资源请求失败');
    script.src = scriptUrl;
    headEl.appendChild(script);

    // 脚本报错不便捕抓，用超时判断
    timeoutFn = setTimeout(() => onError('请求超时或失败'), 10000);

    window[callbackName] = (json) => {
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
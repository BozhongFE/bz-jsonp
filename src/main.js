export default ({ params = {}, url = '', prefix = '__c' } = {}, callback) => {
  if (!url) return console.warn('url无效');
  const callbackName = `jsonp_${Date.now()}`;
  const headEl = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  const symbol = url.indexOf('?') !== -1 ? '&' : '?';
  let scriptUrl = `${url + symbol + prefix}=${callbackName}`;

  const urlParams = [];
  Object.keys(params).forEach((key) => {
    const item = `${key}=${encodeURIComponent(params[key])}`;
    urlParams.push(item);
  });

  if (urlParams.length > 0) scriptUrl += `&${urlParams.join('&')}`;

  script.src = scriptUrl;
  headEl.appendChild(script);

  window[callbackName] = (json) => {
    typeof callback === 'function' && callback(json);
    headEl.removeChild(script);
    window[callbackName] = null;
  };
};

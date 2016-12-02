
export default (url = '', data = {}, method = '__c', callback = function(){}) => {
  
  if(url === '' || typeof url !== 'string'){
    alert('url不正确');
    return false;
  }

  url += '?';

  //处理外部传入的参数
  if(typeof data === 'object'){
    let params = '';
    for(let key in data){
      params += key + '=' + data[key]+'&';
    }
    if(params !== ''){
      url += params;
    }
    if(typeof method === 'function'){
      callback = method;
      method = '__c'
    }
  } else if(typeof data === 'function'){
    callback = data;
  } else {
    callback = method;
    method = data;
  }


  let jsonpScript = document.createElement('script');
  let timestamp = new Date().getTime();
  let generatedFunction = 'jsonp' + Math.round(timestamp + Math.random() * 1000001);

  window[generatedFunction] = function(json) {
      callback(json);
      delete window[generatedFunction];
      document.getElementsByTagName("head")[0].removeChild(jsonpScript);
  }

  jsonpScript.setAttribute("src", url + method + '=' + generatedFunction);
  document.getElementsByTagName("head")[0].appendChild(jsonpScript)
};

import artTemplate from 'artTemplate';

export const renderDom = (options = {}) => {
  const html = artTemplate('tpl-demo', options);
  document.getElementById('demo').innerHTML = html;
};

export const btnListener = (options = {}) => {
  document.getElementById('demo').addEventListener('click', (e) => {
    const target = e.target;
    if (target.className !== 'demo-btn') return false;
    const item = options.list[target.dataset.index];
    const code = document.querySelector(`#${item.key}Code`).value;
    if (!code) return false;
    let fn = new Function(code); // 执行代码后释放内存
    fn();
    fn = null;
  });
}

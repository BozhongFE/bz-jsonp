
import json from 'rollup-plugin-json'; // 从json中读取文件
// import resolve from 'rollup-plugin-node-resolve'; // 查找外部模块
// import commonjs from 'rollup-plugin-commonjs'; // 将CommonJS转换成ES2015模块
const { npm_package_version: version, npm_package_name: name } = process.env;

// 基础通用配置
export default {
  input: './src/main.js',
  output: {
    name: 'bzBlock',
    paths: {
      BzConfig: 'https://scdn.bozhong.com/source/common/js/config.js',
    },
    legacy: true, // IE8之类的旧环境支持
    exports: 'named', // 用户可引入require('block').method;
    // extend: true,
    banner: `/* ${name} version ${version} */`, // 添加在打包文件中最顶部
    // footer: '/* */', // 添加在打包文件中最底部
    // intro: '', // 添加在核心代码最前
    // outro: '', // 添加在核心代码最末
    // sourcemap: true,
  },
  external: [
    'BzConfig',
  ],
  perf: true,
  plugins: [
    json(),
    // resolve(),
    // commonjs(),
  ],
};

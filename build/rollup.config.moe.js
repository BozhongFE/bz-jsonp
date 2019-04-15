
import baseConfig from './rollup.config';
import babel from 'rollup-plugin-babel'; // 使用未被浏览器和node.js支持的未来版本的js特性
import { uglify } from 'rollup-plugin-uglify'; // 使用未被浏览器和node.js支持的未来版本的js特性

// 获取moe目标路径
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

const { npm_package_version: version, npm_package_name: name, npm_config_bz_mod } = process.env;

let modulePath = npm_config_bz_mod;
if (typeof modulePath === 'undefined') {
  console.log('请先配置source下模块存放目录');
  console.log('Example: npm config set bz-mod "D:/source/moe"');
  throw new Error('没有配置source下模块存放目录');
} else if (!existsSync(modulePath)) {
  throw new Error('模块存放目录不存在，请检查配置的模块存放目录是否正确');
} else {
  modulePath = path.join(modulePath, name);
  if (!existsSync(modulePath)) mkdirSync(modulePath);
  modulePath = path.join(modulePath, version);
  if (!existsSync(modulePath)) mkdirSync(modulePath);
}

export default [
  // moe-debug
  Object.assign({}, baseConfig, {
    output: [
      Object.assign({}, baseConfig.output, {
        file: `${modulePath}/index-debug.js`,
        format: 'umd',
      }),
    ],
    plugins: [
      ...baseConfig.plugins,
      babel({
        babelrc: false,
        presets: [['@babel/preset-env', { modules: false }]],
        exclude: 'node_modules/**',
      }),
    ],
  }),
  // moe
  Object.assign({}, baseConfig, {
    output: [
      Object.assign({}, baseConfig.output, {
        file: `${modulePath}/index.js`,
        format: 'umd',
      }),
    ],
    plugins: [
      ...baseConfig.plugins,
      babel({
        babelrc: false,
        presets: [['@babel/preset-env', { modules: false }]],
        exclude: 'node_modules/**',
      }),
      uglify(),
    ],
  }),
];

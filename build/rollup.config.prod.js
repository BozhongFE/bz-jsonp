
import baseConfig from './rollup.config';
import babel from 'rollup-plugin-babel'; // 使用未被浏览器和node.js支持的未来版本的js特性

const { npm_package_name: name } = process.env;

export default [
  // esm
  Object.assign({}, baseConfig, {
    output: Object.assign({}, baseConfig.output, {
      file: `./dist/${name}.esm.js`,
      format: 'esm',
    }),
  }),
  // umd
  Object.assign({}, baseConfig, {
    output: Object.assign({}, baseConfig.output, {
      file: `./dist/${name}.umd.js`,
      format: 'umd',
    }),
    plugins: [
      ...baseConfig.plugins,
      babel({
        babelrc: false,
        presets: [['@babel/preset-env', { modules: false }]],
        exclude: 'node_modules/**',
      }),
    ],
  }),
];

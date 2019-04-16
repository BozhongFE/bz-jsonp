
import baseConfig from './rollup.config';
import prodConfig from './rollup.config.prod';
import babel from 'rollup-plugin-babel'; // 使用未被浏览器和node.js支持的未来版本的js特性
import address from 'address';
import livereload from 'rollup-plugin-livereload'; // 热更新
import serve from 'rollup-plugin-serve'; // serve服务

const { npm_package_version: version, npm_package_name: name } = process.env;

// 获取ip
const getAddressIP = () => {
  let lanUrlForConfig = address.ip();
  if (!/^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(lanUrlForConfig)) {
    lanUrlForConfig = undefined;
  }
  return lanUrlForConfig;
}

// 模块在window下的名字
// const globalName = name.replace(/(^|-)([a-z])/g, (x, y, w) => w.toUpperCase());

export default [
  ...prodConfig,
  Object.assign({}, baseConfig, {
    input: {
      demo: './src/demo/index.js',
    },
    output: Object.assign({}, baseConfig.output, {
      dir: './demo/',
      format: 'umd',
      banner: `/* ${name} v${version} demo*/`, // 添加在打包文件中最顶部
      intro: `var version = '${version}'; \nvar name = '${name}';\ndocument.title='${name}#v${version} demo'`,
      paths: Object.assign({
        core: `../dist/${name}.umd`,
        artTemplate: 'https://scdn.bozhong.com/source/m/js/art-template.js',
      }, baseConfig.output.paths),
      globals: {
        // `dist/${name}.umd`: core,
        // core: globalName,
      },
    }),
    external: [
      ...baseConfig.external,
      'core',
    ],
    plugins: [
      ...baseConfig.plugins,
      serve({
        contentBase: '.',
        host: getAddressIP() || '0.0.0.0',
        port: 12306,
        open: true,
        openPage: '/demo/',
      }),
      livereload({
        watch: ['./dist/', './demo/'],
      }),
      babel({
        babelrc: false,
        presets: [['@babel/preset-env', { modules: false }]],
        exclude: 'node_modules/**',
      }),
    ],
  }),
];

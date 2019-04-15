const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

// 获取moe目标路径
const { npm_package_version: version, npm_package_name: name, npm_config_bz_mod } = process.env;

let modulePath = npm_config_bz_mod;
if (typeof modulePath === 'undefined') {
  console.log('请先配置source下模块存放目录');
  console.log('Example: npm config set bz-mod "D:/source/moe"');
  throw new Error('没有配置source下模块存放目录');
} else if (!fs.existsSync(modulePath)) {
  throw new Error('模块存放目录不存在，请检查配置的模块存放目录是否正确');
} else {
  modulePath = path.join(modulePath, name);
  if (!fs.existsSync(modulePath)) fs.mkdirSync(modulePath);
  modulePath = path.join(modulePath, version);
  if (!fs.existsSync(modulePath)) fs.mkdirSync(modulePath);
}


fs.exists('./demo', (exists) => {
  if (!exists) {
    console.log('请先确定demo目录是否存在');
    throw new Error('demo目录不存在');
  } else {
    // 删除已存在的demo
    const moeDemoPath = modulePath + '/demo';
    shell.rm('-rf', moeDemoPath);
    shell.cp('-R',  './demo/', moeDemoPath);
    shell.cd(moeDemoPath);
    shell.ls('demo.js').forEach((file) => {
      shell.sed('-i', /^.*livereload.*$/, '', file);// 删除livereload监听
      shell.sed('-i', /'..\/dist\/(\S)*.umd'/, '\'../index\'', file);
    });
  }
})
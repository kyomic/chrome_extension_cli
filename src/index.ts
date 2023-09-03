#!/usr/bin/env npx ts-node --esm

import { program } from 'commander';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

import env from './env';
import { createChromePlugins } from './utils/chrome';
import file from './utils/file';
const devMode = env.env != 'prod';

env.chromePluginDir = (() => {
  return process.cwd();
  // const __filename = fileURLToPath(import.meta.url);
  // const __dirname = dirname(__filename);
  // return resolve(__dirname, `${devMode ? '..' : '.'}/`);
})();

console.log(`环境信息：`, env);
//const program = new Command()
program
  .name('chrome-cli')
  .version('0.0.1')
  .usage('<command> [options]')
  .description('Chrome Extentsion 插件项目生成工具');

program
  .command('create <extension-name>')
  .option('--force', '是否覆盖已经存在的项目')
  .description('创建插件的名称')
  .action(async (name, option, cmd) => {
    //const
    const { force } = option;
    console.log('name=', name, 'option', option);
    const opt = program.opts();
    console.log('选项：', cmd.opts());
    await createChromePlugins(name, force);
  });

program.command('hello [st]').action(function (st, value) {
  hello(st, value);
});

function hello(val, o) {
  console.log(val);
  console.log(1);
  console.log(o);
}

// program
//   .option('-f --flag [value]', '保存', 'ha')
//   .option('-t --tale [value]', '保存')

if (devMode) {
  createChromePlugins('abc');
} else {
  program.parse(process.argv);
}

console.log(global.flag);

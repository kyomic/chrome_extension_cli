#!/usr/bin/env npx ts-node --esm
// import moduleAlias from 'module-alias';
// console.log('moduleAlias', moduleAlias)
// //
// moduleAlias.addAlias('@', (fromPath, request, alias) => {
//   //console.log('.....')

//   // fromPath - Full path of the file from which `require` was called
//   // request - The path (first argument) that was passed into `require`
//   // alias - The same alias that was passed as first argument to `addAlias` (`@src` in this case)

//   // Return any custom target path for the `@src` alias depending on arguments
//   const rootDir = __dirname;
//   console.log("rootDir===", rootDir)
//   //if (fromPath.startsWith(__dirname + '/others')) return __dirname + '/others'
//   return rootDir + (process.env.NODE_ENV == 'production' ? '../dist/' : './')
// })
// moduleAlias()
//import 'module-alias/register';
// const moduleAlias = require('module-alias')
// moduleAlias.addPath(__dirname + '/src')

// //
// // Import settings from a specific package.json
// //
// moduleAlias(__dirname + '/package.json')
// moduleAlias()
// import moduleAlias from 'module-alias';
// //import 'module-alias/register';
// moduleAlias.addAlias('@', (fromPath, request, alias) => {
//   console.log("rn...")
// })

// moduleAlias()
//

// import moduleAlias from 'module-alias';
// import * as path from 'path';
// import { compilerOptions } from '../tsconfig.json';

// const root = path.join(__dirname, compilerOptions.baseUrl || '');

// for (const [key, paths] of Object.entries(compilerOptions.paths)) {
//   const target = path.join(root, paths[0]);
//   moduleAlias.addAlias(key, target);
// }


//import { createChromePlugins } from "./utils";
import { abc } from "@/tpl/abc";
import { program } from "commander"
console.log('abc', abc)
//const program = new Command()
program
  .name('chrome-cli')
  .version('0.0.1')
  .usage('<command> [options]')
  .description('Chrome Extentsion 插件项目生成工具')


program
  .command('create <extension-name>')
  .option('-f, --force <boolean>', '是否覆盖已经存在的项目', false)
  .description('创建插件的名称')
  .action(async (name, option, cmd) => {
    //const 
    const { force } = option;

    console.log('name=', name, 'option', option)
    const opt = program.opts();
    console.log('选项：', cmd.opts())
    // await createChromePlugins(name)
  })

program
  .command('hello [st]')
  .action(function (st, value) {
    hello(st, value);
  })

function hello(val, o) {
  console.log(val);
  console.log(1);
  console.log(o)
}

// program
//   .option('-f --flag [value]', '保存', 'ha')
//   .option('-t --tale [value]', '保存')

program.parse(process.argv);


console.log(global.flag);

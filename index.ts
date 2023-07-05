#!/usr/bin/env npx ts-node --esm
import EventEmitter from "events"
console.log('EventEmitter', EventEmitter)
import { Command } from "commander"
const program = new Command()
program
  .name('chrome-cli')
  .version('0.0.1')
  .usage('<command> [options]')
  .description('Chrome Extentsion 插件项目生成工具')


program
  .command('create <extension-name>')
  .description('创建插件的名称')
  .option('-l, --limit [limit]', '是否强制覆盖已经存在的项目')
  .action((name, option)=>{
    console.log('name=',name, 'option',option)
  })

program
  .command('hello [st]')
  .action(function(st,value){
      hello(st,value);
  })

function hello(val,o){
    console.log(val);
    console.log(1);
    console.log(o)
}

program
    .option('-f --flag [value]','保存','ha')
    .option('-t --tale [value]','保存')

program.parse(process.argv);


console.log(global.flag);

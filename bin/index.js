#!/usr/bin/env npx ts-node --esm
import { program } from "commander";
//const program = new Command()
program
    .name('chrome-cli')
    .version('0.0.1')
    .usage('<command> [options]')
    .description('Chrome Extentsion 插件项目生成工具');
program
    .command('create <extension-name>')
    .option('-f, --force <boolean>', '是否覆盖已经存在的项目', false)
    .description('创建插件的名称')
    .action((name, option, cmd) => {
    //const 
    console.log('name=', name, 'option', option);
    const opt = program.opts();
    console.log('选项：', cmd.opts());
});
program
    .command('hello [st]')
    .action(function (st, value) {
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
program.parse(process.argv);
console.log(global.flag);
//# sourceMappingURL=index.js.map
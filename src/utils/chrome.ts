import path, { resolve } from 'path';
import chalk from 'chalk';
import env, { EnvType } from '../env';
import file from './file';
import inquirer from 'inquirer';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const devMode = env.env != 'prod';

/**
 *
 * @param name 插件的名称(目录名)
 * @param force
 */
export const createChromePlugins = async (
  name: string,
  force: boolean = false
) => {
  console.log('创建插件', name, '根目录:', env.chromePluginDir);

  // 插件根目录
  const root = env.chromePluginDir;
  const chromeDir = root + '/' + name;
  const isExist = await file.existFile(chromeDir);

  if (!isExist) {
    await file.createDir(chromeDir);
  } else {
    if (!force) {
      console.warn(`已经存在项目:${name}，位置 :${chromeDir}`);
      const anwser = await inquirer.prompt([
        {
          type: 'confirm',
          message: `是否覆盖已在的项目:${name}?`,
          name: 'force',
          default: 'true',
        },
      ]);
      if (anwser.force) {
        await file.rmdir(chromeDir);
        console.log(`清除目录：${chromeDir}`);
      } else {
        return;
      }
    }
  }

  // 创建项目
  const template = require(`${devMode ? '..' : '.'}/tpl/config.json`);
  const configs = Object.keys(template.templates).map(key => {
    const item = template.templates[key];
    return { ...item, value: key, name: `${item.name}(${item.description})` };
  });

  const anwser = await inquirer.prompt([
    {
      type: 'rawlist',
      message: '请选择插件模板',
      name: 'name',
      default: 0,
      choices: configs,
    },
  ]);
  let source = '';
  if (devMode) {
    source = `${root}/src/tpl/${anwser.name}`;
  } else {
    source = resolve(__dirname, `./tpl/${anwser.name}`);
  }
  //console.log('source', source, 'target', chromeDir);
  await file.copyFile(source, chromeDir);
  console.log('插件创建成功，可以通过以下命令进行插件开发:');
  //await launchChromePlugin(name);
  console.log(chalk.green(`cd ${anwser.name}\n` + `npm run dev`));
};

/**
 * 启动插件
 * @param name
 * @param env
 * @returns
 */
export const launchChromePlugin = async (name: string = '') => {
  // 插件根目录
  const root = env.chromePluginDir;
  const chromeDir = root + '/' + name;
  const isExist = await file.existFile(chromeDir);
  if (!isExist) {
    console.error(`启动插件:${name}失败, 请确保插件创建成功`);
    return;
  }
  console.log(`启动插件：${name}`);
};

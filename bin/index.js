#!/usr/bin/env node
import { program } from 'commander';
import * as path from 'path';
import path__default, { dirname, resolve } from 'path';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import { createRequire } from 'module';

let env = {
  env: process.env.VITE_ENV ?? "prod",
  chromePluginDir: ""
};
console.log(`环境信息（原始)：`, env);

const fspromise = fs.promises;
let file = {
  /**
   * 返回当前目录名，同 __dirname
   */
  resolveFileDir: (name = "") => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return __dirname + "/" + name;
  },
  async existFile(path2) {
    return await fse.pathExists(path2);
  },
  async createDir(path2) {
    return fse.ensureDirSync(path2);
  },
  async readFile(filename, encoding = null) {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, encoding, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  /**
   * 递归删除目录下所有的文件
   * @param filePath
   */
  async rmdir(filePath) {
    let stat = await fspromise.stat(filePath);
    if (stat.isFile()) {
      await fspromise.unlink(filePath);
    } else {
      let dirs = await fspromise.readdir(filePath);
      dirs = dirs.map((dir) => path.join(filePath, dir));
      for (let dir of dirs) {
        await file.rmdir(dir);
      }
      await fspromise.rmdir(filePath);
    }
  },
  async writeFile(filename, data) {
    return fse.writeFile(filename, data);
  },
  async readdir(str) {
    return new Promise((resolve, reject) => {
      fs.readdir(str, (err, files) => {
        if (err) {
          reject(str);
        } else {
          resolve(files);
        }
      });
    });
  },
  async stat(src) {
    return new Promise((resolve, reject) => {
      return fs.stat(src, function(err, stat) {
        if (err) {
          reject(err);
        } else {
          resolve(stat);
        }
      });
    });
  },
  /**
   *
   * 将文件夹中的文件复制至目标文件夹
   * @param src - 源文件夹
   * @param dst - 目标文件夹
   * @returns
   */
  async copyFile(src, dst) {
    return new Promise(async (resolve, reject) => {
      let paths = [];
      let stat = await file.stat(src);
      if (stat && stat.isFile()) {
        let readable = fs.createReadStream(src);
        let writable = fs.createWriteStream(dst);
        readable.pipe(writable);
      } else {
        paths = fs.readdirSync(src);
      }
      for (let path2 of paths) {
        let _src = src + "/" + path2;
        let _dst = dst + "/" + path2;
        let stat2 = null;
        try {
          stat2 = await file.stat(_src);
        } catch (err) {
        }
        if (stat2 && stat2.isFile()) {
          try {
            await fse.ensureDir(_dst.substring(0, _dst.lastIndexOf("/")));
          } catch (err) {
          }
          let readable = fs.createReadStream(_src);
          let writable = fs.createWriteStream(_dst);
          readable.pipe(writable);
        } else {
          try {
            await fse.ensureDir(dst);
          } catch (err) {
          }
          await this.copyFile(_src, _dst);
        }
      }
      resolve(true);
    });
  },
  /**
   * 队列式的写入文件,TODO
   * @param filename
   * @param content
   */
  async writeFileWithQueue(filename, content) {
    return await fse.writeFile(filename, content);
  }
};

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path__default.dirname(__filename);
const devMode$1 = env.env != "prod";
const createChromePlugins = async (name, force = false) => {
  console.log("创建插件", name, "根目录:", env.chromePluginDir);
  const root = env.chromePluginDir;
  const chromeDir = root + "/" + name;
  const isExist = await file.existFile(chromeDir);
  if (!isExist) {
    await file.createDir(chromeDir);
  } else {
    if (!force) {
      console.warn(`已经存在项目:${name}，位置 :${chromeDir}`);
      const anwser2 = await inquirer.prompt([
        {
          type: "confirm",
          message: `是否覆盖已在的项目:${name}?`,
          name: "force",
          default: "true"
        }
      ]);
      if (anwser2.force) {
        await file.rmdir(chromeDir);
        console.log(`清除目录：${chromeDir}`);
      } else {
        return;
      }
    }
  }
  console.log("exist", isExist);
  const template = require(`${devMode$1 ? ".." : "."}/tpl/config.json`);
  const configs = Object.keys(template.templates).map((key) => {
    const item = template.templates[key];
    return { ...item, value: key, name: `${item.name}(${item.description})` };
  });
  const anwser = await inquirer.prompt([
    {
      type: "rawlist",
      message: "请选择你的老婆",
      name: "name",
      default: 0,
      choices: configs
    }
  ]);
  let source = "";
  if (devMode$1) {
    source = `${root}/src/tpl/${anwser.name}`;
  } else {
    source = resolve(__dirname, `./tpl/${anwser.name}`);
  }
  console.log("source", source, "target", chromeDir);
  await file.copyFile(source, chromeDir);
  console.log("anser", anwser);
};

const devMode = env.env != "prod";
env.chromePluginDir = (() => {
  return process.cwd();
})();
console.log(`环境信息：`, env);
program.name("chrome-cli").version("0.0.1").usage("<command> [options]").description("Chrome Extentsion 插件项目生成工具");
program.command("create <extension-name>").option("--force", "是否覆盖已经存在的项目").description("创建插件的名称").action(async (name, option, cmd) => {
  const { force } = option;
  console.log("name=", name, "option", option);
  program.opts();
  console.log("选项：", cmd.opts());
  await createChromePlugins(name, force);
});
program.command("hello [st]").action(function(st, value) {
  hello(st, value);
});
function hello(val, o) {
  console.log(val);
  console.log(1);
  console.log(o);
}
if (devMode) {
  createChromePlugins("abc");
} else {
  program.parse(process.argv);
}
console.log(global.flag);

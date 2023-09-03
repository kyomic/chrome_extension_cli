import { resolve, dirname } from 'path';
import * as path from 'path';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import { build } from 'vite';
import { fileURLToPath, pathToFileURL } from 'url';
import injectNode from './inject.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 *
 * 将文件夹中的文件复制至目标文件夹
 * @param src - 源文件夹
 * @param dst - 目标文件夹
 * @returns
 */
function copyFile(src, dst) {
  let paths = [];
  let stat = fs.statSync(src);
  if (stat && stat.isFile()) {
    let readable = fs.createReadStream(src);
    let writable = fs.createWriteStream(dst);
    readable.pipe(writable);
  } else {
    paths = fs.readdirSync(src); //同步读取当前目录
  }
  for (let path of paths) {
    let _src = src + '/' + path;
    let _dst = dst + '/' + path;
    let stat;
    try {
      stat = fs.statSync(_src);
    } catch (err) {}
    if (stat && stat.isFile()) {
      try {
        fse.ensureDirSync(_dst.substring(0, _dst.lastIndexOf('/')));
      } catch (err) {}
      let readable = fs.createReadStream(_src);
      let writable = fs.createWriteStream(_dst);
      readable.pipe(writable);
    } else {
      try {
        fse.ensureDirSync(dst);
      } catch (err) {}
      copyFile(_src, _dst);
    }
  }
}

!(async () => {
  try {
    await build({
      configFile: resolve(__dirname, '../vite.config.ts'),
    });
    injectNode();
    copyFile('./src/tpl', './bin/tpl');
  } catch (e) {
    console.log('error:' + e);
    process.exit(1);
  }
})();

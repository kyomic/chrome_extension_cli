import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const fspromise = fs.promises;

let file = {
  /**
   * 返回当前目录名，同 __dirname
   */
  resolveFileDir: (name = '') => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return __dirname + '/' + name;
  },
  async existFile(path: string): Promise<any> {
    return await fse.pathExists(path);
  },
  async createDir(path: string): Promise<any> {
    return fse.ensureDirSync(path);
  },
  async readFile(filename: string, encoding: any = null): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, encoding, (err: any, data: Buffer) => {
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
  async rmdir(filePath: string): Promise<any> {
    let stat = await fspromise.stat(filePath);
    if (stat.isFile()) {
      await fspromise.unlink(filePath);
    } else {
      let dirs = await fspromise.readdir(filePath);
      dirs = dirs.map(dir => path.join(filePath, dir));
      for (let dir of dirs) {
        await file.rmdir(dir);
      }
      await fspromise.rmdir(filePath);
    }
  },

  async writeFile(filename: string, data: any): Promise<any> {
    return fse.writeFile(filename, data);
  },
  async readdir(str: string | Buffer): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(str, (err, files: string[]) => {
        if (err) {
          reject(str);
        } else {
          resolve(files);
        }
      });
    });
  },
  async stat(src: string) {
    return new Promise((resolve, reject) => {
      return fs.stat(src, function (err, stat) {
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
  async copyFile(src: string, dst: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      let paths: any = [];
      let stat: fs.Stats = (await file.stat(src)) as fs.Stats;
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
        let stat: fs.Stats | null = null;
        try {
          stat = (await file.stat(_src)) as fs.Stats;
        } catch (err) {}
        if (stat && stat.isFile()) {
          try {
            await fse.ensureDir(_dst.substring(0, _dst.lastIndexOf('/')));
          } catch (err) {}
          let readable = fs.createReadStream(_src);
          let writable = fs.createWriteStream(_dst);
          readable.pipe(writable);
        } else {
          try {
            await fse.ensureDir(dst);
          } catch (err) {}
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
  async writeFileWithQueue(filename: string, content: string) {
    //TODO
    //see"https://blog.csdn.net/qq_36233381/article/details/106772523
    return await fse.writeFile(filename, content);
  },
};

export { file };

export default file;

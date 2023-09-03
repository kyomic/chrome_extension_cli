import * as fs from 'fs';
export default () => {
  const versionFile = './bin/index.js';
  let content = fs.readFileSync(versionFile).toString();
  const env = process.argv[2] || 'dev';
  content = '#!/usr/bin/env node\n' + content;
  fs.writeFileSync(versionFile, content);
};

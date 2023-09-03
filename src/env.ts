import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const version = require('../package.json').version;
export type EnvType = 'dev' | 'prod';
let env = {
  version,
  env: process.env.VITE_ENV ?? 'prod',
  chromePluginDir: '',
};

export default env;

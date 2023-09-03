import { UserConfig, defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

const config: UserConfig = {
  root: __dirname,
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: resolve(__dirname, './bin'),
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      formats: ['es'],
      name: 'chromecli',
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
      },
      output: {
        comments: 'all',
      },
    },
    rollupOptions: {
      external: [
        'path',
        'child_process',
        'fs',
        'fs-extra',
        'url',
        'module',
        'commander',
        'inquirer',
        'chalk',
        'download-git-repo',
      ],
      output: {
        strict: false,
        entryFileNames: '[name].js',
      },
    },
    ssr: false,
    ssrManifest: false,
    emptyOutDir: true,
  },
};

const definedConfig = defineConfig(mode => {
  const env = loadEnv(mode.mode, process.cwd());
  console.log('env===', env);
  return config;
});
export default definedConfig;

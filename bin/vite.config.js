import { defineConfig, loadEnv } from 'vite';
import path, { resolve } from 'path';
// https://vitejs.dev/config/
const defaultConfig = {
    build: {
        minify: "esbuild"
    },
    plugins: [],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    }
};
// see:http://www.5ityx.com/cate104/134659.html
// NODE class找不到，see:https://github.com/vitejs/vite/issues/9703
export default defineConfig(({ command, mode, ssrBuild }) => {
    const env = loadEnv(mode, process.cwd(), '');
    console.log('mode', mode);
    console.log('command', command);
    if (mode == 'library') {
        return Object.assign(Object.assign({}, defaultConfig), { resolve: Object.assign({}, defaultConfig.resolve), plugins: [
                ...defaultConfig.plugins,
            ], build: Object.assign(Object.assign({}, defaultConfig.build || {}), { 
                // support es5
                // commonjsOptions: {
                //   transformMixedEsModules: true, // https://github.com/chnejohnson/vue-dapp/issues/20
                // },
                outDir: 'bin', 
                // 不压缩，用于调试
                minify: false, lib: {
                    // Could also be a dictionary or array of multiple entry points
                    entry: resolve(__dirname, 'index.ts'),
                    name: '@cookee/moobox',
                    // the proper extensions will be added
                    fileName: 'index',
                } }) });
    }
    return {};
    if (command === "serve") {
        return Object.assign({}, defaultConfig);
    }
    else {
        return defaultConfig;
    }
});
//# sourceMappingURL=vite.config.js.map
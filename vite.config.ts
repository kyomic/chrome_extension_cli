import { defineConfig, loadEnv } from 'vite'
import path, { resolve } from 'path'

// yarn add --dev @esbuild-plugins/node-globals-polyfill
import {NodeGlobalsPolyfillPlugin} from '@esbuild-plugins/node-globals-polyfill'
// yarn add --dev @esbuild-plugins/node-modules-polyfill
import {NodeModulesPolyfillPlugin} from '@esbuild-plugins/node-modules-polyfill'
// You don't need to add this to deps, it's included by @esbuild-plugins/node-modules-polyfill
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
// see:https://terwergreen.com/post/vite-uses-nodejs-built-in-modules-z12udha.html#%E9%97%AE%E9%A2%98%E5%BC%95%E5%85%A5
// see:https://github.com/vitejs/vite/issues/9703
// https://vitejs.dev/config/


const defaultConfig = {
  build: {
    minify: "esbuild"
  },
  plugins: [
    
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  }
}
// see:http://www.5ityx.com/cate104/134659.html
// NODE class找不到，see:https://github.com/vitejs/vite/issues/9703

export default defineConfig(({ command, mode, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log('mode', mode)
  console.log('command', command)
  if (mode == 'library') {
    return {
      ...defaultConfig,
      resolve:{
        ...defaultConfig.resolve,
        alias:{
          ...defaultConfig.resolve.alias,
          process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
          buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
          events: 'rollup-plugin-node-polyfills/polyfills/events',
          util: 'rollup-plugin-node-polyfills/polyfills/util',
          sys: 'util',
          stream: 'rollup-plugin-node-polyfills/polyfills/stream',
          _stream_duplex:
            'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
          _stream_passthrough:
            'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
          _stream_readable:
            'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
          _stream_writable:
            'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
          _stream_transform:
            'rollup-plugin-node-polyfills/polyfills/readable-stream/transform',
        }
      },
      plugins: [
        ...defaultConfig.plugins,
      ],
      optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis'
            },
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    process: true,
                    buffer: true
                }),
                NodeModulesPolyfillPlugin()
            ]
        }
      },
      build: {
        ...defaultConfig.build || {},
        // support es5
        // commonjsOptions: {
        //   transformMixedEsModules: true, // https://github.com/chnejohnson/vue-dapp/issues/20
        // },
        outDir: 'bin',
        // 不压缩，用于调试
        minify: false,
        rollupOptions: {
            plugins: [
                // Enable rollup polyfills plugin
                // used during production bundling
                rollupNodePolyFill()
            ]
        },
        lib: {
          // Could also be a dictionary or array of multiple entry points
          entry: resolve(__dirname, 'index.ts'),
          name: '@cookee/moobox',
          // the proper extensions will be added
          fileName: 'index',
        }
      }

    }
  }
  return {

  }
  if (command === "serve") {
    return {
      ...defaultConfig
    }
  } else {
    return defaultConfig
  }
})


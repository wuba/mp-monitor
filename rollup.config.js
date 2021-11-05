import resolve from 'rollup-plugin-node-resolve';
import rollupTypescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: './src/sdk.ts',
  output: [
    {
      file: 'dist/mp-monitor.js',
      format: 'cjs'
    },
    {
      file: 'dist/mp-monitor.es.js',
      format: 'es'
    },
    {
      file: 'dist/mp-monitor.min.js',
      format: 'cjs',
      plugins: [uglify({
        compress: {
          drop_console: false
        },
      })],
    }
  ],
  plugins: [
    commonjs(),
    resolve({
      // 将自定义选项传递给解析插件
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    rollupTypescript(),
    babel({
      runtimeHelpers: true,
      // 只转换源代码，不运行外部依赖
      exclude: 'node_modules/**',
      // babel 默认不支持 ts 需要手动添加
      extensions: [
        ...DEFAULT_EXTENSIONS,
        '.ts',
      ],
    })
  ],
  // 指出应将哪些模块视为外部模块
  external: ['lodash']
};

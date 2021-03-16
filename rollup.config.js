import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';

const globalPackages = {};

const shared = {
  input: `compiled/nameOf.js`,
  plugins: [
    resolve(),
    commonjs({
      include: /node_modules/,
    }),
    sourceMaps(),
    terser({ format: { comments: false } }),
    cleanup(),
    filesize(),
  ],
  external: Object.keys(globalPackages),
};

export default [
  Object.assign({}, shared, {
    output: {
      format: 'umd',
      name: 'nameOf',
      exports: 'named',
      sourcemap: true,
      global: globalPackages,
      file: 'dist/nameOf.umd.js',
    },
  }),

  Object.assign({}, shared, {
    output: {
      exports: 'named',
      sourcemap: true,
      global: globalPackages,
      file: 'dist/nameOf.es6.js',
      format: 'es',
    },
  }),

  Object.assign({}, shared, {
    output: {
      exports: 'named',
      sourcemap: true,
      global: globalPackages,
      file: 'dist/nameOf.js',
      format: 'cjs',
    },
  }),
];

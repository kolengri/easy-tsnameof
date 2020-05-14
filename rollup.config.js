import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';

const globalPackages = {};

const shared = {
  input: `compiled/nameOf.js`,
  plugins: [sourceMaps()],
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
    plugins: [
      resolve(),
      commonjs({
        include: /node_modules/,
      }),
      sourceMaps(),
      terser(),
      filesize(),
    ],
  }),

  Object.assign({}, shared, {
    output: {
      exports: 'named',
      sourcemap: true,
      global: globalPackages,
      file: 'dist/nameOf.es6.js',
      format: 'es',
    },
    plugins: [
      resolve(),
      commonjs({
        include: /node_modules/,
      }),
      sourceMaps(),
      terser(),
    ],
  }),

  Object.assign({}, shared, {
    output: {
      exports: 'named',
      sourcemap: true,
      global: globalPackages,
      file: 'dist/nameOf.js',
      format: 'cjs',
    },
    plugins: [
      resolve(),
      commonjs({
        include: /node_modules/,
      }),
      sourceMaps(),
      terser(),
    ],
  }),
];

import PeerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import image from '@rollup/plugin-image'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import pkg from './package.json' assert { type: 'json' }

const extensions = ['js', 'jsx', 'ts', 'tsx']
const external = ['react', 'react-dom']

export default {
  external,
  input: './lib/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
    {
      name: pkg.name,
      file: pkg.browser,
      format: 'umd',
    },
  ],
  plugins: [
    PeerDepsExternal(),
    resolve({ extensions }),
    commonjs({ include: /node_modules/ }),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    babel({
      babelHelpers: 'runtime',
      extensions,
      include: ['lib/**/*'],
      exclude: /node_modules/,
    }),
    image(),
  ],
}

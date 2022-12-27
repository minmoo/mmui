import { readFileSync } from 'fs'
import PeerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import image from '@rollup/plugin-image'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'

const pkg = JSON.parse(readFileSync('./package.json'))
const extensions = ['js', 'jsx', 'ts', 'tsx']
const external = ['react', 'react-dom', /@emotion\/styled/, /@emotion\/react/]

export default {
  external,
  input: './lib/index.ts',
  output: [
    {
      dir: './dist',
      format: 'cjs',
      preserveModules: true,
      preserveModulesRoot: 'lib',
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
    typescript({ useTsconfigDeclarationDir: true }),
    babel({
      babelHelpers: 'runtime',
      extensions,
      include: ['lib/**/*'],
      exclude: /node_modules/,
    }),
    commonjs({ include: /node_modules/ }),
    image(),
  ],
}

import { babel } from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import PeerDepsExternal from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'
import pkg from './package.json' assert { type: 'json' }

export default [
  {
    input: 'src/index.ts',
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
    ],
    plugins: [
      PeerDepsExternal(),
      commonjs(),
      nodeResolve(),
      //typescript가 babel보다 먼저 있어야한다!
      typescript({
        useTsconfigDeclarationDir: true,
        tsconfig: './tsconfig.json',
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**/*.(ts|tsx|js|jsx)',
        include: 'src/**/*.(ts|tsx|js|jsx)',
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.es', '.es6', '.mjs'],
      }),
      terser(),
    ],
  },
  {
    input: 'lib/index.d.ts',
    output: [{ file: 'lib/index.d.ts', format: 'cjs' }],
    plugins: [dts()],
  },
]

import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  output: {
    file: 'lib/index.js',
    format: 'umd',
    name: 'Logger',
    sourcemap: true,
    exports: 'named',
  },
  plugins: [typescript()],
  watch: {
    include: 'src/**/*',
  },
}

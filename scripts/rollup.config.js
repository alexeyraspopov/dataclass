import babel from 'rollup-plugin-babel';

let config = {
  babelrc: false,
  presets: [['env', { modules: false }]],
  plugins: ['external-helpers'],
};

export default [
  {
    input: 'modules/Record.js',
    output: {
      file: 'build/dataclass.js',
      format: 'cjs',
    },
    plugins: [babel(config)],
  },
  {
    input: 'modules/Record.js',
    output: {
      file: 'build/dataclass.module.js',
      format: 'es',
    },
    plugins: [babel(config)],
  },
];

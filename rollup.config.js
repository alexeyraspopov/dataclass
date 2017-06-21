import babel from 'rollup-plugin-babel';

const config = {
  babelrc: false,
  plugins: [
    'external-helpers',
    'transform-es2015-classes',
    'transform-es2015-arrow-functions',
    'transform-es2015-parameters',
    'transform-es2015-block-scoping',
    'transform-flow-strip-types'
  ]
};

export default {
  plugins: [babel(config)]
};

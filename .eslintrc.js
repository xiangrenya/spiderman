module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: ['react'],
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true
  },
  globals: {},
  rules: {
    'no-console': 1,
    'no-underscore-dangle': 1,
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'react/no-did-update-set-state': 1,
    'no-param-reassign': 1,
    'no-use-before-define': 1,
    'no-plusplus': 1,
    'react/forbid-prop-types': 1,
  }
}
  
module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: ['react'],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {},
  rules: {
    'no-console': 0,
    'no-underscore-dangle': 0,
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'react/no-did-update-set-state': 0,
    'no-param-reassign': 0,
    'no-use-before-define': 0,
    'no-plusplus': 0,
    'react/forbid-prop-types': 0,
  }
}
  
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off',
    'import/no-extraneous-dependencies': ['error', { 'devDependencies': true }],
    'linebreak-style': 0,
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'class-methods-use-this': 0,
    'max-classes-per-file': 0
  }
};
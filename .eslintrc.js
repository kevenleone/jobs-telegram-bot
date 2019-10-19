'use strict';

const OFF = 0, WARN = 1, ERROR = 2;

module.exports = {
  'env': {
    'node': true,
    'es6': true
  },
  'extends': ['eslint:recommended', 'standard'],
  'parserOptions': {
    'ecmaVersion': 2017,
    'sourceType': 'module'
  },
  'rules': {
    'indent': [ERROR, 2, { SwitchCase: 1, VariableDeclarator: 0 }],
    'linebreak-style': [ERROR, 'unix'],
    'one-var': OFF,
    'space-before-function-paren': OFF,
    'quotes': [ERROR, 'single'],
    'semi': [ERROR, 'always'],
    'brace-style': [ERROR, '1tbs'],
    'array-bracket-spacing': [ERROR, 'never'],
    'camelcase': [ERROR, { 'properties': 'always' }],
    'keyword-spacing': [ERROR],
    'eol-last': [ERROR],
    'no-trailing-spaces': [ERROR],
    'no-case-declarations': OFF,
    'no-path-concat': OFF,
    'no-unused-expressions': OFF,
    'no-multi-str': OFF,
    'camelcase': OFF
  },
  'globals': {
    'Promise': true,
    'describe': true,
    'it': true,
    'xit': true,
    'beforeEach': true,
    'afterEach': true,
    'should': true,
    'expect': true,
    'assert': true,
    'after': true
  }
};

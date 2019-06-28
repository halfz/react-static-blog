const path = require('path');

module.exports = {
  'parser': 'babel-eslint',
  'extends': [
    'airbnb',
  ],
  'env': {
    'browser': true,
    'node': true,
    'jest': true,
    'es6': true,
  },
  'globals': {
    'amplitude': 'readonly',
  },
  'plugins': [
    'import',
    'react',
    'jsx-a11y',
    'react-hooks',
  ],
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true,
    },
  },
  'rules': {
    'lodash-fp/use-fp': 'off',
    'lodash-fp/no-unused-result': 'off',
    'lodash-fp/no-extraneous-args': 'off',
    'quotes': [
      'error',
      'single',
      {
        'allowTemplateLiterals': true,
      },
    ],
    'arrow-parens': [
      'error',
      'always',
    ],
    'arrow-body-style': [
      2,
      'as-needed',
    ],
    'class-methods-use-this': 0,
    'comma-dangle': [
      2,
      'always-multiline',
    ],
    'func-names': [1, 'as-needed', { 'generators': 'as-needed' }],
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 2,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    'import/export': 0,
    'indent': 2,
    'react/no-multi-comp': 0,
    'function-paren-newline': 1,
    'object-curly-newline': 0,
    'prefer-destructuring': 1,
    'jsx-a11y/aria-props': 2,
    'jsx-a11y/heading-has-content': 0,
    'jsx-a11y/label-has-for': 2,
    'jsx-a11y/mouse-events-have-key-events': 2,
    'jsx-a11y/role-has-required-aria-props': 2,
    'jsx-a11y/role-supports-aria-props': 2,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 1,
    'no-use-before-define': 0,
    'prefer-template': 2,
    'react/forbid-prop-types': 0,
    'react/jsx-first-prop-new-line': [
      2,
      'multiline',
    ],
    'padded-blocks': 1,
    'react/jsx-filename-extension': 0,
    'react/jsx-no-target-blank': 0,
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'require-yield': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  'settings': {
    'import/resolver': {
      'node': {
        'paths': ['src'],
      },

    },
    'react': {
      'pragma': 'React',
      'version': '16.6',
    },
  },
};

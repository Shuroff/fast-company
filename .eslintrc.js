module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    indent: ['error', 4],
    'linebreak-style': 0,
    semi: [2, 'never'],
    'multiline-ternary': ['off'],
    quotes: ['error', 'single'],
    'jsx-quotes': [2, 'prefer-single'],
    'import/prefer-default-export': 'off',
    'import/newline-after-import': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': 'off',
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never' },
    ],
  },
}
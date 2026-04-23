// eslint.config.js
import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  {
    plugins: { prettier: prettierPlugin },
  },
  {
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
      'jsx-a11y/alt-text': [0],
      'react/jsx-no-useless-fragment': [0],
      'react/jsx-props-no-spreading': [1, { html: 'ignore' }],
      'react/prop-types': [0], // TODO: enable this
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'linebreak-style': ['error', 'unix'],
      'no-irregular-whitespace': [
        1,
        { skipStrings: true, skipTemplates: true, skipJSXText: true },
      ],
    },
  },
];

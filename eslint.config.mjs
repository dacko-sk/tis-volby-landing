// eslint.config.js
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
    js.configs.recommended,
    eslintConfigPrettier,
    {
        files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
        ...jsxA11y.flatConfigs.recommended,
        rules: {
            ...jsxA11y.flatConfigs.recommended.rules,
            'jsx-a11y/alt-text': [0],
        },
    },
    {
        plugins: { prettier: prettierPlugin },
    },
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    {
        rules: {
            'react/jsx-no-useless-fragment': [0],
            'react/jsx-props-no-spreading': [1, { html: 'ignore' }],
        },
    },
    {
        plugins: {
            'react-hooks': reactHooks,
        },
        settings: { react: { version: 'detect' } },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
        },
    },
    {
        languageOptions: {
            globals: {
                ...globals.serviceworker,
                ...globals.browser,
            },
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

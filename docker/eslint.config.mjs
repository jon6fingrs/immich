import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/.DS_Store',
      '**/node_modules',
      'dist',
      'lib/docker-compose/types.ts',
      'build',
      'package',
      '**/.env',
      '**/.env.*',
      '!**/.env.example',
      '**/pnpm-lock.yaml',
      '**/package-lock.json',
      '**/yarn.lock',
      'eslint.config.mjs',
      'vite.config.js',
      'coverage',
    ],
  },
  ...compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:unicorn/recommended'),
  {
    ignores: ['src/**'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        NodeJS: true,
      },

      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',

      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
      },
    },

    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_$',
          varsIgnorePattern: '^_$',
        },
      ],

      curly: 2,
      'unicorn/no-useless-undefined': 'off',
      'unicorn/prefer-spread': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-nested-ternary': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/import-style': 'off',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/require-await': 'error',
      'object-shorthand': ['error', 'always'],
    },
  },
];

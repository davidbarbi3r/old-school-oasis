/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/naming-convention */

module.exports = {
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      project: './tsconfig.json',
   },
   plugins: ['@typescript-eslint', 'prettier'],
   extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
   rules: {
      'prettier/prettier': [
         'error',
         {
            semi: true,
            singleQuote: true,
            trailingComma: 'all',
            arrowParens: 'always',
            printWidth: 100,
            tabWidth: 2,
            useTabs: false,
            bracketSpacing: true,
            jsxBracketSameLine: false,
            endOfLine: 'auto',
         },
      ],
      '@typescript-eslint/naming-convention': [
         'error',
         {
            selector: 'class',
            format: ['PascalCase'],
         },
         {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
               regex: '^I[A-Z]',
               match: true,
               message:
                  'Interface name "{{name}}" must start with the letter "I" and have a PascalCase name',
            },
         },
         {
            selector: 'typeLike',
            format: ['PascalCase'],
         },
         {
            selector: 'enumMember',
            format: ['UPPER_CASE'],
         },
         {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE'],
         },
         {
            selector: 'parameter',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
         },
         {
            selector: 'function',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
         },
         {
            selector: 'method',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
         },
         {
            selector: 'typeParameter',
            format: ['PascalCase'],
            prefix: ['T'],
         },
      ],
      'no-case-declarations': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-empty-function': 'off',
      'arrow-parens': ['error', 'always'],
      'no-console': 'warn',
      'no-unused-vars': 'off',
      'no-useless-constructor': 'off',
      'object-curly-spacing': ['error', 'always'],
      'comma-dangle': ['error', 'only-multiline'],
   },
  };
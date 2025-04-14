import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  parser: '@typescript-eslint/parser', // TypeScript parser
  parserOptions: {
    ecmaVersion: 2021, // ECMAScript version
    sourceType: 'module', // Enable ES Modules
  },
  plugins: ['@typescript-eslint'], // TypeScript plugin
  extends: [
    'eslint:recommended', // ESLint's recommended rules
    'plugin:@typescript-eslint/recommended', // TypeScript plugin's recommended rules
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn', // Warn about explicit 'any'
    'no-console': 'warn', // Warn about console.log usage
  },
  ignorePatterns: ['**/*.d.ts'], // Ignore TypeScript declaration files
});















export default {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'jest': true // This adds Jest globals
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended' // This adds Jest-specific rules
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'jest' // This adds Jest plugin
  ],
  rules: {
    // Your preferred rules
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
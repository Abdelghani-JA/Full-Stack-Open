module.exports = {
  root: true,
  env: { browser: true, es2020: true, 'jest/globals': true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'jest'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'react/prop-types': 0,
    indent: ['error', 2],
    quotes: ['error', 'single'],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'arrow-spacing': ['error', { before: true, after: true }],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'no-console': 0
  }
};

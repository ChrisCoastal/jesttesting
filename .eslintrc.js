module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],

      extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:testing-library/react', // need to add to use eslint-plugin-testing-library
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:jest/recommended', // need to add for eslint plugin jest
        'plugin:jest/style', // need to add for eslint plugin jest
        'next/core-web-vitals',
      ],

      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'testing-library/no-render-in-setup': [
      'error',
      { allowTestingFrameworkSetupHook: 'beforeEach' },
    ],
  },
};

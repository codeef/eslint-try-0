module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignores: ['**/node_modules/', '.git/'],
  plugins: ['@typescript-eslint', 'react-hooks', 'prettier'],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    // these two jsx rules are to enable the new jsx transform
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    // this rule enables require statements in the webpack config files
    '@typescript-eslint/no-var-requires': 0,
    // this rule enables using empty functions
    '@typescript-eslint/no-empty-function': 'off',
    // disable the default sort-imports of eslint because we are using the eslint-plugin-import for sorting imports
    'sort-imports': 'off',
    // ensure all import statements are before any other statements in a file
    'import/first': 'error',
    // enforce newline after import statements
    'import/newline-after-import': 'error',
    // ensure there are no imports of the same module in two places or more in a file
    'import/no-duplicates': 'error',
    'import/no-unresolved': 'off',
    // enforce order of imports by groups
    'import/order': [
      'error',
      {
        groups: [
          'external',
          'builtin',
          'internal',
          'parent',
          'index',
          'sibling',
        ],
        // ensure style files are imported last
        pathGroups: [
          {
            pattern: '**/*.+(css|sass|less|scss|pcss|styl)',
            group: 'object',
            position: 'after',
          },
          {
            pattern: '{.,..}/**/*.+(css|sass|less|scss|pcss|styl)',
            group: 'object',
            position: 'after',
          },
        ],
        // no newlines between groups
        'newlines-between': 'never',
        warnOnUnassignedImports: true,
        // enforce sorting inside each import group
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
        printWidth: 80,
      },
    ],
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['src'],
      },
    },
  },
};

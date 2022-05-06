module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'brace-style': 'off',
    'linebreak-style': 'off',
    'no-console': 'off',
    'import/extensions': ['error', 'ignorePackages'],
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'no-param-reassign': ['error', { props: false }],
    'no-unused-expressions': ['error', { allowTernary: true }],
    'function-paren-newline': ['error', 'never'],
    'react/prop-types': [0],

  },
};

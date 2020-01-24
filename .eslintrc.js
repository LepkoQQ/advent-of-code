module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'no-console': 'off',
    'no-labels': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'no-constant-condition': 'off',
    'no-continue': 'off',
  },
};

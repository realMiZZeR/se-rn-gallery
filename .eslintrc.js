module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['*.jsx'],
      rules: {
        'mobx/missing-observer': 'error',
      },
    },
  ],
};

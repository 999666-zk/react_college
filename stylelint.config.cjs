module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  rules: {
    'color-function-notation': 'legacy',
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen'],
      },
    ],
  },
  overrides: [
    {
      files: '**/*.css',
    },
  ],
  ignoreFiles: ['dist/**/*.css'],
}

// DO NOT USE vh, iOS has significant bug for them ... by Mark.

module.exports = {
  processors: [
    'stylelint-processor-styled-components',
  ],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-styled-components',
  ],
  rules: {
    'unit-whitelist': [
      'em',
      'rem',
      's',
      '%',
      'px',
      'vw',
      'vh',
      'deg',
      'dpi',
      'ms',
    ],
    'media-feature-name-blacklist': [
      'min-width',
    ],
    // https://stylelint.io/user-guide/rules/declaration-property-value-blacklist/
    // if you need background-image, use /* stylelint-disable declaration-property-value-blacklist */
    'declaration-property-value-blacklist': { 'background-image': ['/^url.*\\(/'] },
    'declaration-colon-newline-after': null,
    'no-eol-whitespace': null,
  },
  syntax: 'scss',
};

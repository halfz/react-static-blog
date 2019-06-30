/* eslint-disable */

module.exports = (source) => {
  const developmentOnly = new RegExp('/\\* halfz/development-only \\*/(.|[\r\n])+\\* halfz/development-only-end \\*/', 'gm');
  return source.replace(developmentOnly, '/* dev-fp */');
};

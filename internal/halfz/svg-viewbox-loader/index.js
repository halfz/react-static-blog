/* eslint-disable */

module.exports = (source) => {
  const widthMatch = (/width={([0-9]+)}/g).exec(source);
  if (widthMatch) {
    const width = widthMatch[1];
    const heightMatch = (/height={([0-9]+)}/g).exec(source);
    if (heightMatch) {
      const height = heightMatch[1];
      // export { SvgArrDown as ReactComponent };
      return source.replace('<svg ', '<svg style={{height:`auto`}} viewBox={\'' + '0 0 ' + width + ' ' + height + '\'} ');
    }
  }
  return source;
};

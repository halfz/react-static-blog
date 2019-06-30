/* eslint-disable */
function replaceAll(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}

module.exports = (source) => {
  const colors = new Set();
  const fillReg = (/fill="([^"]+)"/g);
  const strokeReg = (/stroke="([^"]+)"/g);
  let match = fillReg.exec(source);
  while (match != null) {
    const color = match[1];
    colors.add(color);
    match = fillReg.exec(source);
  }
  match = strokeReg.exec(source);
  while (match != null) {
    const color = match[1];
    colors.add(color);
    match = fillReg.exec(source);
  }
  let newSource = source;
  colors.forEach((color) => {
    newSource = replaceAll(newSource, `"${color}"`, `{props.theme && props.theme["${color}"]? props.theme["${color}"] : "${color}"}`);
  });
  return newSource;
};

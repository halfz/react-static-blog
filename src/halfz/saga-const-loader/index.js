/* eslint-disable */
function replaceAll(str, searchStr, replaceStr) {
  return str.split(searchStr).join(replaceStr);
}

const constMap = {};

const valueMap = {};


function collectConst(source) {

  const constReg = (/const[\s]+([A-Za-z0-9_]+)[\s]*=[\s]*'([A-Za-z0-9_]+)';/g);
  let match = constReg.exec(source);
  while (match != null) {
    //TODO uglify const name
    const constName = match[1];
    const value = match[1];
    if (!constMap[constName]) {
      constMap[constName] = value;
      valueMap[value] = true;
    }
    match = constReg.exec(source);
  }
}

// DO NOT USE ARROW FUNCTION, WE NEED THIS!!! by Mark
module.exports = function (source) {

  if (source.startsWith('/* HALFZ SAGA CONST */') || this.resourcePath.toLowerCase().indexOf('saga') >= 0 && this.resourcePath.indexOf('constants.js') >= 0) {

    collectConst(source);
  }

  const sucReg = (/[\s=]SUC\(([^)]+)\)/g);
  const errReg = (/[\s=]ERR\(([^)]+)\)/g);
  const replaceList = [];
  const replaceMap = {};

  let match = sucReg.exec(source);
  while (match != null) {
    const originalText = match[0].substr(1);
    if (!replaceMap[originalText]) {
      const constName = match[1];
      if (constName.startsWith('\'') && constName.endsWith('\'')) {
        replaceList.push([originalText, `\`${constName.substr(1, constName.length - 2)}_SUCCESS\``]);
      } else {
        replaceList.push([originalText, `\`${constMap[constName] || '${' + constName + '}'}_SUCCESS\``]);
      }
      replaceMap[originalText] = `${constName}`;
    }
    match = sucReg.exec(source);
  }


  match = errReg.exec(source);
  while (match != null) {
    const originalText = match[0].substr(1);
    if (!replaceMap[originalText]) {
      const constName = match[1];
      if (constName.startsWith('\'') && constName.endsWith('\'')) {
        replaceList.push([originalText, `\`${constName.substr(1, constName.length - 2)}_ERROR\``]);
      } else {
        replaceList.push([originalText, `\`${constMap[constName] || '${' + constName + '}'}_ERROR\``]);
      }
      replaceMap[originalText] = `${constName}`;
    }
    match = errReg.exec(source);
  }

  let newSource = source;
  replaceList.forEach((each) => {
    newSource = replaceAll(newSource, each[0], each[1]);
  });
  return newSource;
};

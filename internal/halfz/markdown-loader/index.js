/* eslint-disable */
const rawLoader = require('raw-loader');
module.exports = (source) => {


  const regex = /(?:!\[(.*?)\\]\((.*?)\))/gm;

  const matched = source.match(regex);

  console.log(matched);
  return newSource;
};

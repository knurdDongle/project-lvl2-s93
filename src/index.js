import fs from 'fs';

const fileToString = file => fs.readFileSync(file, 'utf8');

const gendiff = (firstConfigFile, secondConfigFile) => {
  const firstString = fileToString(firstConfigFile);
  const secondString = fileToString(secondConfigFile);
  const firstObj = JSON.parse(firstString);
  const secondObj = JSON.parse(secondString);
  const firstKeys = Object.keys(firstObj);
  const secondKeys = Object.keys(secondObj);
  const unitedKeys = firstKeys.concat(secondKeys);
  const uniqKeys = [...new Set(unitedKeys)];
  const arrayDiff = uniqKeys.reduce((acc, key) => {
    if (key in firstObj && key in secondObj) {
      if (firstObj[key] === secondObj[key]) {
        return acc.concat(` ${key}: ${firstObj[key]}`);
      }
      return acc.concat(`+ ${key}: ${secondObj[key]}\n- ${key}: ${firstObj[key]}`);
    }
    if (!(key in secondObj)) {
      return acc.concat(`- ${key}: ${firstObj[key]}`);
    }
    return acc.concat(`+ ${key}: ${secondObj[key]}`);
  }, []);
  return `{\n ${arrayDiff.join('\n')}\n}`;
};

export default gendiff;

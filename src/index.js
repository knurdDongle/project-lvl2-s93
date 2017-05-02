import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParse from './parsers';

const fileToString = file => fs.readFileSync(file, 'utf8');

const getExtension = file => path.extname(file).slice(1);

const gendiff = (firstConfigFile, secondConfigFile) => {
  const firstString = fileToString(firstConfigFile);
  const secondString = fileToString(secondConfigFile);
  const extension = getExtension(firstConfigFile);
  const firstObj = getParse(extension)(firstString);
  const secondObj = getParse(extension)(secondString);
  const firstKeys = Object.keys(firstObj);
  const secondKeys = Object.keys(secondObj);
  const uniqKeys = _.union(firstKeys, secondKeys);

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

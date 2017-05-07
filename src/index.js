import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import getFormat from './formats';
import getDiffer from './differ';

const fileToString = file => fs.readFileSync(file, 'utf8');

const getExtension = file => path.extname(file).slice(1);

const gendiff = (firstConfigFile, secondConfigFile, format = 'string') => {
  const firstString = fileToString(firstConfigFile);
  const secondString = fileToString(secondConfigFile);
  const extension = getExtension(firstConfigFile);
  const firstObj = getParser(extension)(firstString);
  const secondObj = getParser(extension)(secondString);

  const ast = getDiffer(firstObj, secondObj);
  const result = getFormat(format)(ast);
  return result;
};

export default gendiff;

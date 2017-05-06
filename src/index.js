import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParser from './parsers';

const fileToString = file => fs.readFileSync(file, 'utf8');

const getExtension = file => path.extname(file).slice(1);

const getDifferenceObjects = (firstObject, secondObject) => {
  const firstKeys = Object.keys(firstObject);
  const secondKeys = Object.keys(secondObject);
  const uniqKeys = _.union(firstKeys, secondKeys);

  const arrayDiff = uniqKeys.reduce((acc, key) => {
    if (key in firstObject && key in secondObject) {
      if (firstObject[key] instanceof Object || secondObject[key] instanceof Object) {
        const result = { type: 'noChangedChildren',
          body: {
            key,
            value: getDifferenceObjects(firstObject[key], secondObject[key]),
          },
        };
        return [...acc, result];
      }

      if (firstObject[key] === secondObject[key]) {
        const result = { type: 'noChanged',
          body: {
            key,
            value: firstObject[key],
          },
        };
        return [...acc, result];
      }

      const result = {
        type: 'changed',
        body: {
          key,
          newValue: secondObject[key],
          value: firstObject[key],
        },
      };
      return [...acc, result];
    }

    if (!(key in secondObject)) {
      const result = {
        type: 'deleted',
        body: {
          key,
          value: firstObject[key],
        },
      };
      return [...acc, result];
    }
    const result = {
      type: 'add',
      body: {
        key,
        value: secondObject[key],
      },
    };
    return [...acc, result];
  }, []);
  return arrayDiff;
};


const getString = (ast) => {
  const iter = (tree, lvl) => {
    const indent = _.repeat(' ', 4 * lvl);
    const stringify = (elem) => {
      if (elem instanceof Object) {
        const result = JSON.stringify(elem, null, 8 + (4 * lvl)).replace(/["]/g, '');
        return `{${result.slice(1, -1)}    ${indent}}`;
      }
      return elem;
    };

    const result = tree.reduce((acc, obj) => {
      if (obj.type === 'noChanged') {
        return `${acc}\n${indent}    ${obj.body.key}: ${obj.body.value}`;
      }
      if (obj.type === 'changed') {
        return `${acc}\n${indent}  + ${obj.body.key}: ${stringify(obj.body.newValue)}\n${indent}  - ${stringify(obj.body.key)}: ${obj.body.value}`;
      }
      if (obj.type === 'deleted') {
        return `${acc}\n${indent}  - ${obj.body.key}: ${stringify(obj.body.value)}`;
      }
      if (obj.type === 'add') {
        return `${acc}\n${indent}  + ${obj.body.key}: ${stringify(obj.body.value)}`;
      }
      if (obj.type === 'noChangedChildren') {
        return `${acc}\n    ${indent}${obj.body.key}: {${iter(obj.body.value, lvl + 1)}\n    ${indent}}`;
      }
      return acc;
    }, '');
    return result;
  };
  return `{${iter(ast, 0)}\n}`;
};

const gendiff = (firstConfigFile, secondConfigFile) => {
  const firstString = fileToString(firstConfigFile);
  const secondString = fileToString(secondConfigFile);
  const extension = getExtension(firstConfigFile);
  const firstObj = getParser(extension)(firstString);
  const secondObj = getParser(extension)(secondString);

  const ast = getDifferenceObjects(firstObj, secondObj);
  const result = getString(ast);
  return result;
};

export default gendiff;

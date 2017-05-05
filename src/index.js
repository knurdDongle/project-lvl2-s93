import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import getParse from './parsers';

const fileToString = file => fs.readFileSync(file, 'utf8');

const getExtension = file => path.extname(file).slice(1);


const differenceObjects = (firstObject, secondObject) => {
  const firstKeys = Object.keys(firstObject);
  const secondKeys = Object.keys(secondObject);
  const uniqKeys = _.union(firstKeys, secondKeys);

  const arrayDiff = uniqKeys.reduce((acc, key) => {
    if (key in firstObject && key in secondObject) {
      if (firstObject[key] instanceof Object || secondObject[key] instanceof Object) {
        const result = { type: 'noChangedChildren',
          body: {
            key,
            value: differenceObjects(firstObject[key], secondObject[key]),
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
          valueNew: secondObject[key],
          valueOld: firstObject[key],
        },
      };
      return [...acc, result];
    }

    if (!(key in secondObject)) {
      // if (firstObject[key] instanceof Object) {
      //   const result = {
      //     type: 'deletedChildren',
      //     body: {
      //       key,
      //       value: toString(firstObject[key]),
      //     },
      //   };
      //   console.log(firstObject[key]);
      //   return [...acc, result];
      // }
      const result = {
        type: 'deleted',
        body: {
          key,
          value: firstObject[key],
        },
      };
      return [...acc, result];
    }
    // if (secondObject[key] instanceof Object) {
    //   const result = {
    //     type: 'addChildren',
    //     body: {
    //       key,
    //       value: toString(secondObject[key]),
    //     },
    //   };
    //   return [...acc, result];
    // }
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
  // console.log(ast);

  const result = ast.reduce((acc, obj) => {
    // console.log(key.body.value);
    // if (key.body.value.toString() === 'object') {
    //   console.log(`.toString()`);
    //   return '';
    // }
    if (obj.type === 'noChanged') {
      return `${acc}\n  ${obj.body.key}: ${obj.body.value}`;
    }
    if (obj.type === 'changed') {
      return `${acc}\n+ ${obj.body.key}: ${obj.body.valueNew}\n- ${obj.body.key}: ${obj.body.valueOld}`;
    }
    if (obj.type === 'deleted') {
      // if (obj.body.value instanceof Object) {
      //   console.log(obj.body.value);
      //   return `${acc}\n+ ${obj.body.key}:
      //     ${Object.keys(obj.body.value)[0]} ${obj.body.value[0]}`;
      // }
      return `${acc}\n- ${obj.body.key}: ${obj.body.value}`;
    }
    if (obj.type === 'add') {
      return `${acc}\n+ ${obj.body.key}: ${obj.body.value}`;
    }
    if (obj.type === 'noChangedChildren') {
      return `${acc}\n  ${obj.body.key}: ${getString(obj.body.value)}`;
    }
    if (obj.type === 'deletedChildren') {
      return `${acc}\n- ${obj.body.key}: ${getString(obj.body.value)}`;
    }
    if (obj.type === 'addChildren') {
      return `${acc}\n+ ${obj.body.key}: ${getString(obj.body.value)}`;
    }
    return `${acc}`;
  }, '');
  return `{${result}\n}`;
};

const gendiff = (firstConfigFile, secondConfigFile) => {
  const firstString = fileToString(firstConfigFile);
  const secondString = fileToString(secondConfigFile);
  const extension = getExtension(firstConfigFile);
  const firstObj = getParse(extension)(firstString);
  const secondObj = getParse(extension)(secondString);

  const ast = differenceObjects(firstObj, secondObj);
  const result = getString(ast);
  return result;
};

export default gendiff;

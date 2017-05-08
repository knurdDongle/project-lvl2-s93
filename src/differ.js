import _ from 'lodash';

const getDifferenceObjects = (firstObject, secondObject) => {
  const firstKeys = Object.keys(firstObject);
  const secondKeys = Object.keys(secondObject);
  const uniqKeys = _.union(firstKeys, secondKeys);

  const arrayDiff = uniqKeys.reduce((acc, key) => {
    if (key in firstObject && key in secondObject) {
      if (firstObject[key] instanceof Object || secondObject[key] instanceof Object) {
        const result = {
          attribute: 'children',
          key,
          children: getDifferenceObjects(firstObject[key], secondObject[key]),
        };
        return [...acc, result];
      }

      if (firstObject[key] === secondObject[key]) {
        const result = {
          type: 'same',
          key,
          oldValue: firstObject[key],
        };
        return [...acc, result];
      }

      const result = {
        type: 'changed',
        key,
        newValue: secondObject[key],
        oldValue: firstObject[key],
      };
      return [...acc, result];
    }

    if (!(key in secondObject)) {
      const result = {
        type: 'deleted',
        key,
        oldValue: firstObject[key],
      };
      return [...acc, result];
    }
    const result = {
      type: 'added',
      key,
      oldValue: secondObject[key],
    };
    return [...acc, result];
  }, []);
  return arrayDiff;
};

export default getDifferenceObjects;

import _ from 'lodash';

const getDifferenceObjects = (firstObject, secondObject) => {
  const firstKeys = Object.keys(firstObject);
  const secondKeys = Object.keys(secondObject);
  const uniqKeys = _.union(firstKeys, secondKeys);

  const arrayDiff = uniqKeys.reduce((acc, key) => {
    if (key in firstObject && key in secondObject) {
      if (firstObject[key] instanceof Object || secondObject[key] instanceof Object) {
        const result = { type: 'children',
          body: {
            key,
            oldValue: getDifferenceObjects(firstObject[key], secondObject[key]),
          },
        };
        return [...acc, result];
      }

      if (firstObject[key] === secondObject[key]) {
        const result = { type: 'same',
          body: {
            key,
            oldValue: firstObject[key],
          },
        };
        return [...acc, result];
      }

      const result = {
        type: 'changed',
        body: {
          key,
          newValue: secondObject[key],
          oldValue: firstObject[key],
        },
      };
      return [...acc, result];
    }

    if (!(key in secondObject)) {
      const result = {
        type: 'deleted',
        body: {
          key,
          oldValue: firstObject[key],
        },
      };
      return [...acc, result];
    }
    const result = {
      type: 'add',
      body: {
        key,
        oldValue: secondObject[key],
      },
    };
    return [...acc, result];
  }, []);
  return arrayDiff;
};

export default getDifferenceObjects;

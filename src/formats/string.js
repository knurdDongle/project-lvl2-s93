import _ from 'lodash';

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
      if (obj.type === 'same') {
        return `${acc}\n${indent}    ${obj.key}: ${obj.oldValue}`;
      }
      if (obj.type === 'changed') {
        return `${acc}\n${indent}  + ${obj.key}: ${stringify(obj.newValue)}\n${indent}  - ${stringify(obj.key)}: ${stringify(obj.oldValue)}`;
      }
      if (obj.type === 'deleted') {
        return `${acc}\n${indent}  - ${obj.key}: ${stringify(obj.oldValue)}`;
      }
      if (obj.type === 'added') {
        return `${acc}\n${indent}  + ${obj.key}: ${stringify(obj.oldValue)}`;
      }
      if ('children' in obj) {
        return `${acc}\n    ${indent}${obj.key}: {${iter(obj.children, lvl + 1)}\n    ${indent}}`;
      }
      return acc;
    }, '');
    return result;
  };
  return `{${iter(ast, 0)}\n}`;
};

export default getString;

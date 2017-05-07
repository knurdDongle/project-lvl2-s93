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
        return `${acc}\n${indent}    ${obj.body.key}: ${obj.body.oldValue}`;
      }
      if (obj.type === 'changed') {
        return `${acc}\n${indent}  + ${obj.body.key}: ${stringify(obj.body.newValue)}\n${indent}  - ${stringify(obj.body.key)}: ${stringify(obj.body.oldValue)}`;
      }
      if (obj.type === 'deleted') {
        return `${acc}\n${indent}  - ${obj.body.key}: ${stringify(obj.body.oldValue)}`;
      }
      if (obj.type === 'add') {
        return `${acc}\n${indent}  + ${obj.body.key}: ${stringify(obj.body.oldValue)}`;
      }
      if (obj.type === 'children') {
        return `${acc}\n    ${indent}${obj.body.key}: {${iter(obj.body.oldValue, lvl + 1)}\n    ${indent}}`;
      }
      return acc;
    }, '');
    return result;
  };
  return `{${iter(ast, 0)}\n}`;
};

export default getString;

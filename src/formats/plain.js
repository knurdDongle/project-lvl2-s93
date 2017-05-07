const stringify = (elem) => {
  if (elem instanceof Object) {
    const result = JSON.stringify(elem).replace(/["]/g, '');
    return `${result.slice(1, -1)}`;
  }
  return `${elem}`;
};

const checkValue = (obj) => {
  if (obj instanceof Object) {
    return 'complex value';
  }
  return `value: ${stringify(obj)}`;
};

const checkParam = (param) => {
  if (param === '') {
    return '';
  }
  return `${param}.`;
};
const getPlain = (ast, param = '') => {
  const result = ast.map((obj) => {
    if (obj.type === 'changed') {
      return `Property '${checkParam(param)}${obj.body.key}' was updated. From '${stringify(obj.body.oldValue)}' to '${stringify(obj.body.newValue)}'`;
    }
    if (obj.type === 'deleted') {
      return `Property '${checkParam(param)}${obj.body.key}' was removed`;
    }
    if (obj.type === 'add') {
      return `Property '${checkParam(param)}${obj.body.key}' was added with ${checkValue(obj.body.oldValue)}`;
    }
    if (obj.type === 'children') {
      return getPlain(obj.body.oldValue, obj.body.key);
    }
    return '';
  });
  return result.filter(el => el !== '').join('\n');
};


export default getPlain;

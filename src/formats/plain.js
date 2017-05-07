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

const checkParam = (master, slave) => {
  if (master === '') {
    return `${slave}`;
  }
  return `${master}.${slave}`;
};
const getPlain = (ast, param = '') => {
  const result = ast.map((obj) => {
    if (obj.type === 'changed') {
      return `Property '${checkParam(param, obj.key)}' was updated. From '${stringify(obj.oldValue)}' to '${stringify(obj.newValue)}'`;
    }
    if (obj.type === 'deleted') {
      return `Property '${checkParam(param, obj.key)}' was removed`;
    }
    if (obj.type === 'add') {
      return `Property '${checkParam(param, obj.key)}' was added with ${checkValue(obj.oldValue)}`;
    }
    if (obj.type === 'children') {
      return getPlain(obj.children, obj.key);
    }
    return '';
  });
  return result.filter(el => el !== '').join('\n');
};


export default getPlain;

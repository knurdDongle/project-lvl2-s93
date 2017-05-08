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

const makeFullProperty = (master, slave) => {
  if (master === '') {
    return `${slave}`;
  }
  return `${master}.${slave}`;
};

const getPlain = (ast, masterKey = '') => {
  const result = ast.map((obj) => {
    if (obj.type === 'changed') {
      return `Property '${makeFullProperty(masterKey, obj.key)}' was updated. From '${stringify(obj.oldValue)}' to '${stringify(obj.newValue)}'`;
    }
    if (obj.type === 'deleted') {
      return `Property '${makeFullProperty(masterKey, obj.key)}' was removed`;
    }
    if (obj.type === 'added') {
      return `Property '${makeFullProperty(masterKey, obj.key)}' was added with ${checkValue(obj.oldValue)}`;
    }
    if (obj.children.length > 0) {
      return getPlain(obj.children, obj.key);
    }
    return '';
  });
  return result.filter(el => el !== '').join('\n');
};


export default getPlain;


const getJson = (ast) => {
  const result = ast.reduce((acc, obj) => ({
    ...acc,
    [obj.type]: {
      key: obj.key,
      oldValue: obj.oldValue,
      newValue: obj.newValue,
      children: obj.children,
    },
  }), {});

  return JSON.stringify(result, null, 2);
};


export default getJson;

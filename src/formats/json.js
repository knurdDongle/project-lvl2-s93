
const getJson = (ast) => {
  const result = ast.reduce((acc, obj) => {
    acc[obj.type] = {
      key: obj.body.key,
      oldValue: obj.body.oldValue,
      newValue: obj.body.newValue,
      children: obj.body.children,
    };
    return acc;
  }, {});

  return JSON.stringify(result, null, 2);
};


export default getJson;

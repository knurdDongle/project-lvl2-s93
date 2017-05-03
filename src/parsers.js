import ini from 'ini';
import yaml from 'js-yaml';

const parseJson = data => JSON.parse(data);

const parseYaml = data => yaml.safeLoad(data);

const parseIni = data => ini.parse(data);

const parsers = {
  json: parseJson,
  yaml: parseYaml,
  yml: parseYaml,
  ini: parseIni,
};

export default (extension) => {
  const result = parsers[extension] ? parsers[extension] : '';
  return result;
};

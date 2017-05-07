import plainFormat from './plain';
import stringFormat from './string';
import jsonFormat from './json';

const formats = {
  plain: plainFormat,
  string: stringFormat,
  json: jsonFormat,
};

export default (format) => {
  const result = formats[format] ? formats[format] : '';
  return result;
};

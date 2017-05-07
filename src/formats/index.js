import plainFormat from './plain';
import stringFormat from './string';

const formats = {
  plain: plainFormat,
  string: stringFormat,
};

export default (format) => {
  const result = formats[format] ? formats[format] : '';
  return result;
};

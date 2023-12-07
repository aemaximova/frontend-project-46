import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (formatName, diff) => {
  const a = formatName === 'stylish' ? stylish(diff) : plain(diff);
  return a;
};

export default formatter;

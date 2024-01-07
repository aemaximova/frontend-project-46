import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (formatName, diff) => {
  switch (formatName) {
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    default:
      return stylish(diff);
  }
};

export default formatter;

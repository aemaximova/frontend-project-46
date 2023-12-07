import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import path from 'path';

const parse = (data, format) => {
  let result;
  if (format === '.json') {
    result = JSON.parse(data);
  } else if (format === '.yml') {
    result = yaml.load(data);
  }
  return result;
};

const buildCart = (filepath) => {
  const data = readFileSync(filepath, 'utf-8');
  const format = path.extname(filepath);
  return parse(data, format);
};

export default buildCart;

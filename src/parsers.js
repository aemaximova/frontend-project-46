import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import path from 'path';

const parse = (data, format) => {
  if (format === '.json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};

const buildCart = (filepath) => {
  const data = readFileSync(filepath, 'utf-8');
  const format = path.extname(filepath);
  return parse(data, format);
};

export default buildCart;

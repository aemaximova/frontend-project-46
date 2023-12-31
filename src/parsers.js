import yaml from 'js-yaml';

const parse = (data, format) => {
  if (format === 'yml' || format === 'yaml') {
    return yaml.load(data);
  }
  return JSON.parse(data);
};

const buildCart = (data, format) => parse(data, format);

export default buildCart;

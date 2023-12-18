import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return JSON.stringify(value);
  }
  return value;
};

const json = (diff, path = '') => {
  const lines = Object
    .entries(diff)
    .flatMap(([key, value]) => {
      const currentPath = `${path}/${key}`;
      const {
        status, children, newValue, value: singleValue,
      } = value;

      if (children) {
        return json(children, currentPath);
      }
      if (_.has(value, 'value') || _.has(value, 'oldValue')) {
        switch (status) {
          case 'changed':
            return { op: 'replace', path: `${path}/${key}`, value: newValue };
          case 'deleted':
            return { op: 'remove', path: `${path}/${key}` };
          case 'added':
            return { op: 'add', path: `${path}/${key}`, value: JSON.parse(JSON.stringify(singleValue)) };
          default:
            return [];
        }
      }
      return [];
    });
  return JSON.parse(JSON.stringify(lines));
};

export default json;

import _ from 'lodash';

const buildPath = (path, key) => {
  const a = path === '' ? key : `${path}.${key}`;
  return a;
};

const stringify = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const plain = (diff, path = '') => {
  const lines = Object
    .entries(diff)
    .flatMap(([key, value]) => {
      const currentPath = buildPath(path, key);
      const {
        status, children, oldValue, newValue, value: singleValue,
      } = value;
      // const statusStr = (status === 'changed') ? `Property '${buildPath(path, key)}' was updated.
      // From ${stringify(oldValue)} to ${stringify(newValue)}`
      //   : (status === 'deleted') ? `Property '${buildPath(path, key)}' was removed`
      //   : (status === 'added') ? `'${buildPath(path, key)}' was added with value
      // ${stringify(singleValue)}`
      //   : [];
      if (children) {
        return `${plain(children, currentPath)}`;
      }
      if (_.has(value, 'value') || _.has(value, 'oldValue')) {
        switch (status) {
          case 'changed':
            return `Property '${buildPath(path, key)}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
          case 'deleted':
            return `Property '${buildPath(path, key)}' was removed`;
          case 'added':
            return `Property '${buildPath(path, key)}' was added with value: ${stringify(singleValue)}`;
          default:
            return [];
        }
      }
      return [];
    });
  return lines.join('\n');
};

export default plain;

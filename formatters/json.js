import _ from 'lodash';

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
            return { op: 'add', path: `${path}/${key}`, value: singleValue };
          default:
            return [];
        }
      }
      return [];
    });
  return JSON.stringify(lines);
};

export default json;

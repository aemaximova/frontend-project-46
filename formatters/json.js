import _ from 'lodash';

const json = (data, path = '') => {
  const iter = (diff) => {
    const lines = Object
      .entries(diff)
      .flatMap(([key, value]) => {
        const currentPath = `${path}/${key}`;
        const {
          status, children, newValue, value: singleValue,
        } = value;

        if (children) {
          return iter(children, currentPath);
        }
        if (_.has(value, 'value') || _.has(value, 'oldValue')) {
          switch (status) {
            case 'changed':
              return JSON.stringify({ op: 'replace', path: `${path}/${key}`, value: newValue });
            case 'deleted':
              return JSON.stringify({ op: 'remove', path: `${path}/${key}` });
            case 'added':
              return JSON.stringify({ op: 'add', path: `${path}/${key}`, value: singleValue });
            default:
              return [];
          }
        }
        return [];
      });
    return lines.join('');
  };
  return `[${iter(data)}]`;
};

export default json;

import _ from 'lodash';

const stringify = (value, depth) => {
  const spacesCount = 4;
  const replacer = ' ';
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const indentSize = depth * spacesCount;
  const currentIndent = replacer.repeat(indentSize);
  const bracketIndent = replacer.repeat(indentSize - spacesCount);
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${currentIndent}${key}: ${stringify(val, depth + 1)}`);
  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n');
};

const stylish = (data) => {
  const iter = (diff, depth) => {
    const indentSize = 4;
    const leftShift = 2;
    const indent1 = ' '.repeat(indentSize * depth);
    const indent2 = ' '.repeat(indentSize * depth - leftShift);
    const lines = Object
      .entries(diff)
      .flatMap(([key, value]) => {
        const {
          status, children, oldValue, newValue, value: singleValue,
        } = value;

        if (children) {
          return `${indent1}${key}: {\n${iter(children, depth + 1)}${indent1}}\n`;
        }
        switch (status) {
          case 'changed':
            return `${indent2}- ${key}: ${stringify(oldValue, depth + 1)}\n${indent2}+ ${key}: ${stringify(newValue, depth + 1)}\n`;
          case 'deleted':
            return `${indent2}- ${key}: ${stringify(singleValue, depth + 1)}\n`;
          case 'added':
            return `${indent2}+ ${key}: ${stringify(singleValue, depth + 1)}\n`;
          default:
            return `${indent1}${key}: ${stringify(singleValue, depth + 1)}\n`;
        }
      });
    return lines.join('');
  };
  return `{\n${iter(data, 1)}}`;
};

export default stylish;

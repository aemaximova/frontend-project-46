import { readFileSync } from 'node:fs';
import _ from 'lodash';
import path from 'path';
import buildCart from './parsers.js';
import formatter from './formatters/index.js';

const getAbsolutePath = (filepath) => {
  const absPath = path.resolve(process.cwd(), filepath);
  return absPath;
};

// const getObject = (value1, value2) => {
//   if (_.isEqual(value1, value2)) {
//     return { status: 'unchanged', value: value1 };
//   }
//   if (!_.has(file1, key)) {
//     return { status: 'added', value: value2 };
//   }
//   if (!_.has(file2, key)) {
//     return { status: 'deleted', value: value1 };
//   }
//   if (_.isObject(value1) && _.isObject(value2)) {
//     return { status: 'unchanged', children: getDiff(value1, value2) };
//   }
//   return { status: 'changed', oldValue: value1, newValue: value2 };
// };

const getDiff = (file1, file2) => {
  const mergedKeys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  const result = mergedKeys.reduce((acc, key) => {
    const value1 = file1[key];
    const value2 = file2[key];
    if (_.isEqual(value1, value2)) {
      acc[key] = { status: 'unchanged', value: value1 };
    }
    if (!_.has(file1, key)) {
      acc[key] = { status: 'added', value: value2 };
    }
    if (!_.has(file2, key)) {
      acc[key] = { status: 'deleted', value: value1 };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      acc[key] = { status: 'unchanged', children: getDiff(value1, value2) };
    } else {
      acc[key] = { status: 'changed', oldValue: value1, newValue: value2 };
    }
    return acc;
  }, {});
  return result;
};

const genDiff = (filepath1, filepath2, formatName) => {
  const absolutePath1 = getAbsolutePath(filepath1);
  const absolutePath2 = getAbsolutePath(filepath2);

  const fileContents1 = readFileSync(absolutePath1, 'utf-8');
  const fileContents2 = readFileSync(absolutePath2, 'utf-8');

  const format1 = absolutePath1.split('.').pop();
  const format2 = absolutePath2.split('.').pop();

  const data1 = buildCart(fileContents1, format1);
  const data2 = buildCart(fileContents2, format2);
  const diff = getDiff(data1, data2);
  const outputString = formatter(formatName, diff);
  return outputString;
};

export default genDiff;

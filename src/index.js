import _ from 'lodash';
import path from 'path';
import buildCart from './parsers.js';
import formatter from '../formatters/index.js';

const getAbsolutePath = (filepath) => {
  const absPath = filepath[0] !== '/' ? path.resolve(process.cwd(), filepath) : filepath;
  return absPath;
};

const getDiff = (file1, file2) => {
  const mergedKeys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  const result = mergedKeys.reduce((acc, key) => {
    const value1 = file1[key];
    const value2 = file2[key];
    const newAcc = _.cloneDeep(acc);
    if (_.isEqual(value1, value2)) {
      newAcc[key] = { status: 'unchanged', value: value1 };
    } else if (!_.has(file1, key)) {
      newAcc[key] = { status: 'added', value: value2 };
    } else if (!_.has(file2, key)) {
      newAcc[key] = { status: 'deleted', value: value1 };
    } else if (_.isObject(value1) && _.isObject(value2)) {
      newAcc[key] = { status: 'unchanged', children: getDiff(value1, value2) };
    } else {
      newAcc[key] = { status: 'changed', oldValue: value1, newValue: value2 };
    }
    return newAcc;
  }, {});
  return result;
};

const genDiff = (filepath1, filepath2, formatName) => {
  const absolutePath1 = getAbsolutePath(filepath1);
  const absolutePath2 = getAbsolutePath(filepath2);

  const data1 = buildCart(absolutePath1);
  const data2 = buildCart(absolutePath2);
  const diff = getDiff(data1, data2);
  const outputString = formatter(formatName, diff);
  return outputString;
};

export default genDiff;

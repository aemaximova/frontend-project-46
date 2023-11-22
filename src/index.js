import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import path from 'path';
import _ from 'lodash';

const jsonParse = (pathToFile) => {
  const data = readFileSync(pathToFile, 'utf8');
  const jsonData = JSON.parse(data);
  return jsonData;
};

const yamlParse = (pathToFile) => {
  const data = readFileSync(pathToFile, 'utf8');
  const yamlData = yaml.safeLoad(data);
  return yamlData;
};

const getOutput = (file1, file2) => {
  const combinedKeys = { ...file1, ...file2 };
  const uniqueKeys = _.sortBy(Object.keys(combinedKeys));
  const result = uniqueKeys.reduce((acc, key) => {
    let newAcc = acc;
    if (file1.hasOwnProperty(key)) {
      if (file2.hasOwnProperty(key)) {
        if (file1[key] === file2[key]) {
          newAcc += `${' '.repeat(4)}${key}: ${file1[key]}\n`;
        } else {
          newAcc += `  - ${key}: ${file1[key]}\n`;
          newAcc += `  + ${key}: ${file2[key]}\n`;
        }
      } else {
        newAcc += `  - ${key}: ${file1[key]}\n`;
      }
    } else {
      newAcc += `  + ${key}: ${file2[key]}\n`;
    }
    return newAcc;
  }, '');
  return `{\n${result}}`;
};

const parse = (firstFile, secondFile) => {
  const fileExtension1 = path.extname(firstFile);
  const fileExtension2 = path.extname(secondFile);
  let data1;
  let data2;
  if (fileExtension1 === '.json') {
    data1 = jsonParse(firstFile);
  } else if (fileExtension1 === '.yml') {
    data1 = yamlParse(firstFile);
  }
  if (fileExtension2 === '.json') {
    data2 = jsonParse(secondFile);
  } else if (fileExtension2 === '.yml') {
    data2 = yamlParse(secondFile);
  }
  const result = getOutput(data1, data2);
  return result;
};

const genDiff = (filepath1, filepath2) => {
  let absolutePath1 = filepath1;
  let absolutePath2 = filepath2;
  if (filepath1[0] !== '/') {
    absolutePath1 = path.resolve(process.cwd(), filepath1);
  }
  if (filepath2[0] !== '/') {
    absolutePath2 = path.resolve(process.cwd(), filepath2);
  }
  const result = parse(absolutePath1, absolutePath2);
  return result;
};

export default genDiff;

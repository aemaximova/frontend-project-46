import { readFileSync } from 'node:fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const filePath1 = getFixturePath('file1.json');
const filePath2 = getFixturePath('file2.json');
const filePath3 = getFixturePath('file1.yml');
const filePath4 = getFixturePath('file2.yml');
const giffPath1 = getFixturePath('diff_stylish.txt');
const giffPath2 = getFixturePath('diff_plain.txt');
const giffPath3 = getFixturePath('diff_json.txt');

test('testStylish', () => {
  const result = readFileSync(giffPath1, 'utf8');
  expect(genDiff(filePath1, filePath4, 'stylish')).toEqual(result);
});

test('testPlain', () => {
  const result = readFileSync(giffPath2, 'utf8');
  expect(genDiff(filePath3, filePath2, 'plain')).toEqual(result);
});

test('testJson', () => {
  const result = readFileSync(giffPath3, 'utf8');
  expect(genDiff(filePath3, filePath4, 'json')).toStrictEqual(result);
});

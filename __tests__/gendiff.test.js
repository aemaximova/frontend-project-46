import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

test('test1', () => {
  const filePath1 = './__fixtures__/file1.json';
  const filePath2 = './__fixtures__/file2.json';
  const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(genDiff(filePath1, filePath2)).toBe(result);
});

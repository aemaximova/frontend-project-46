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

test('testStylish', () => {
  const result = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;
  expect(genDiff(filePath1, filePath4, 'stylish')).toBe(result);
});

test('testPlain', () => {
  const result = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
  expect(genDiff(filePath3, filePath2, 'plain')).toBe(result);
});

test('testJson', () => {
  const result = [
    { op: 'add', path: '/common/follow', value: false },
    { op: 'remove', path: '/common/setting2' },
    { op: 'replace', path: '/common/setting3', value: null },
    { op: 'add', path: '/common/setting4', value: 'blah blah' },
    { op: 'add', path: '/common/setting5', value: { key5: 'value5' } },
    { op: 'replace', path: '/common/setting6/doge/wow', value: 'so much' },
    { op: 'add', path: '/common/setting6/ops', value: 'vops' },
    { op: 'replace', path: '/group1/baz', value: 'bars' },
    { op: 'replace', path: '/group1/nest', value: 'str' },
    { op: 'remove', path: '/group2' },
    { op: 'add', path: '/group3', value: { deep: { id: { number: 45 } }, fee: 100500 } },
  ];
  expect(genDiff(filePath3, filePath4, 'json')).toStrictEqual(result);
});

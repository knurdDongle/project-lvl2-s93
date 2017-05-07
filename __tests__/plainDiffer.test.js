import gendiff from '../src';

const beforeJson = './__tests__/__fixtures__/json/before.json';
const afterJson = './__tests__/__fixtures__/json/after.json';

const beforeYaml = './__tests__/__fixtures__/yaml/before.yml';
const afterYaml = './__tests__/__fixtures__/yaml/after.yml';

const beforeIni = './__tests__/__fixtures__/ini/before.ini';
const afterIni = './__tests__/__fixtures__/ini/after.ini';

const nestedBeforeJson = './__tests__/__fixtures__/json/nested/before.json';
const nestedAfterJson = './__tests__/__fixtures__/json/nested/after.json';

const nestedBeforeIni = './__tests__/__fixtures__/ini/nested/before.ini';
const nestedAfterIni = './__tests__/__fixtures__/ini/nested/after.ini';

const nestedBeforeYaml = './__tests__/__fixtures__/yaml/nested/before.yml';
const nestedAfterYaml = './__tests__/__fixtures__/yaml/nested/after.yml';

const equal = `Property 'timeout' was updated. From '50' to '20'
Property 'proxy' was removed
Property 'verbose' was added with value: true`;

const nestedEqual = `Property 'common.setting2' was removed
Property 'common.setting6' was removed
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with complex value
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
Property 'group3' was added with complex value`;


test('test JSON', () => {
  expect(gendiff(beforeJson, afterJson, 'plain')).toBe(equal);
});

test('test YAML', () => {
  expect(gendiff(beforeYaml, afterYaml, 'plain')).toBe(equal);
});

test('test INI', () => {
  expect(gendiff(beforeIni, afterIni, 'plain')).toBe(equal);
});

test('test nestedJSON', () => {
  expect(gendiff(nestedBeforeJson, nestedAfterJson, 'plain')).toBe(nestedEqual);
});

test('test nestedINI', () => {
  expect(gendiff(nestedBeforeIni, nestedAfterIni, 'plain')).toBe(nestedEqual);
});

test('test nestedYAML', () => {
  expect(gendiff(nestedBeforeYaml, nestedAfterYaml, 'plain')).toBe(nestedEqual);
});

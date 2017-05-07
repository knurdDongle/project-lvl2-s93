import gendiff from '../src';

const beforeJson = './__tests__/__fixtures__/json/before.json';
const afterJson = './__tests__/__fixtures__/json/after.json';

const beforeYaml = './__tests__/__fixtures__/yaml/before.yml';
const afterYaml = './__tests__/__fixtures__/yaml/after.yml';

// const beforeIni = './__tests__/__fixtures__/ini/before.ini';
// const afterIni = './__tests__/__fixtures__/ini/after.ini';

// const nestedBeforeJson = './__tests__/__fixtures__/json/nested/before.json';
// const nestedAfterJson = './__tests__/__fixtures__/json/nested/after.json';

// const nestedBeforeIni = './__tests__/__fixtures__/ini/nested/before.ini';
// const nestedAfterIni = './__tests__/__fixtures__/ini/nested/after.ini';
//
// const nestedBeforeYaml = './__tests__/__fixtures__/yaml/nested/before.yml';
// const nestedAfterYaml = './__tests__/__fixtures__/yaml/nested/after.yml';

const equal = `{
  "same": {
    "key": "host",
    "oldValue": "hexlet.io"
  },
  "changed": {
    "key": "timeout",
    "oldValue": 50,
    "newValue": 20
  },
  "deleted": {
    "key": "proxy",
    "oldValue": "123.234.53.22"
  },
  "add": {
    "key": "verbose",
    "oldValue": true
  }
}`;


test('test JSON', () => {
  expect(gendiff(beforeJson, afterJson, 'json')).toBe(equal);
});

test('test YAML', () => {
  expect(gendiff(beforeYaml, afterYaml, 'json')).toBe(equal);
});

// test('test INI', () => {
//   expect(gendiff(beforeIni, afterIni, 'json')).toBe(equal);
// });

// test('test nestedJSON', () => {
//   expect(gendiff(nestedBeforeJson, nestedAfterJson, 'json')).toBe(nestedEqual);
// });
//
// test('test nestedINI', () => {
//   expect(gendiff(nestedBeforeIni, nestedAfterIni, 'plain')).toBe(nestedEqual);
// });
//
// test('test nestedYAML', () => {
//   expect(gendiff(nestedBeforeYaml, nestedAfterYaml, 'plain')).toBe(nestedEqual);
// });

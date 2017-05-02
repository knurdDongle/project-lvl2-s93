import gendiff from '../src';

const beforeJson = './__tests__/__fixtures__/json/before.json';
const afterJson = './__tests__/__fixtures__/json/after.json';

const beforeYaml = './__tests__/__fixtures__/yaml/before.yml';
const afterYaml = './__tests__/__fixtures__/yaml/after.yml';

const equal = `{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
+ verbose: true
}`;

test('test JSON', () => {
  expect(gendiff(beforeJson, afterJson)).toBe(equal);
});

test('test YAML', () => {
  expect(gendiff(beforeYaml, afterYaml)).toBe(equal);
});

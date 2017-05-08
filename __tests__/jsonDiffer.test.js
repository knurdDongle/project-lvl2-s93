import gendiff from '../src';

const beforeJson = './__tests__/__fixtures__/json/before.json';
const afterJson = './__tests__/__fixtures__/json/after.json';

const beforeYaml = './__tests__/__fixtures__/yaml/before.yml';
const afterYaml = './__tests__/__fixtures__/yaml/after.yml';

const beforeIni = './__tests__/__fixtures__/ini/before.ini';
const afterIni = './__tests__/__fixtures__/ini/after.ini';

// const nestedBeforeJson = './__tests__/__fixtures__/json/nested/before.json';
// const nestedAfterJson = './__tests__/__fixtures__/json/nested/after.json';
//
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
  "added": {
    "key": "verbose",
    "oldValue": true
  }
}`;

// const nestedEqual = `{
//   "common": {
//     "type": "children",
//     "children": {
//       "setting1": {
//         "type": "same",
//         "oldValue": "Value 1",
//         "children": []
//       },
//       "setting2": {
//         "type": "deleted",
//         "oldValue": "200",
//         "children": []
//       },
//       "setting3": {
//         "type": "same",
//         "oldValue": true,
//         "children": []
//       },
//       "setting6": {
//         "type": "deleted",
//         "oldValue": {
//           "key": "value"
//         },
//         "children": []
//       },
//       "setting4": {
//         "type": "add",
//         "oldValue": "blah blah",
//         "children": []
//       },
//       "setting5": {
//         "type": "add",
//         "oldValue": {
//           "key5": "value5"
//         },
//         "children": []
//       }
//     }
//   },
//   "group1": {
//     "type": "children",
//     "children": {
//       "baz": {
//         "type": "changed",
//         "oldValue": "bas",
//         "newValue": "bars",
//         "children": []
//       },
//       "foo": {
//         "type": "same",
//         "oldValue": "bar",
//         "children": []
//       }
//     }
//   },
//   "group2": {
//     "type": "deleted",
//     "oldValue": {
//       "abc": "12345"
//     },
//     "children": []
//   },
//   "group3": {
//     "type": "add",
//     "oldValue": {
//       "fee": "100500"
//     },
//     "children": []
//   }
// }`;

test('test JSON', () => {
  expect(gendiff(beforeJson, afterJson, 'json')).toBe(equal);
});

test('test YAML', () => {
  expect(gendiff(beforeYaml, afterYaml, 'json')).toBe(equal);
});

test('test INI', () => {
  expect(gendiff(beforeIni, afterIni, 'json')).toBe(equal);
});

// test('01 test nestedJSON', () => {
//   expect(gendiff(nestedBeforeJson, nestedAfterJson, 'json')).toBe(nestedEqual);
// });
//
// test('test nestedINI', () => {
//   expect(gendiff(nestedBeforeIni, nestedAfterIni, 'json')).toBe(nestedEqual);
// });
//
// test('test nestedYAML', () => {
//   expect(gendiff(nestedBeforeYaml, nestedAfterYaml, 'json')).toBe(nestedEqual);
// });

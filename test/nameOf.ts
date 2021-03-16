import { nameOf, NameOfPath, nameOfFabric } from '../src/nameOf';

type TestType = {
  testObject: {
    testObjectDeep: {
      testStringInTestObject: string;
      testArrayDeep: { testNumberInArray: number }[];
    };
    testArrayInObject: { testNumberInArray: number }[];
  };
};

// [value, result, deep, index]
type Scenario = [
  NameOfPath<TestType>,
  string,
  number | undefined,
  Record<string, number> | undefined
];

const TEST_INDEX = 456;

const SCENARIOS: Scenario[] = [
  [
    (o) => o.testObject.testObjectDeep.testStringInTestObject,
    'testObject.testObjectDeep.testStringInTestObject',
    undefined,
    undefined,
  ],
  [
    (o) => o.testObject.testObjectDeep.testStringInTestObject,
    'testObjectDeep.testStringInTestObject',
    1,
    undefined,
  ],
  [
    (o) => o.testObject.testObjectDeep.testArrayDeep[0],
    'testObject.testObjectDeep.testArrayDeep[0]',
    undefined,
    undefined,
  ],
  [
    (o) =>
      o.testObject.testObjectDeep.testArrayDeep[TEST_INDEX].testNumberInArray,
    `testObject.testObjectDeep.testArrayDeep[${TEST_INDEX}].testNumberInArray`,
    undefined,
    { TEST_INDEX },
  ],
  [
    (o) =>
      o.testObject.testObjectDeep.testArrayDeep[TEST_INDEX].testNumberInArray,
    `testArrayDeep[${TEST_INDEX}].testNumberInArray`,
    2,
    { TEST_INDEX },
  ],
];

describe('nameOf', () => {
  test.each(SCENARIOS)(
    'Test name of with %s expected result %s, deep: %s, index: %s',
    (value, result, deep, index) => {
      expect(nameOf(value, deep, index)).toBe(result);
    }
  );
});

describe('nameOfFabric', () => {
  test.each(SCENARIOS)(
    'Test name of with %s expected result %s, deep: %s, index: %s',
    (value, result, deep, index) => {
      const names = nameOfFabric<TestType>();

      expect(names(value, deep, index)).toBe(result);
    }
  );
});

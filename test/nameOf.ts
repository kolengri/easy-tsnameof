import { nameOf, NameOfPath, nameOfFabric } from '../src/nameOf';
import { UnexpectedPathArgument } from '../src/errors';

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

type UnexpectedScenario = [any, Error];

const TEST_INDEX = 456;

const SCENARIOS: Scenario[] = [
  ['testObject', 'testObject', undefined, undefined],
  ['testObject', 'testObject', 1, undefined],
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

const UNEXPECTED_SCENARIOS: UnexpectedScenario[] = [
  [{}, new UnexpectedPathArgument(typeof {})],
  [1000, new UnexpectedPathArgument(typeof 1000)],
];

/**
 * nameOf
 */

describe('nameOf', () => {
  test.each(SCENARIOS)(
    'Test name of with %s expected result %s, deep: %s, index: %s',
    (value, result, deep, index) => {
      expect(nameOf(value, deep, index)).toBe(result);
    }
  );
});

describe('nameOf with unexpected arguments', () => {
  test.each(UNEXPECTED_SCENARIOS)(
    'Test name of with unexpected %s expected result is Error',
    (value, result) => {
      expect(() => nameOf(value)).toThrow(result);
    }
  );
});

/**
 * nameOfFabric
 */

describe('nameOfFabric', () => {
  test.each(SCENARIOS)(
    'Test name of with %s expected result %s, deep: %s, index: %s',
    (value, result, deep, index) => {
      const names = nameOfFabric<TestType>();
      expect(names(value, deep, index)).toBe(result);
    }
  );
});

describe('nameOfFabric with unexpected arguments', () => {
  test.each(UNEXPECTED_SCENARIOS)(
    'Test name of with unexpected %s expected result is Error',
    (value, result) => {
      const names = nameOfFabric<TestType>();
      expect(() => names(value)).toThrow(result);
    }
  );
});

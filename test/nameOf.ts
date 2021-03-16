import { nameOf, NameOfPath, nameOfFabric } from '../src/nameOf';

type TestType = {
  testObject: {
    testObjectDeep: {
      testStringInTestObject: string;
      testArrayDeep: { testNumberInArray: number }[];
    };
    testArrayInObject: {
      testNumberInArray: number;
      testArrayInArray: { testNumberInArray: number }[];
    }[];
  };
};

type ToReplaceScenarioArg = Record<string, number> | undefined;
type DeepScenarioArg = number | undefined;

// [value, result, deep, index]
type Scenario = [
  NameOfPath<TestType>,
  string,
  ToReplaceScenarioArg | DeepScenarioArg,
  ToReplaceScenarioArg
];

type UnexpectedScenario = [any, Error];

const TEST_INDEX = 456;
const TEST_INDEX2 = 600;

const BASE_SCENARIOS: Scenario[] = [
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
      o.testObject.testArrayInObject[0].testArrayInArray[0].testNumberInArray,
    'testObject.testArrayInObject[0].testArrayInArray[0].testNumberInArray',
    undefined,
    undefined,
  ],
  /**
   * With index replace cases
   */
  [
    (o) =>
      o.testObject.testObjectDeep.testArrayDeep[TEST_INDEX].testNumberInArray,
    `testObject.testObjectDeep.testArrayDeep[${TEST_INDEX}].testNumberInArray`,
    0,
    { TEST_INDEX },
  ],
  [
    (o) =>
      o.testObject.testObjectDeep.testArrayDeep[TEST_INDEX].testNumberInArray,
    `testObject.testObjectDeep.testArrayDeep[${TEST_INDEX}].testNumberInArray`,
    { TEST_INDEX },
    undefined,
  ],
  [
    (o) =>
      o.testObject.testObjectDeep.testArrayDeep[TEST_INDEX].testNumberInArray,
    `testArrayDeep[${TEST_INDEX}].testNumberInArray`,
    2,
    { TEST_INDEX },
  ],

  [
    (o) =>
      o.testObject.testArrayInObject[TEST_INDEX].testArrayInArray[TEST_INDEX2]
        .testNumberInArray,
    `testObject.testArrayInObject[${TEST_INDEX}].testArrayInArray[${TEST_INDEX2}].testNumberInArray`,
    {
      TEST_INDEX,
      TEST_INDEX2,
    },
    undefined,
  ],
  [
    (o) =>
      o.testObject.testArrayInObject[TEST_INDEX].testArrayInArray[TEST_INDEX2]
        .testNumberInArray,
    `testArrayInObject[${TEST_INDEX}].testArrayInArray[${TEST_INDEX2}].testNumberInArray`,
    1,
    {
      TEST_INDEX,
      TEST_INDEX2,
    },
  ],
];

const UNEXPECTED_SCENARIOS: UnexpectedScenario[] = [
  [{}, new Error('Please pass string or function instead of object')],
  [1000, new Error('Please pass string or function instead of number')],
];

/**
 * nameOf
 */

describe('nameOf', () => {
  test.each(BASE_SCENARIOS)(
    'Test name of with %s expected result %s, deep: %s, index: %s',
    (value, result, deep, index) => {
      if (typeof deep === 'number') {
        expect(nameOf(value, deep, index)).toBe(result);
      } else {
        expect(nameOf(value, deep)).toBe(result);
      }
    }
  );

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
  test.each(BASE_SCENARIOS)(
    'Test name of with %s expected result %s, deep: %s, index: %s',
    (value, result, deep, index) => {
      const names = nameOfFabric<TestType>();
      if (typeof deep === 'number') {
        expect(names(value, deep, index)).toBe(result);
      } else {
        expect(names(value, deep)).toBe(result);
      }
    }
  );

  test.each(UNEXPECTED_SCENARIOS)(
    'Test name of with unexpected %s expected result is Error',
    (value, result) => {
      const names = nameOfFabric<TestType>();
      expect(() => names(value)).toThrow(result);
    }
  );
});

import { nameOf, NameOfPath, nameOfFabric } from '../src/nameOf';

type TestType = {
  testObject: {
    testPartial?: {
      testString: string;
    };
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

type UnexpectedScenario = [any, Error];

type PathScenario = [NameOfPath<TestType>, string];

const PATH_SCENARIOS: PathScenario[] = [
  [
    ['testObject', 'testArrayInObject', 0, 'testNumberInArray'],
    'testObject.testArrayInObject[0].testNumberInArray',
  ],
  [
    ['testObject', 'testObjectDeep', 'testStringInTestObject'],
    'testObject.testObjectDeep.testStringInTestObject',
  ],
  [
    ['testObject', 'testPartial', 'testString'],
    'testObject.testPartial.testString',
  ],
  [['testObject'], 'testObject'],
  ['testObject', 'testObject'],
];

const UNEXPECTED_SCENARIOS: UnexpectedScenario[] = [
  [
    [{}, {}, {}, {}],
    new Error('Please pass string or number instead of object for argument 1'),
  ],
  [
    [[]],
    new Error('Please pass string or number instead of object for argument 1'),
  ],
  [
    [{}],
    new Error('Please pass string or number instead of object for argument 1'),
  ],
  [
    ['wew', {}],
    new Error('Please pass string or number instead of object for argument 2'),
  ],
  [
    [0, 'dwedwe', []],
    new Error('Please pass string or number instead of object for argument 3'),
  ],
];

/**
 * nameOf
 */

describe('nameOf', () => {
  test.each(UNEXPECTED_SCENARIOS)(
    'Test name of with unexpected %s expected result is Error',
    (args, result) => {
      expect(() => nameOf<TestType>(args)).toThrow(result);
    }
  );
  test.each(PATH_SCENARIOS)(
    'Test name of with array path %s expected result %s',
    (args, result) => {
      expect(nameOf<TestType>(args)).toBe(result);
    }
  );
});

/**
 * nameOfFabric
 */

describe('nameOfFabric', () => {
  test.each(UNEXPECTED_SCENARIOS)(
    'Test name of with unexpected %s expected result is Error',
    (args, result) => {
      const names = nameOfFabric<TestType>();
      expect(() => names(args)).toThrow(result);
    }
  );
  test.each(PATH_SCENARIOS)(
    'Test name of with array path %s expected result %s',

    (args, result) => {
      const names = nameOfFabric<TestType>();
      expect(names(args)).toBe(result);
    }
  );
});

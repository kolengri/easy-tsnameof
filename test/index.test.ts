import { nameOf } from '../src';

export const sym = Symbol('SomeSymbol');

export type TestType = {
  a: {
    testFunc: () => { result: string };
    b: {
      arrayOfArrays: string[][];
      c: number;
      f: { test: string; blah: { path?: string }; arr: string[] }[];
    };
    [sym]: {
      g: string;
    };
  };
};

interface OptionalThing {
  foo: string;
  bar?: string;
}

const testCases = {
  'regular field path': {
    path: nameOf<TestType, never>().a.b.c,
    expectedResults: {
      $path: 'a.b.c',
      $rawPath: ['a', 'b', 'c'],
    },
  },
  'path with index': {
    path: nameOf<TestType, never>().a.b.f[3],
    expectedResults: {
      $path: 'a.b.f[3]',
      $rawPath: ['a', 'b', 'f', 3],
    },
  },
  'path with index of index for array of array': {
    path: nameOf<TestType, never>().a.b.arrayOfArrays[3][3],
    expectedResults: {
      $path: 'a.b.arrayOfArrays[3][3]',
      $rawPath: ['a', 'b', 'arrayOfArrays', 3, 3],
    },
  },
  'path with function': {
    path: nameOf<TestType, never>().a.testFunc,
    expectedResults: {
      $path: 'a.testFunc',
      $rawPath: ['a', 'testFunc'],
    },
  },
  'path with optional field': {
    path: nameOf<OptionalThing, never>().bar,
    expectedResults: {
      $path: 'bar',
      $rawPath: ['bar'],
    },
  },
  'path with symbol': {
    path: nameOf<TestType, never>().a[sym].g,
    expectedResults: {
      $path: 'a.Symbol(SomeSymbol).g',
      $rawPath: ['a', sym, 'g'],
    },
  },
  /**
   * Arguments
   */
  'regular field path with argument path': {
    path: nameOf<TestType>((o) => o.a.b.c),
    expectedResults: {
      $path: 'a.b.c',
    },
  },
  'regular field path with key rgument path': {
    path: nameOf<TestType>('a'),
    expectedResults: {
      $path: 'a',
    },
  },
  'path with index with argument path': {
    path: nameOf<TestType>((o) => o.a.b.f[3]),
    expectedResults: {
      $path: 'a.b.f[3]',
    },
  },
  'path with index of index for array of array with argument path': {
    path: nameOf<TestType>((o) => o.a.b.arrayOfArrays[3][3]),
    expectedResults: {
      $path: 'a.b.arrayOfArrays[3][3]',
    },
  },
  'path with function with argument path': {
    path: nameOf<TestType>((o) => o.a.testFunc),
    expectedResults: {
      $path: 'a.testFunc',
    },
  },
  'path with optional field with argument path': {
    path: nameOf<OptionalThing>((o) => o.bar),
    expectedResults: {
      $path: 'bar',
    },
  },
  'path with symbol with argument path': {
    path: nameOf<TestType>((o) => o.a[sym].g),
    expectedResults: {
      $path: 'a.Symbol(SomeSymbol).g',
    },
  },
};

describe('Typed path', () => {
  for (const [testCaseName, { path, expectedResults }] of Object.entries(
    testCases
  )) {
    describe(`for ${testCaseName}`, () => {
      if ('$path' in expectedResults) {
        it(`should have correct $path special field value`, () => {
          if (typeof path === 'string') {
            expect(path).toEqual(expectedResults.$path);
          } else {
            expect(path.$path).toEqual(expectedResults.$path);
          }
        });

        it(`should have correct .toString() special field value`, () => {
          expect(path.toString()).toEqual(expectedResults.$path);
        });

        it(`should have correct .valueOf() special field value`, () => {
          expect(path.valueOf()).toEqual(expectedResults.$path);
        });
      }

      if ('$rawPath' in expectedResults) {
        it(`should have correct $rawPath special field value`, () => {
          if (typeof path === 'string') {
            expect(path).toEqual(expectedResults.$path);
          } else {
            expect(path.$rawPath).toEqual(expectedResults.$rawPath);
          }
        });
      }
    });
  }

  it('should get path with a string tag', () => {
    expect(
      Object.prototype.toString.call(
        nameOf<TestType, never>().a.b.f[3].blah.path
      )
    ).toEqual('[object a.b.f[3].blah.path]');
  });
});

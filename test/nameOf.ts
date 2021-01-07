import { nameOf } from '../src/nameOf';

type TestObject1 = {
  test1: {
    test2: {
      test: string;
    };
    test3: { test4: number }[];
  };
};

describe('TS NameOf', () => {
  it('Test nameOf Base', async () => {
    const name = nameOf<TestObject1>((o) => o.test1.test2.test);

    expect(name).toEqual('test1.test2.test');
  });
  it('Test nameOf Base with cut', async () => {
    const name = nameOf<TestObject1>((o) => o.test1.test2.test, 1);

    expect(name).toEqual('test2.test');
  });

  it('Test nameOf replace', async () => {
    const index = 999;
    const name = nameOf<TestObject1, { index: number }>(
      (o) => o.test1.test3[index].test4,
      0,
      { index }
    );

    expect(name).toEqual('test1.test3[999].test4');
  });
});

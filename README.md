# Easy Typescript NameOf

## How to use?

```ts
import nameOf from 'easy-tsnameof';

type NameOfTest = {
  test1: {
    test2: {
      test3: string;
    };
  };
};
const resultString = nameOf<NameOfTest>((o) => o.test1.test2.test3);
// test1.test2.test3
```

```ts
import { nameOfFabric } from 'easy-tsnameof';

type NameOfTest = {
  test1: {
    test2: {
      test3: string;
    };
  };
};
const f = nameOfFabric<NameOfTest>();
const resultString = f((o) => o.test1.test2.test3);
// test1.test2.test3
```

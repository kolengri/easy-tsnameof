# Easy Typescript NameOf

<p>
  <a href="https://www.npmjs.com/package/easy-tsnameof">
    <img height="20px" src="https://badgen.net/npm/license/easy-tsnameof" />
  </a>
  <a href="https://www.npmjs.com/package/easy-tsnameof">
    <img height="20px" src="https://badgen.net/npm/v/easy-tsnameof" />
  </a>
  <a href="https://www.npmjs.com/package/easy-tsnameof">
    <img height="20px" src="https://badgen.net/npm/dependents/easy-tsnameof" />
  </a>
  <a href="https://www.npmjs.com/package/easy-tsnameof">
    <img height="20px" src="https://badgen.net/npm/types/easy-tsnameof" />
  </a>
  <a href="https://github.com/kolengri/easy-tsnameof#readme">
    <img height="20px" src="https://badgen.net/github/issues/kolengri/easy-tsnameof" />
  </a>
  <a href="https://bundlephobia.com/result?p=easy-tsnameof">
    <img height="20px" src="https://badgen.net/bundlephobia/min/easy-tsnameof" />
  </a>
  <a href="https://bundlephobia.com/result?p=easy-tsnameof">
    <img height="20px" src="https://badgen.net/bundlephobia/minzip/easy-tsnameof" />
  </a>
</p>

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

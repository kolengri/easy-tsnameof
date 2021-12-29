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

## Install

```bash
yarn add easy-tsnameof
```

```bash
npm install easy-tsnameof
```

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
nameOf<NameOfTest>((o) => o.test1.test2.test3);
// test1.test2.test3

nameOf<NameOfTest>('test1');
// test1

nameOf<NameOfTest>().test1.test2.test3.$path;
// test1.test2.test3
```

## Fabrics

```ts
import { nameOf } from 'easy-tsnameof';

type NameOfTest = {
  test1: {
    test2: {
      test3: string;
    };
  };
};
const f = nameOf<NameOfTest, never>();
f.test1.test2.test3.$path;
// test1.test2.test3
```

## Working with arrays

```ts
import { nameOf } from 'easy-tsnameof';

type NameOfTest = {
  test1: {
    test2: {
      test: string;
    };
    test3: { test4: number }[];
  };
};
const f = nameOf<NameOfTest, never>();
const index = 999;

f.test1.test3[index].test4.$path;
// test1.test3[999].test4
```

## Path access methods

### .$path

Access to path string:

```ts
nameOf<TestType, never>().a.b.c.d.$path;
// "a.b.c.d"
```

[@m-abboud](https://github.com/m-abboud)

### .$rawPath

Access to raw path array

Type: `(string | number | Symbol)[]`

```ts
nameOf<TestType, never>().a.b[5].c.d.$rawPath;
// ["a", "b", 5, "c", "d"]
```

The `$rawPath` is something that you might want to use with the following methods from
Ramda, to add type safety on the path:

- [R.assocPath](https://ramdajs.com/docs/#assocPath),
- [R.dissocPath](https://ramdajs.com/docs/#dissocPath),
- [R.hasPath](https://ramdajs.com/docs/#hasPath),
- [R.path](https://ramdajs.com/docs/#path),
- [R.pathEq](https://ramdajs.com/docs/#pathEq),
- [R.pathOr](https://ramdajs.com/docs/#pathOr),
- [R.paths](https://ramdajs.com/docs/#paths),
- [R.lensPath](https://ramdajs.com/docs/#lensPath)

## Inspired by

- [typed-path](https://github.com/bsalex/typed-path)

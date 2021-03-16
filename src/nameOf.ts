import { DeepRequired } from 'ts-essentials';

export type NameOfPathFunc<T> = (obj: DeepRequired<T> | never) => unknown;
export type NameOfPath<T> = NameOfPathFunc<T> | keyof T;

export type ReplaceObject = {
  [key: string]: number | string;
};

export type NameOf = {
  <PathObject, Replace extends ReplaceObject = ReplaceObject>(
    f: NameOfPath<PathObject>,
    deep?: number,
    replace?: Replace
  ): string;

  <PathObject, Replace extends ReplaceObject = ReplaceObject>(
    f: NameOfPath<PathObject>,
    replace?: Replace
  ): string;
};

export type NameOfFabric = {
  <PathObject, Replace extends ReplaceObject = ReplaceObject>(): {
    (f: NameOfPath<PathObject>, deep?: number, replace?: Replace): string;
    (f: NameOfPath<PathObject>, replace?: Replace): string;
  };
};

export const nameOf: NameOf = (f: NameOfPath<any>, ...otherArgs: any[]) => {
  if (typeof f !== 'string' && typeof f !== 'function') {
    throw new Error(`Please pass string or function instead of ${typeof f}`);
  }

  if (typeof f === 'string') {
    return f;
  }

  const arr = f
    .toString()
    .replace(/;| |}|\s/g, '')
    .split('.');

  const [possibleDeepArg] = otherArgs;
  const deep = typeof possibleDeepArg === 'number' ? possibleDeepArg : 0;

  const replace: ReplaceObject | undefined = otherArgs.find(
    (t) => typeof t === 'object'
  );

  const result = arr.splice(deep + 1).join('.');

  // Replace part of the string with passed object
  if (replace) {
    return Object.entries(replace).reduce(
      (res, [key, val]) => res.replace(key, String(val)),
      result
    );
  }

  return result;
};

export const nameOfFabric: NameOfFabric = () => (
  f: NameOfPath<any>,
  ...args: any[]
) => nameOf(f, ...args);

export default nameOf;

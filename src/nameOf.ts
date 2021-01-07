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

export const nameOf: NameOf = (f: NameOfPath<any>, ...otherArgs: any[]) => {
  if (typeof f === 'string') {
    return f;
  }

  const arr = f
    .toString()
    .replace(';', '')
    .replace('}', '')
    .replace(/ /g, '')
    .replace(/\s/g, '')
    .split('.');

  let deep = 0;
  let replace: ReplaceObject | undefined = undefined;

  if (typeof otherArgs[0] === 'number') {
    deep = otherArgs[0];
  }

  if (typeof otherArgs[0] === 'object') {
    replace = otherArgs[0];
  } else if (typeof otherArgs[1] === 'object') {
    replace = otherArgs[1];
  }

  let result = arr.splice(deep + 1).join('.');

  if (replace) {
    result = Object.entries(replace).reduce((res, cur) => {
      const [key, val] = cur;
      return res.replace(key, String(val));
    }, result);
  }

  return result;
};

export type NameOfFabric = {
  <PathObject, Replace extends ReplaceObject = ReplaceObject>(): {
    (f: NameOfPath<PathObject>, deep?: number, replace?: Replace): string;
    (f: NameOfPath<PathObject>, replace?: Replace): string;
  };
};

export const nameOfFabric: NameOfFabric = () => (
  f: NameOfPath<any>,
  ...args: any[]
) => nameOf(f, ...args);

export default nameOf;

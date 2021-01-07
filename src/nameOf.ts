import { DeepRequired } from 'ts-essentials';

export type NameOfPathFunc<T> = (obj: DeepRequired<T> | never) => unknown;
export type NameOfPath<T> = NameOfPathFunc<T> | keyof T;

export type NameOf<T> = (f: NameOfPath<T>, deep: number) => string;

export const nameOf = <T, Replace extends object = any>(
  f: NameOfPath<T>,
  deep = 0,
  replace?: Replace
): string => {
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
  let result = arr.splice(deep + 1).join('.');

  if (replace) {
    result = Object.entries(replace).reduce((res, cur) => {
      const [key, val] = cur;
      return res.replace(key, val);
    }, result);
  }

  return result;
};

export const nameOfFabric = <T>() => (f: NameOfPath<T>, deep = 0) =>
  nameOf<T>(f, deep);

export default nameOf;

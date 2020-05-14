import { DeepRequired } from 'ts-essentials';

export type NameOfPathFunc<T> = (obj: DeepRequired<T> | never) => unknown;
export type NameOfPath<T> = NameOfPathFunc<T> | keyof T;

export type NameOf<T> = (f: NameOfPath<T>, deep: number) => string;

export const nameOf = <T>(f: NameOfPathFunc<T> | keyof T, deep = 0): string => {
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
  const result = arr.splice(deep + 1).join('.');
  return result;
};

export const nameOfFabric = <T>() => (
  f: NameOfPathFunc<T> | keyof T,
  deep = 0
) => nameOf<T>(f, deep);

export default nameOf;

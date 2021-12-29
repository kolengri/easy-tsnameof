import { Builtin, DeepRequired, Primitive } from 'ts-essentials';

export type PathKey = string | symbol | number;

export type DeepAddType<T, Add> = T extends Error
  ? Add
  : T extends Builtin
  ? Add
  : T extends Primitive
  ? Add
  : T extends {}
  ? { [K in keyof T]: DeepAddType<T[K], Add> & Add } & Add
  : Add;

export type HandlersConfig = typeof handlersConfig;

export type PathFn<ResultType> =
  | ((...args: any[]) => ResultType)
  | keyof ResultType;

export type PathHandlersConfig = Record<string, (path: PathKey[]) => any>;

export type PathHandlers<ConfigType extends PathHandlersConfig> = {
  [key in keyof ConfigType]: ReturnType<ConfigType[key]>;
};

export type PathArgumentFn<O> = ((o: DeepRequired<O>) => unknown) | keyof O;

export type TypedPathWrapper<OriginalType> = DeepAddType<
  DeepRequired<OriginalType>,
  PathHandlers<HandlersConfig>
>;

const appendStringPathChunk = (path: string, chunk: PathKey): string => {
  if (typeof chunk === 'number') {
    return `${path}[${chunk}]`;
  } else {
    return appendStringSymbolChunkToPath(path, chunk);
  }
};

const appendStringSymbolChunkToPath = (
  path: string,
  chunk: string | symbol
) => {
  return path + (path === '' ? chunk.toString() : `.${chunk.toString()}`);
};

const pathToString = (path: PathKey[]): string => {
  return path.reduce<string>((current, next) => {
    return appendStringPathChunk(current, next);
  }, '');
};

const handlersConfig = {
  $path: (path: PathKey[]) => pathToString(path),
  $rawPath: (path: PathKey[]) => path,
  toString: (path: PathKey[]) => () => pathToString(path),
  [Symbol.toStringTag]: (path: PathKey[]) => pathToString(path),
  valueOf: (path: PathKey[]) => () => pathToString(path),
};

const convertNumericKeyToNumber = (key: PathKey): PathKey => {
  if (typeof key === 'string') {
    const keyAsNumber = +key;
    if (keyAsNumber === keyAsNumber) {
      return keyAsNumber;
    }
  }

  return key;
};

const getHandlerByNameKey = (name: PathKey) => {
  if (handlersConfig[name as keyof typeof handlersConfig]) {
    return handlersConfig[name as keyof typeof handlersConfig];
  }
};

const emptyObject = {};

export const nameOf = <
  OriginalObject,
  PathFN extends PathArgumentFn<OriginalObject> = PathArgumentFn<OriginalObject>
>(
  pathFn?: PathFN,
  path: PathKey[] = []
): [PathFN] extends [never] ? TypedPathWrapper<OriginalObject> : string => {
  if (typeof pathFn === 'string') {
    return pathFn as any;
  }

  const proxy = <TypedPathWrapper<OriginalObject>>new Proxy(emptyObject, {
    get(_target: unknown, name: PathKey) {
      const handler = getHandlerByNameKey(name);

      return handler
        ? handler(path)
        : nameOf(undefined, [...path, convertNumericKeyToNumber(name)]);
    },
  });

  if (typeof pathFn === 'function') {
    return (pathFn(proxy as any) as any).$path;
  }

  return proxy as any;
};

export default nameOf;

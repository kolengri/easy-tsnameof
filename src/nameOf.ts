import Tool from 'ts-toolbelt';

export type NameOfPath<T> = Tool.Object.Paths<T>;

export type NameOf = {
  <PathObject>(...args: NameOfPath<PathObject>): string;
};

export type NameOfFabric = {
  <PathObject>(): {
    (...args: NameOfPath<PathObject>): string;
  };
};

export const nameOf: NameOf = (...args): string => {
  if (args.length === 0) {
    return '';
  }

  if (typeof args[0] === 'string' && args.length === 1) {
    return args[0];
  }

  const failed = args.findIndex(
    (arg) => typeof arg === 'object' || Array.isArray(arg)
  );

  if (failed !== -1) {
    throw new Error(
      `Please pass string or number instead of ${typeof args[
        failed
      ]} for argument ${failed + 1}`
    );
  }

  const result = args.reduce((acc: string, arg) => {
    if (typeof arg === 'number') {
      return `${acc}[${arg}]`;
    }

    if (acc.length === 0) {
      return arg.toString();
    }

    return [acc, arg.toString()].join('.');
  }, '');

  return result.toString();
};

export const nameOfFabric: NameOfFabric = (): NameOf => nameOf;

export default nameOf;

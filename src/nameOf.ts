import Tool from 'ts-toolbelt';
import { DeepRequired } from 'ts-essentials';

export type NameOfPath<T = any> = Tool.Object.Paths<DeepRequired<T>> | keyof T;

export type NameOf = {
  <PathObject>(args: NameOfPath<PathObject>): string;
};

export type NameOfFabric = {
  <PathObject>(): {
    (args: NameOfPath<PathObject>): string;
  };
};

const throwErr = (arg: any, argument: number) => {
  throw new Error(
    `Please pass string or number instead of ${typeof arg} for argument ${argument}`
  );
};

export const nameOf: NameOf = (args): string => {
  if (typeof args === 'string') {
    return args;
  }

  if (typeof args === 'number') {
    return `[${args}]`;
  }

  if (Array.isArray(args)) {
    if (typeof args[0] === 'string' && args.length === 1) {
      return args[0];
    }
    if (typeof args === 'number') {
      return `[${args}]`;
    }

    const failed = args.findIndex(
      (arg) => typeof arg !== 'number' && typeof arg !== 'string'
    );

    if (failed !== -1) {
      throw throwErr(args[failed], failed + 1);
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
  }

  throw throwErr(args, 1);
};

export const nameOfFabric: NameOfFabric = (): NameOf => nameOf;

export default nameOf;

export class UnexpectedPathArgument extends Error {
  constructor(type: string) {
    super(`Please pass string or function instead of ${type}`);
  }
}

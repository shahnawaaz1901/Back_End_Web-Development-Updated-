export default class ApplicationError extends Error {
  constructor(errDescription, errStatusCode) {
    super(errDescription);
    this.errStatusCode = errStatusCode;
  }
}

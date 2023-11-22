export default class ApplicationError extends Error {
  constructor(errorDescription, errorStatusCode) {
    super(errorDescription);
    this.statusCode = errorStatusCode;
  }
}

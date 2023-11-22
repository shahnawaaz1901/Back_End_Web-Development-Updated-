export default class ApplicationError extends Error {
  constructor(errorMassage, errorStatusCode) {
    super(errorMassage);
    this.errorStatusCode = errorStatusCode;
  }
}

import ExtendableError from 'es6-error';

class BaseException extends ExtendableError {
  constructor(message, details = '') {
    super(message);
    this.details = details;
  }
  static fromError(error) {
    return new BaseException(error.message, error.stack);
  }
  toString() {
    return this.message + "(" + this.details + ")";
  }
}

export class APIException extends BaseException {
  constructor(status, message, details = '') {
    super(message, details);
    this.status = status;
  }
  static fromResponse(response) {
    return new APIException(response.data.status, response.data.message, response.data.details);
  }
}

export class AbortException extends BaseException {
  constructor(error) {
    error = BaseException.fromError(error);
    super(error.message, error.details);
  }
}

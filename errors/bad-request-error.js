const { Status } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Status.ERROR;
  }
}

module.exports = BadRequestError;

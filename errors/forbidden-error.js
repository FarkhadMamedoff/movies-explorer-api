const { Status } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Status.FORBIDDEN;
  }
}

module.exports = ForbiddenError;

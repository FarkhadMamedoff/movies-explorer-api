const { Status } = require('../utils/constants');

class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Status.UNAUTHORIZED;
  }
}

module.exports = UnAuthorizedError;

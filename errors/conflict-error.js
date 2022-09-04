const { Status } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Status.CONFLICT;
  }
}

module.exports = ConflictError;

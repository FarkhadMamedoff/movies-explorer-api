const { Status } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = Status.NOTFOUND;
  }
}

module.exports = NotFoundError;

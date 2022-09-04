const { Status, Message } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = Status.INTERNALERROR, message } = err;
  res.status(statusCode).send({
    message: statusCode === Status.INTERNALERROR ? Message.INTERNAL_SERVER_ERROR : message,
  });
  next();
};

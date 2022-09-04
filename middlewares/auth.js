const jwt = require('jsonwebtoken');
const UnAuthorizedError = require('../errors/unauth-error');
const { Message } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;
const { DEV_SECRET_KEY } = require('../utils/config');

const handleAuthError = (next) => next(new UnAuthorizedError(Message.AUTH_ERROR));

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(next);
  }

  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET_KEY);
  } catch (err) {
    return handleAuthError(next);
  }

  req.user = payload;

  return next();
};

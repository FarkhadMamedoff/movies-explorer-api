require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limitter = require('./middlewares/limitter');
const errorHandler = require('./middlewares/error');
const router = require('./routes/index');
const { allowedCors, DEV_PORT, DEV_DATABASE_ADDRESS } = require('./utils/config');

const { NODE_ENV, PROD_PORT, PROD_DATABASE_ADDRESS } = process.env;

const PORT = NODE_ENV === 'production' ? PROD_PORT : DEV_PORT;
const app = express();

mongoose.connect(NODE_ENV === 'production' ? PROD_DATABASE_ADDRESS : DEV_DATABASE_ADDRESS, {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);
app.use(limitter);

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
});

app.use(router);
app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

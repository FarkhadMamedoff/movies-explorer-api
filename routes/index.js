const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { createUserValidator, signinValidator } = require('../middlewares/validation');
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-error');
const { Message } = require('../utils/constants');

router.post('/signin', signinValidator, login);
router.post('/signup', createUserValidator, createUser);

router.use(auth);
router.use('/users', users);
router.use('/movies', movies);

router.use('*', (req, res, next) => {
  next(new NotFoundError(Message.PAGE_NOT_FOUND));
});

module.exports = router;

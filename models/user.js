const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const UnAuthorizedError = require('../errors/unauth-error');
const { Message } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: Message.BAD_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUser(email, password, next) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnAuthorizedError(Message.BAD_EMAIL_OR_PASSWORD);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnAuthorizedError(Message.BAD_EMAIL_OR_PASSWORD);
          }
          return user;
        });
    })
    .catch(next);
};

module.exports = mongoose.model('user', userSchema);

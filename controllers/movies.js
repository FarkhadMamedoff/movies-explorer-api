const Movie = require('../models/movie');
const { Status, Message } = require('../utils/constants');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(Status.OK).send(movies))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((data) => {
      if (!data) {
        throw new NotFoundError(Message.MOVIE_NOT_FOUND);
      } else if (!data.owner.equals(req.user._id)) {
        throw new ForbiddenError(Message.MOVIE_ACCESS_DENIED);
      } else {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((movie) => {
            res.status(Status.OK).send(movie);
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(Message.BAD_INPUT_DATA));
      } else {
        next(err);
      }
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(Status.CREATED).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(Message.BAD_INPUT_DATA));
      } else {
        next(err);
      }
    });
};

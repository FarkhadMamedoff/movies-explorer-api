const router = require('express').Router();
const { getMovies, deleteMovie, createMovie } = require('../controllers/movies');
const { createMovieValidator, deleteMovieValidator } = require('../middlewares/validation');

router.get('/', getMovies);
router.delete('/:movieId', deleteMovieValidator, deleteMovie);
router.post('/', createMovieValidator, createMovie);

module.exports = router;

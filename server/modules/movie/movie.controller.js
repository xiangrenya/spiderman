const MovieService = require('./movie.service');

exports.save = (req, res, next) => {
  MovieService.save(req.body)
    .then(() => {
      res.send({
        result: true
      });
    })
    .catch(err => next(err));
};
exports.list = (req, res, next) => {
  let { page, perPage } = req.query;
  MovieService.list(page, perPage)
    .then(result => {
      res.send({
        result: true,
        ...result
      });
    })
    .catch(err => next(err));
};

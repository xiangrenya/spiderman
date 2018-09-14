const Movie = require('./movie.model');

exports.save = (req, res, next) => {
  const movie = new Movie(req.body);
  movie
    .save()
    .then(() => {
      res.send({
        result: true
      });
    })
    .catch(err => next(err));
};
exports.list = (req, res, next) => {
  let { page = 1, perPage = 20 } = req.query;
  page = Number(page);
  perPage = Number(perPage);
  const skip = (page - 1) * perPage;
  let counter = 0, movies = [], total = 0;
  Movie.find()
    .sort('-create_date')
    .skip(skip)
    .limit(perPage)
    .select('title description href source')
    .exec((err, datas) => {
      if (err) return next(err);
      movies = datas;
      counter++;
      success(counter, res);
    });
  Movie.count().exec((err, data) => {
    if (err) return next(err);
    counter++
    total = data;
    success(counter, res);
  });
  function success(counter, res){
    if(counter === 2){
      res.send({
        movies,
        total
      })
    }
  }
}



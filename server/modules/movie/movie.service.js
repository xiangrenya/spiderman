const MovieModel = require('./movie.model');

exports.save = doc => {
  const movie = new MovieModel(doc);
  return new Promise((resolve, reject) => {
    movie
      .save()
      .then(() => resolve())
      .catch(err => reject(err));
  });
};

exports.list = (page = 1, perPage = 20) => {
  if (typeof page === 'string') {
    page = parseInt(page);
  }
  if (typeof perPage === 'string') {
    perPage = parseInt(perPage);
  }

  const moviesPromise = new Promise((resolve, reject) => {
    MovieModel.find()
      .sort('-create_date')
      .skip((page - 1) * perPage)
      .limit(perPage)
      .select('title description href source')
      .exec((err, data) => {
        if (err) reject(err);
        resolve(data);
      });
  });

  const countPromise = new Promise((resolve, reject) => {
    MovieModel.count().exec((err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

  return Promise.all([moviesPromise, countPromise]).then(result => {
    const [movies, count] = result;
    return {
      data: movies,
      page: {
        pageNum: page,
        total: count
      }
    };
  });
};

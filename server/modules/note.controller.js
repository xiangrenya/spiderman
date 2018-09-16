const Note = require('./note.model');

exports.save = (req, res, next) => {
  const note = new Note(req.body);
  note
    .save()
    .then(() => {
      res.send({
        result: true,
      });
    })
    .catch(err => next(err));
};
exports.list = (req, res, next) => {
  let { page = 1, perPage = 20 } = req.query;
  page = Number(page);
  perPage = Number(perPage);
  const skip = (page - 1) * perPage;
  let counter = 0;
  let notes = [];
  let total = 0;
  Note.find()
    .sort('-create_date')
    .skip(skip)
    .limit(perPage)
    .select('title description href source')
    .exec((err, datas) => {
      if (err) return next(err);
      notes = datas;
      counter++;
      return success();
    });
  Note.count().exec((err, data) => {
    if (err) return next(err);
    counter++;
    total = data;
    return success();
  });
  function success() {
    if (counter === 2) {
      res.send({
        notes,
        total,
      });
    }
  }
};

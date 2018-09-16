const cheerio = require('cheerio');
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
exports.list = async (req, res, next) => {
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
    .select('_id author title content like_count comment_count')
    .exec((err, datas) => {
      if (err) return next(err);
      notes = Array.from(datas).map((data) => {
        const $ = cheerio.load(data.content);
        const summary = $.text().replace(/[\s|\n]/g, '').substr(0, 200);
        const src = $('body').find('img').first().attr('data-original-src');
        const image = src ? `https:${src.substring(1)}` : '';
        const {
          _id, author, title, like_count, comment_count,
        } = data;
        const ret = {
          _id,
          author,
          title,
          like_count,
          comment_count,
          summary,
          image,
        };
        return ret;
      });
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
        datas: notes,
        total,
      });
    }
  }
};

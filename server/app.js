const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const router = require('./router');
// connect to mongodb
mongoose.connect(config.mongodb.uri);
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongodb.uri}`);
});

const app = express();

// enable CORS - Cross Origin Resource Sharing
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('server is running ...');
});
app.use('/api', router);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).end();
});

// error handler
app.use((err, req, res) => {
  const { status = 500 } = err;
  res.status(status).send(err);
});

app.listen(3000, () => {
  console.log('server started at port: 3000');
});

module.exports = app;

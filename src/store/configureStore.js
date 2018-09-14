const dev = require('./configureStore.dev');
const prod = require('./configureStore.prod');

if (process.env.NODE_ENV === 'production') {
  module.exports = dev;
} else {
  module.exports = prod;
}

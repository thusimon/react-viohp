/**
 * Created by Lu on 8/12/2018.
 */
if (process.env.NODE_ENV === 'production'){
  module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev');
}

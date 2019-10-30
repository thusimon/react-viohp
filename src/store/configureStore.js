/**
 * Created by Lu on 8/12/2018.
 */
let store;
if (process.env.NODE_ENV === 'production'){
  store = require('./configureStore.prod');
} else {
  store = require('./configureStore.dev');
}
module.exports = store;

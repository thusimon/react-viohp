const mongoose = require('mongoose');
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vio-helper';

// prepare the data
const {createGuestAndScores} = require('../scripts/setup-db-data');

module.exports = {
  connectToDb: (reInitDB) => {
    return mongoose.connect(CONNECTION_URI)
    .then(async () => {
      console.log(`Connected to mongoDB to ${CONNECTION_URI}`);
      if (reInitDB) {
        await createGuestAndScores();
        console.log('prerequiste data is created');
      }
      return Promise.resolve();
    });
  }
}

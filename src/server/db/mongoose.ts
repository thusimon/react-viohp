import mongoose from 'mongoose';
// prepare the data
import { createGuestAndScores } from '../scripts/setup-db-data';

const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/vio-helper';

export default {
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
};

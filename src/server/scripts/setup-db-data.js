const User = require('../models/user');

// create a Guest user and its scores
const createGuestAndScores = async () => {
  let guest = await User.collection.findOne({ email: 'Guest' });
  let guestId;
  if (!guest) {
    guest = await User.collection.insertOne({email: 'Guest'});
    guestId = guest.insertedId;
  } else {
    guestId = guest._id;
  }
}

module.exports = {
  createGuestAndScores
};
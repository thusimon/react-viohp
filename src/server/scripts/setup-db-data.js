const User = require('../models/user');
const Score = require('../models/score');
const GuestScores = require('./guest-scores');

// create a Guest user and its scores
const createGuestAndScores = async () => {
  let guest = await User.collection.findOne({ email: 'Guest' });
  let guestId;
  if (!guest) {
    guest = await User.collection.insertOne({ email: 'Guest' });
    guestId = guest.insertedId;
  } else {
    guestId = guest._id;
  }
  // delete all the score whose id is guest
  await Score.deleteMany({owner: guestId});
  // insert all the guest scores
  const scoresTask = [];
  for(let sc in GuestScores) {
    let score = new Score(GuestScores[sc]);
    score.owner = guestId;
    scoresTask.push(score.save());
  };
  await Promise.all(scoresTask);
}

module.exports = {
  createGuestAndScores
};
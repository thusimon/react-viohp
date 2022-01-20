import User from '../models/user';
import Score from '../models/score';
import GuestScores from './guest-scores';

// create a Guest user and its scores
export const createGuestAndScores = async () => {
  const guest = await User.collection.findOne({ email: 'Guest' });
  let guestId;
  if (!guest) {
    const newGuest = await User.collection.insertOne({ email: 'Guest' });
    guestId = newGuest.insertedId;
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

const express = require('express');
const router = new express.Router();
const {guestAuth} = require('./middleware/auth');
const Score = require('../models/score');
const User = require('../models/user');
var mongoose = require('mongoose');

const getGuestScores = async () => {
  // get guest user
  const guest = await User.findOne({email: 'Guest'});
  console.log(guest);
  const scores = Score.find({owner: mongoose.Types.ObjectId(guest._id)});
  console.log(13, scores);
  return scores;
}
router.get('/api/score/me', guestAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const scores = await Score.find({owner: mongoose.Types.ObjectId(userId)}).sort({order: 1})
    return res.status(200).send({scores});
  } catch (err) {
    return res.status(400).send({err: err.message});
  }
});

module.exports = router;
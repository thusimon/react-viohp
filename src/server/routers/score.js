const express = require('express');
const router = new express.Router();
const {userAuth} = require('./middleware/auth');
const Score = require('../models/score');
const User = require('../models/user');
var mongoose = require('mongoose');

router.get('/api/score/me', userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const scores = await Score.find({owner: mongoose.Types.ObjectId(userId)}).sort({order: 1});
    return res.status(200).send({scores});
  } catch (err) {
    return res.status(400).send({err: err.message});
  }
});
router.post('/api/score/me', userAuth, async (req, res) => {
  try {
    const score = new Score(req.body);
    score.owner = mongoose.Types.ObjectId(req.user._id);
    const result = await score.save();
    return res.status(200).send(result);
  } catch (err) {
    return res.status(400).send({err: err.message});
  }
});
router.get('/api/score/public', async (req, res) => {
  try{
    const guest = await User.collection.findOne({email: 'Guest'});
    if (!guest) {
      return res.status(404).send({err: 'no public user'});
    }
    const guestId = guest._id;
    const scores = await Score.find({owner: mongoose.Types.ObjectId(guestId)}).sort({order: 1});
    return res.status(200).send({scores});
  } catch (err) {
    return res.status(400).send({err: err.message});
  }
});

module.exports = router;
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
    const userId = req.user._id;
    const score = new Score({
      ...req.body,
      owner:  mongoose.Types.ObjectId(userId)
    });
    await score.save();
    return res.status(201).send(score);
  } catch (err) {
    return res.status(500).send({err: err.message});
  }
});

router.patch('/api/score/me', userAuth, async (req, res) => {
  const scoreId = req.params.id;
  const userId = req.user._id;
  try {
    if (!scoreId) {
      return res.status(400).send({err: 'no id, can not update'});
    }
    const allowedUpdateFields = ['title', 'author', 'signature', 'scale', 'notes'];
    const isValidUpdate = Object.keys(req.body).every(key => allowedUpdateFields.includes(key));
    if (!isValidUpdate) {
      return res.status(400).send({err: 'invalid field to update'});
    }
    let score = await Score.findOne({_id: scoreId, owner: mongoose.Types.ObjectId(userId)});
    if (!score) {
      return res.status(404).send({err: 'no such score found'});
    }
    score = Object.assign(score, req.body);
    await score.save();
    return res.status(200).send(score);
  } catch (err) {
    return res.status(500).send({err: err.message});
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
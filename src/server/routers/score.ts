import express, {Router, Request} from 'express';
import { userAuth } from './middleware/auth';
import Score from '../models/score';
import Audio from '../models/audio';
import AudioAnalyse from '../models/audio-analyse';
import User from '../models/user';
import mongoose from 'mongoose';
import { IUserRequest } from './types';

const router = Router();

router.get('/api/scores/me', userAuth, async (req: IUserRequest, res) => {
  try {
    const userId = req.user._id;
    const scores = await Score.find({owner: new mongoose.Types.ObjectId(userId)}).sort({order: 1});
    return res.status(200).send({scores});
  } catch (err) {
    return res.status(400).send({err: err.message});
  }
});

router.get('/api/score/:id', userAuth, async (req: IUserRequest, res) => {
  const userId = req.user._id;
  const id = req.params.id;
  if (id) {
    const score = await Score.findById(id);
    // check score owner should user userId or Guest
    return res.status(200).send({score});
  }
  return res.status(400).send({err: 'no score id specified'});
});

router.post('/api/score/me', userAuth, async (req: IUserRequest, res) => {
  try {
    const userId = req.user._id;
    const score = new Score({
      ...req.body,
      owner:  new mongoose.Types.ObjectId(userId)
    });
    await score.save();
    return res.status(201).send(score);
  } catch (err) {
    return res.status(500).send({err: err.message});
  }
});

router.patch('/api/score/me', userAuth, async (req: IUserRequest, res) => {
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
    let score = await Score.findOne({_id: scoreId, owner: new mongoose.Types.ObjectId(userId)});
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

router.get('/api/scores/public', async (req, res) => {
  try{
    const guest = await User.collection.findOne({email: 'Guest'});
    if (!guest) {
      return res.status(404).send({err: 'no public user'});
    }
    const guestId = guest._id;
    const scores = await Score.find({owner: new mongoose.Types.ObjectId(guestId)}).sort({order: 1});
    return res.status(200).send({scores});
  } catch (err) {
    return res.status(400).send({err: err.message});
  }
});

export default router;

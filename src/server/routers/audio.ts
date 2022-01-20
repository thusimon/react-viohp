import express, {Router, Request} from 'express';
import { userAuth } from './middleware/auth';
import Score from '../models/score';
import Audio from '../models/audio';
import AudioAnalyse from '../models/audio-analyse';
import User from '../models/user';
import mongoose from 'mongoose';
import { IUserRequest } from './types';

const router = Router();

router.get('/api/audio/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const audio = await Audio.findOne({_id: id});
    const audioData = audio.bin;
    return res.status(200).send(audioData);
  } catch (err) {
    return res.status(400).send({err: err.message});
  }
});

router.get('/api/audios', async(req, res) => {
  try {
    const audios = await Audio.find({}, {bin: 0});
    return res.status(200).send({audios});
  } catch (err) {
    return res.status(400).send({err: err.message});
  }
});

router.get('/api/audioanalyses', userAuth, async(req: IUserRequest, res) => {
  try {
    const userId = req.user._id;
    const audioAnalyses = await AudioAnalyse.find({userId: new mongoose.Types.ObjectId(userId)}, {analyzeFrames: 0}).sort({updateAt: 1});
    return res.status(200).send({audioAnalyses});
  } catch (err) {
    return res.status(400).send({err: err.message});
  }
});

router.get('/api/audioanalyse/:id', userAuth, async(req, res) => {
  try {
    const id = req.params.id;
    const audioAnalyse = await AudioAnalyse.findOne({_id: id});
    return res.status(200).send({audioAnalyse});
  } catch (err) {
    return res.status(400).send({err: err.message});
  }
});

router.post('/api/audioanalyse', userAuth, async(req: IUserRequest, res) => {
  try {
    const userId = req.user._id;
    const audioAnalyse = new AudioAnalyse({
      ...req.body,
      userId
    });
    const result = await audioAnalyse.save();
    return res.status(200).send({result});
  } catch (err) {
    return res.status(400).send({err: err.message});
  }
});

router.post('/api/audio', userAuth, async (req, res) => {
  req.on('data', (chunk) => {
    console.log('req on data', chunk);
  });
  req.on('end', () => {
    console.log('upload end');
    res.status(201).send({res: 'success'});
  });
});

export default router;

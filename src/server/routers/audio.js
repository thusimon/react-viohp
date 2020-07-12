const express = require('express');
const router = new express.Router();
const {userAuth} = require('./middleware/auth');
const Score = require('../models/score');
const Audio = require('../models/audio');
const AudioAnalyse = require('../models/audio-analyse');
const User = require('../models/user');
var mongoose = require('mongoose');

router.get('/api/audio', async (req, res) => {
  try {
    const id = req.params.id;
    const audio = await Audio.findOne({_id: id});
    const audioData = audio.bin;
    return res.status(200).send(audioData);
  } catch (err) {
    return res.status(400).send({err: err.message});
  }
});

router.get('/api/audio', async(req, res) => {
  try {
    const audios = await Audio.find({}, {bin: 0});
    return res.status(200).send({audios});
  } catch (err) {
    return res.status(400).send({err: err.message});
  }
});

router.get('/api/audioanalyses', userAuth, async(req, res) => {
  try {
    const userId = req.user._id;
    const audioAnalyses = await AudioAnalyse.find({userId: mongoose.Types.ObjectId(userId)}, {analyzeFrames: 0}).sort({updateAt: 1});
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

router.post('/api/audioanalyse', userAuth, async(req, res) => {
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
  console.log('I got request');
  req.on('data', (chunk) => {
    console.log('req on data', chunk);
  });
  req.on('end', () => {
    console.log('upload end');
    res.status(201).send({res: 'success'});
  });
});


module.exports = router;
const express = require('express');
const router = new express.Router();
const {userAuth} = require('./middleware/auth');
const Score = require('../models/score');
const Audio = require('../models/audio');
const User = require('../models/user');
var mongoose = require('mongoose');

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

router.get('/api/audio', async(req, res) => {
  try {
    const audios = await Audio.find({}, {bin: 0});
    return res.status(200).send({audios});
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
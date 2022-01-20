import express, {Router, Request} from 'express';
import { userAuth } from './middleware/auth';
import Score from '../models/score';
import Audio from '../models/audio';
import AudioAnalyse from '../models/audio-analyse';
import User from '../models/user';
import mongoose, {} from 'mongoose';
import { IUserRequest } from './types';

const router = Router();

// register user
router.post('/api/user/register', async (req, res) => {
  const {email, password, remember} = req.body;
  const user = new User({email, password});
  try {
    const accessToken = user.generateAuthToken(remember);
    await user.save();
    return res.status(200).send({user, accessToken});
  } catch(err) {
    return res.status(400).send({err: err.message});
  }
})
// login user
router.post('/api/user/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = user.generateAuthToken(req.body.remember);
    return res.status(200).send({user, accessToken: token});
  } catch (err) {
    return res.status(400).send({err: err.message});
  }
});

router.get('/api/user/me', userAuth, async (req: IUserRequest, res) => {
  try {
    return res.status(200).send({
      user: req.user,
      accessToken: req.token
    });
  } catch (err) {
    return res.status(401).send({err: err.message});
  }
});

router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(400).send('no users at all');
    } else {
      return res.status(200).send(users)
    }
  } catch (err) {
    return res.status(401).send({err: err.message});
  }
})

export default router;

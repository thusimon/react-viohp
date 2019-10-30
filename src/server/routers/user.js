const express = require('express');
const router = new express.Router();
//const auth = require('./middleware/auth');
const User = require('../models/user');

router.get('/api/user/me',  async (req, res) => {
  try {
    return res.status(200).send({email:'test@lu.com'});
  } catch (err) {
    return res.status(400).send(err.toString());
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
    return res.status(401).send('error when getting users ' + err.message);
  }
})

module.exports = router;
//const jwt = require('jsonwebtoken');
//const User = require('../../models/user');
/*
const auth = async function (req, res, next) {

  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const user = await User.findOne({_id:decoded.id, 'tokens.token': token});
    if (!user) {
      throw new Error('please authenticate');
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send('please authenticate');
  }

  next();
}

module.exports = auth;
*/
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const auth = async (req, res, next) => {
  try {
    const authorizationHeader = req.header('Authorization') || '';
    const token = authorizationHeader.replace('Bearer', '').trim();
    if (!token) {
      throw new Error('please authenticate');
    }
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    console.log('in auth middleware', decoded);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error('please authenticate');
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send({err: err.message});
  }

  next();
}

module.exports = auth;

const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const auth = async (req, res, next) => {
  try {
    const authorizationHeader = req.header('Authorization') || '';
    const token = authorizationHeader.replace('Bearer', '').trim();
    if (!token) {
      throw new Error('no token in header, please authenticate');
    }
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const exp = decoded.exp * 1000 // decoded exp is in seconds
    if (exp < Date.now()) {
      throw new Error('token expired, please authenticate');
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error('can not find user, please authenticate');
    }
    req.token = token;
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).send({err: err.message});
  }
}

module.exports = auth;

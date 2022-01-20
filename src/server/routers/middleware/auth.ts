import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../../models/user';
import { AuthException } from './authException';

export const auth = async (req) => {
  const authorizationHeader = req.header('Authorization') || '';
  const token = authorizationHeader.replace('Bearer', '').trim();
  return await authInternal(token);
};

export const authInternal = async (token) => {
  if (!token) {
    throw new AuthException('no token in header, please authenticate');
  }
  const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY) as JwtPayload;
  const exp = decoded.exp * 1000 // decoded exp is in seconds
  if (exp < Date.now()) {
    throw new AuthException('token expired, please authenticate');
  }
  const user = await User.findById(decoded.id, '-password');
  if (!user) {
    throw new AuthException('can not find user, please authenticate');
  }
  return {user, token};
};

export const userAuth = async (req, res, next) => {
  try {
    const {user, token} = await auth(req);
    req.token = token;
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).send({err: err.message});
  }
};

export const guestAuth = async (req, res, next) => {
  try {
    const {user, token} = await auth(req);
    req.token = token;
    req.user = user;
    return next();
  } catch (err) {
    if (err.name=='VH_AUTH_ERR') {
      // return the guest user
      const guest = await User.collection.findOne({email: 'Guest'});
      req.user = guest;
      return next();
    }
    return res.status(401).send({err: err.message});
  }
};

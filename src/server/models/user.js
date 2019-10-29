const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenSchema = require('./token');

const activateTimeout = 60*60*24*7; //1 week
const activateLongTimeout = activateTimeout*12; //12 weeks, 3 month 

// mongoose use model name, convert to lowercase and pluralize it
// so User will go to collection users
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)){
        throw new Error('Invalid Email')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    validate(value) {
      if(value.toLowerCase().includes('password')){
        throw new Error('password should NOT contain "password"');
      }
    }
  },
  status: {
    type: Number //0 not activated, 1 activated
  },
  tokens: {
    type: [tokenSchema],
    default: []
  },
  avatar: {
    type: Buffer
  }
}, {
  timestamps:true
});


userSchema.methods.generateAuthToken = function() {
  const user = this;
  const token = jwt.sign({id: user._id.toString()}, process.env.JWT_PRIVATE_KEY);
  return token;
}

userSchema.methods.generateActivationToken = function() {
  const user = this;
  const token = jwt.sign({id: user._id.toString()}, process.env.JWT_PRIVATE_KEY);
  return token;
}

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.tokens;
  delete user.avatar;
  return user;
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email});
  if (!user) {
    throw new Error('unable to login');
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('unable to login');
  }
  return user;
}

userSchema.statics.activateUser = async (token) => {
  const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  if (Date.now()/1000 > decoded.iat + activateTimeout) {
    throw new Error('activate timeout, please ask for new activation code');
  }
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new Error('no such user');
  }
  user.status = 1;
  return await user.save();
}

userSchema.pre('save', async function(next) {
  const user = this; //this is binded to the document itself
  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre('remove', async function(next) {
  const user = this;
  await Task.deleteMany({owner: user._id});
  next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
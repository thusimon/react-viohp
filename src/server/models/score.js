const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String
  },
  signature: {
    type: String
  },
  scale: {
    type: String
  },
  notes: {
    type: Array
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  order: {
    type: Number
  }
}, {
  timestamps:true
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;

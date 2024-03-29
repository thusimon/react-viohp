import mongoose, { Schema } from 'mongoose';

const audioAnalyseSchema = new Schema({
  sampleRate: {
    type: Number,
  },
  analyzeFrames: {
    type: Array,
  },
  prepareTime: {
    type: Number
  },
  analyzeIncTime: {
    type: Number
  },
  noteBaseTime: {
    type: Number
  },
  scoreTitle: {
    type: String
  },
  scoreId: {
    type: Schema.Types.ObjectId
  },
  userId: {
    type: Schema.Types.ObjectId
  },
  createdAt: Number,
  updatedAt: Number
}, {
  timestamps:true
});

const AudioAnalyse = mongoose.model('AudioAnalyse', audioAnalyseSchema);

export default AudioAnalyse;

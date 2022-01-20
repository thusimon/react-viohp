import mongoose, {Schema} from 'mongoose';

const audioSchema = new Schema({
  title: {
    type: String,
  },
  scoreId: {
    type: String,
  },
  sampleRate: {
    type: Number
  },
  bin: {
    type: Buffer
  }
}, {
  timestamps:true
});

const Audio = mongoose.model('Audio', audioSchema);

export default Audio;

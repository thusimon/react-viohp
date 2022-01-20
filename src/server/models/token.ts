import { Schema } from 'mongoose';

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true
  }
});

export default tokenSchema;

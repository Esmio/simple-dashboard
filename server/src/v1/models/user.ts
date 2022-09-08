import mongoose from 'mongoose';
import { schemaOptions } from './modelOptions';

export interface IUser {
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  schemaOptions
);

export default mongoose.model('User', userSchema);

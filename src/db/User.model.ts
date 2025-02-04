import { Schema, model, Document } from 'mongoose';
import { IUserDomain } from '../typings/user';

interface IUserDocument extends IUserDomain, Document {}

const userSchema = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
});

const User = model<IUserDocument>('User', userSchema);
export { User, IUserDocument };

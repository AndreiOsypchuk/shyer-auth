import mongoose from 'mongoose';
import { stringValidator, emailValidator } from './validators';
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, validate: stringValidator },
  lastName: { type: String, required: true, validate: stringValidator },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: emailValidator,
  },
  verified: { type: Boolean, default: false },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

type UserSchema = {
  firstName: string;
  lastName: string;
  email: string;
  verified: boolean;
  password: string;
  createdAt: string;
};

userSchema.virtual('info').get(function getUserInfo(this: UserSchema) {
  return {
    name: `${this.firstName} ${this.lastName}`,
    verified: this.verified,
    createdAt: this.createdAt,
  };
});

export const User = mongoose.model('User', userSchema);

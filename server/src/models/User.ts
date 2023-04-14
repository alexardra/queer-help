import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { IUserDocument } from '../interfaces/user';

const UserSchema: Schema<IUserDocument> = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide email address'],
      validate: [validator.isEmail, 'Please provide valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      select: false,
      minlength: 6,
    },
    firstname: {
      type: String,
      required: [true, 'Please provide user name'],
      minlength: 3,
      maxlength: 50,
    },
    lastname: {
      type: String,
      required: [true, 'Please provide user name'],
      minlength: 3,
      maxlength: 50,
    },
    referenceLinks: {
      type: [
        {
          type: String,
          required: true,
        },
      ],
      validate: [
        (links: string[]) => links.length > 0,
        'Please provide at least one reference link for verification purposes',
      ],
    },
    personalNumber: {
      type: Number,
      required: [
        true,
        'Please provide personal number for verification purposes',
      ],
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.checkPassword = async function (passwordToCheck: string) {
  return await bcrypt.compare(passwordToCheck, this.password);
};

export default mongoose.model<IUserDocument>('User', UserSchema);

import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import config from '../config';
import { IAdminDocument } from '../interfaces/personas';
import { encrypt, encryptCompare } from '../utils';

const AdminSchema: Schema<IAdminDocument> = new Schema(
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
  },
  {
    timestamps: true,
  },
);

AdminSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await encrypt(this.password, {
    rounds: Number(config.genSaltRounds),
  });
});

AdminSchema.methods.checkPassword = async function (passwordToCheck: string) {
  return await encryptCompare(passwordToCheck, this.password);
};

export default mongoose.model<IAdminDocument>('Admin', AdminSchema);

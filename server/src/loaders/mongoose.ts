import mongoose from 'mongoose';
import config from '../config';

export default async () => {
  try {
    const connection = await mongoose.connect(config.databaseURL);
    return connection;
  } catch (e) {
    console.log(`Could not connect to the database ${e}`);
    process.exit(1);
  }
};

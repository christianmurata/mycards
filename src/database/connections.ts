import mongoose from 'mongoose';

const mongoConnection = () => {
  const url: string = process.env.MONGO_URI || 'mongodb://localhost:27017/mycards';
  return mongoose.connect(url);
};

export { mongoConnection };
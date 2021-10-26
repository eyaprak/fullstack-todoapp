const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectionString = process.env.MONGODB_CONNECTIN_STRING;

const connectDB = async () => {
  await mongoose.connect(connectionString).then(() => {
    console.log('MongoDB connected');
  });
};

module.exports = connectDB;

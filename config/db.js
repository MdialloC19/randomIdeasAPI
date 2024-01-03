const mongoose = require('mongoose');

/**
 * Establishes a connection to the MongoDB database.
 * @function connectDB
 * @returns {Promise<void>} A promise that resolves after connecting to the database.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

mongoose.set('strictQuery', true);

module.exports = connectDB;

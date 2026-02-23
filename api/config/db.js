const mongoose = require('mongoose');

// Cache the connection to prevent unnecessary re-connects
let isConnecting = false;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  if (isConnecting) return;

  try {
    if (!process.env.MONGO_URI) {
      console.warn('⚠️ MONGO_URI is missing from environment variables.');
      return;
    }

    isConnecting = true;
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Fail fast if IP is blocked
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    // Do not re-throw here to prevent process crashes in serverless
  } finally {
    isConnecting = false;
  }
};

module.exports = connectDB;

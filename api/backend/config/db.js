const mongoose = require('mongoose');

// Cache the connection to prevent unnecessary re-connects
let isConnecting = false;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  if (isConnecting) return;

  const dbUri = process.env.MONGODB_URI || process.env.MONGO_URI;

  try {
    if (!dbUri) {
      console.warn('⚠️ MongoDB connection URI is missing from environment variables (tried MONGODB_URI and MONGO_URI).');
      return;
    }

    isConnecting = true;
    const conn = await mongoose.connect(dbUri, {
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

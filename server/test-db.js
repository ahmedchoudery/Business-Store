const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Success! MongoDB is connected.');
        console.log(`Connected to database: ${mongoose.connection.name}`);
        console.log(`Host: ${mongoose.connection.host}`);

        // Check if we can reach the collection
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('Available collections:', collections.map(c => c.name).join(', '));

        await mongoose.disconnect();
        console.log('Disconnected.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Connection failed:', err.message);
        process.exit(1);
    }
}

testConnection();

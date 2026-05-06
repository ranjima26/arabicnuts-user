
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

async function testConnection() {
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined');
    process.exit(1);
  }
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully to MongoDB');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    await mongoose.disconnect();
  } catch (error) {
    console.error('Connection failed:', error);
  }
}

testConnection();

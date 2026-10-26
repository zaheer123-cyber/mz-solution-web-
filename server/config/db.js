import mongoose from 'mongoose';

let memoryServer = null;

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  const uri = process.env.MONGODB_URI;

  try {
    if (uri) {
      console.log(`Connecting to MongoDB at: ${uri.replace(/\/\/.*@/, '//<credentials>@')}`);
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 4000
      });
      console.log('✅ Connected to MongoDB successfully.');
      return;
    }
    throw new Error('MONGODB_URI not provided in environment variables.');
  } catch (error) {
    console.warn(`⚠️ Primary MongoDB connection failed (${error.message}).`);
    
    // In development or test, fall back to in-memory MongoDB so the app runs smoothly out-of-the-box
    if (process.env.NODE_ENV !== 'production') {
      try {
        console.log('🔄 Initializing in-memory MongoDB instance for local development...');
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        memoryServer = await MongoMemoryServer.create();
        const memoryUri = memoryServer.getUri();
        await mongoose.connect(memoryUri);
        console.log(`✅ In-memory MongoDB running at: ${memoryUri}`);
        console.log('💡 Note: Set MONGODB_URI in .env to persist to MongoDB Atlas or local MongoDB service.');
        return;
      } catch (memError) {
        console.error('❌ Failed to start in-memory MongoDB:', memError.message);
        throw memError;
      }
    } else {
      console.error('❌ Cannot run in production without a valid MONGODB_URI.');
      process.exit(1);
    }
  }
};

export const closeDB = async () => {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
  }
};

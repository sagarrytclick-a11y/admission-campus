import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

interface CachedMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: CachedMongoose | undefined;
}

const cached: CachedMongoose = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not set. Configure it in your production environment variables."
    );
  }

  if (cached.conn) {
    // Reuse only healthy connections
    if (mongoose.connection.readyState === 1) {
      return cached.conn;
    }
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000,
        maxPoolSize: 10,
      })
      .catch((error) => {
        // Allow the next request to retry with a fresh connection attempt
        cached.promise = null;
        cached.conn = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    cached.conn = null;
    throw error;
  }
}

export default connectDB;

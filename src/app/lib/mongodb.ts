import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || ''; // Set your MongoDB connection URI
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so the client is not created multiple times
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, it's best to create a new client for every invocation
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export async function connectToDatabase() {
    try {
      const client = await clientPromise;
      const db = client.db();
      return { client, db };
    } catch (error) {
      console.error('Connection error:', error);
      throw new Error('Could not connect to database');
    }
  }

export default clientPromise;
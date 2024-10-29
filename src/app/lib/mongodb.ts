import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Add MongoDB URI to .env.local');
}

let client: MongoClient | null = null;
const clientPromise: Promise<MongoClient> = global._mongoClientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect();
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
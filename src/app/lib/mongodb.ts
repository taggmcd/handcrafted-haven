import { MongoClient } from 'mongodb';

// Retrieve the MongoDB URI from environment variables
const uri = process.env.MONGODB_URI;

// Define the connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Create a MongoDB client
const client = new MongoClient(uri, options);

// Function to connect to the database
export async function connectToDatabase() {
    try {
        // Connect to the MongoDB server
        await client.connect();
        // Return the client and database instance
        const db = client.db(); // Use your database name if needed
        return { client, db };
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Rethrow the error for further handling
    }
}

// Function to close the database connection
export async function closeDatabaseConnection() {
    try {
        await client.close();
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
    }
}

import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://wdd430-user:QM3fNuWl8yuJqqHZ@cluster0.xcsmnna.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

async function updateRatings() {
  try {
    await client.connect();
    const database = client.db('yourDatabaseName'); // Replace with your database name
    const products = database.collection('products');

    const result = await products.updateMany(
      {},
      { $set: { ratings: [4, 3, 5] } } // Example ratings array
    );
    console.log('Products Updated:', result.modifiedCount);
  } finally {
    await client.close();
  }
}

updateRatings().catch(console.error);

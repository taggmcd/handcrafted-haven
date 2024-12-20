import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://wdd430-user:QM3fNuWl8yuJqqHZ@cluster0.xcsmnna.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

async function fixRatings() {
  try {
    await client.connect();
    const database = client.db('yourDatabaseName'); // Replace with your actual database name
    const products = database.collection('products');

    const productsToUpdate = await products.find({}).toArray();

    for (const product of productsToUpdate) {
      let updatedRatings: number[] = [];
      
      if (typeof product.ratings === 'string') {
        updatedRatings = product.ratings
          .replace(/[\[\]]/g, '') // Remove brackets
          .split(',')
          .map(Number);           // Convert to numbers
      } else if (Array.isArray(product.ratings)) {
        updatedRatings = product.ratings;
      } else {
        updatedRatings = [4, 3, 5]; // Default ratings if none exist
      }

      await products.updateOne(
        { _id: product._id },
        { $set: { ratings: updatedRatings } }
      );
    }

    console.log('Products Updated:', productsToUpdate.length);
  } finally {
    await client.close();
  }
}

fixRatings().catch(console.error);

import { MongoClient, ObjectId } from 'mongodb';

const uri = 'mongodb+srv://wdd430-user:QM3fNuWl8yuJqqHZ@cluster0.xcsmnna.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

interface Product {
  _id: ObjectId;
  ratings: string | number[]; // Allow ratings to be either a string or an array of numbers
}

async function fixRatings() {
  try {
    await client.connect();
    const database = client.db('yourDatabaseName'); // Replace with your actual database name
    const products = database.collection<Product>('products');

    // Find products where ratings is stored as a string
    const productsToUpdate: Product[] = await products.find({ ratings: { $type: 'string' } }).toArray();

    for (const product of productsToUpdate) {
      let updatedRatings: number[];

      // Ensure product.ratings is a string before processing
      if (typeof product.ratings === 'string') {
        updatedRatings = product.ratings
          .replace(/[\[\]]/g, '') // Remove square brackets
          .split(',')             // Split by commas
          .map((rating: string) => Number(rating.trim())); // Convert each item to a number
      } else {
        updatedRatings = product.ratings; // Use the existing array if it's already in the correct format
      }

      // Update product with the converted ratings array
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

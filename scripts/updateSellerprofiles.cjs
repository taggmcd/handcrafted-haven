const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb+srv://wdd430-user:QM3fNuWl8yuJqqHZ@cluster0.xcsmnna.mongodb.net/yourDatabaseName?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your MongoDB URI
const client = new MongoClient(uri);

async function updateSellerProfiles() {
  try {
    await client.connect();
    const database = client.db('yourDatabseName'); // Replace with your actual database name
    const sellerProfiles = database.collection('sellerProfiles');

    const result = await sellerProfiles.updateMany(
      {}, // Update all documents in the collection
      {
        $set: {
          products: [
            {
              _id: new ObjectId(),
              name: "Sample Product",
              description: "Default product description",
              price: 0,
              category: "Sample Category",
              imageUrl: "https://example.com/sample-image.jpg",
              ratings: [5, 4, 5]
            }
          ]
        }
      }
    );

    console.log('Profiles Updated:', result.modifiedCount);
  } finally {
    await client.close();
  }
}

updateSellerProfiles().catch(console.error);

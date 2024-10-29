const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb+srv://wdd430-user:QM3fNuWl8yuJqqHZ@cluster0.xcsmnna.mongodb.net/yourDatabaseName?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your actual MongoDB URI
const client = new MongoClient(uri);

async function seedSellerProfiles() {
  try {
    await client.connect();
    const database = client.db('yourDatabaseName'); // Replace with your database name
    const sellerProfiles = database.collection('sellerProfiles');

    // Delete existing documents
    await sellerProfiles.deleteMany({});

    // Insert new seller profiles with the provided structure
    const profiles = [
      {
        _id: new ObjectId("6711a2c3b49d6382250a9178"),
        name: "Earthen Creations",
        description: "Pottery and Earthware.",
        story: "Two brothers working with their hands.",
        products: [
          {
            _id: new ObjectId(),
            name: "Rustic Clay Mug",
            description: "Handcrafted clay mug with a natural finish.",
            price: 12.99,
            category: "Pottery",
            imageUrl: "https://example.com/images/rustic_clay_mug.jpg",
            ratings: [4, 5, 3]
          }
        ]
      },
      {
        _id: new ObjectId("6712cc4a84c82a1342abdbe9"),
        name: "Artisan Creations",
        description: "Handcrafted jewelry and accessories",
        story: "A family-owned business specializing in unique, handcrafted pieces.",
        products: [
          {
            _id: new ObjectId(),
            name: "Silver Leaf Pendant",
            description: "Elegant pendant crafted from sterling silver.",
            price: 45.00,
            category: "Jewelry",
            imageUrl: "https://example.com/images/silver_leaf_pendant.jpg",
            ratings: [5, 4, 4]
          }
        ]
      },
      {
        _id: new ObjectId("6712cc4a84c82a1342abcdf3"),
        name: "The Woodworking Studio",
        description: "Custom wood furniture and decor",
        story: "Crafting high-quality wooden items with a touch of elegance.",
        products: [
          {
            _id: new ObjectId(),
            name: "Oak Cutting Board",
            description: "Durable cutting board made from premium oak wood.",
            price: 30.00,
            category: "Woodwork",
            imageUrl: "https://example.com/images/oak_cutting_board.jpg",
            ratings: [4, 5, 5]
          }
        ]
      },
      {
        _id: new ObjectId("6712cc4a84c82a1342abcc55"),
        name: "Textile Treasures",
        description: "Handwoven textiles and fabrics",
        story: "Bringing traditional weaving techniques to modern designs.",
        products: [
          {
            _id: new ObjectId(),
            name: "Handwoven Scarf",
            description: "A cozy, handwoven scarf made from soft fibers.",
            price: 25.00,
            category: "Textiles",
            imageUrl: "https://example.com/images/handwoven_scarf.jpg",
            ratings: [5, 5, 4]
          }
        ]
      },
      {
        _id: new ObjectId("6712cc4a84c82a1342abd167"),
        name: "Gourmet Goodies",
        description: "Artisanal foods and treats",
        story: "Creating delectable treats with the finest ingredients.",
        products: [
          {
            _id: new ObjectId(),
            name: "Lavender Honey",
            description: "Organic honey infused with a hint of lavender.",
            price: 18.50,
            category: "Food",
            imageUrl: "https://example.com/images/lavender_honey.jpg",
            ratings: [4, 4, 4]
          }
        ]
      },
      {
        _id: new ObjectId("6713a9b5c87d5a1e12345678"),
        name: "Creative Ceramics",
        description: "Unique and colorful ceramic pieces",
        story: "Crafting vibrant ceramics to add color to your space.",
        products: [
          {
            _id: new ObjectId(),
            name: "Colorful Vase",
            description: "A vibrant ceramic vase to liven up any room.",
            price: 35.00,
            category: "Ceramics",
            imageUrl: "https://example.com/images/colorful_vase.jpg",
            ratings: [5, 4, 5]
          }
        ]
      }
    ];

    const result = await sellerProfiles.insertMany(profiles);
    console.log('Inserted Profiles:', result.insertedCount);
  } finally {
    await client.close();
  }
}

seedSellerProfiles().catch(console.error);

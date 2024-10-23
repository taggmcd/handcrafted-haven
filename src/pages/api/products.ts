import { NextApiRequest, NextApiResponse } from 'next';

const products = [
  { id: '6713ddd084c82a1342abdbec', name: 'Product Name', description: 'Detailed description of the product', price: 29.99, category: 'Category Name', imageUrl: 'http://example.com/image.jpg' },
  { id: '6713de0e84c82a1342abdbee', name: 'Handcrafted Ceramic Mug', description: 'A unique ceramic mug, handcrafted with intricate designs.', price: 25, category: 'Drinkware', imageUrl: 'http://example.com/ceramic_mug.jpg' },
  { id: '6713de2584c82a1342abdbf0', name: 'Leather Keychain', description: 'Durable leather keychain, hand-stitched and customizable.', price: 15, category: 'Accessories', imageUrl: 'http://example.com/leather_keychain.jpg' },
  { id: '6713de3984c82a1342abdbf2', name: 'Knitted Scarf', description: 'Cozy, handmade scarf knitted with high-quality yarn.', price: 40, category: 'Apparel', imageUrl: 'http://example.com/knitted_scarf.jpg' },
  { id: '6713de5284c82a1342abdbf4', name: 'Wooden Picture Frame', description: 'Elegant wooden picture frame, crafted from reclaimed wood.', price: 30, category: 'Home Decor', imageUrl: 'http://example.com/wooden_picture_frame.jpg' },
  { id: '6713de6a84c82a1342abdbf6', name: 'Hand-Poured Soy Candle', description: 'Eco-friendly soy candle with a calming lavender scent.', price: 18, category: 'Home Fragrance', imageUrl: 'http://example.com/soy_candle.jpg' }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(products);
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

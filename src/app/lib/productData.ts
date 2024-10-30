import { connectToDatabase } from '@/app/lib/mongodb';

import { ObjectId } from 'mongodb';

export async function fetchProductName(productId: string): Promise<string> {

  if (!ObjectId.isValid(productId)) {
    throw new Error('Invalid product ID');
  }

  const { db } = await connectToDatabase();
  
  const id = new ObjectId(productId);

  const product = await db.collection('products').findOne({ _id: id });
  if (!product) {
    throw new Error('Product not found');
  }

  return product.name;
}
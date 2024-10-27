import clientPromise from '@/app/lib/mongodb';

import { ObjectId } from 'mongodb';

export async function fetchProductName(productId: string): Promise<string> {

  if (!ObjectId.isValid(productId)) {
    throw new Error('Invalid product ID');
  }

  const client = await clientPromise;
  const db = client.db('yourDatabaseName'); // Substitua pelo nome correto do banco

  const id = new ObjectId(productId);

  const product = await db.collection('products').findOne({ _id: id });
  if (!product) {
    throw new Error('Product not found');
  }

  return product.name;
}
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: Request) {
  try {
    const id  = req.url.split('/')[5];
    // const id  = "6713de5284c82a1342abdbf4";
    console.log(id);
    const { db } = await connectToDatabase();
    const product = await db.collection('products').find({_id: new ObjectId(id)}).toArray();
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/products/route:', error);
    return NextResponse.json({ error: 'Error fetching Product' }, { status: 500 });
  }
}
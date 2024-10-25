// src/app/api/reviews/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { getToken } from 'next-auth/jwt';


export async function POST(req: Request) {
  const { product_id, rating, comment } = await req.json();
  console.log('Creating review:', { product_id, rating, comment });

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user_id = token.id;

  try {
    const client = await clientPromise;
    const db = client.db('yourDatabaseName'); // Substitua pelo nome correto do banco

    const newReview = {
      user_id,
      product_id,
      rating,
      comment,
      created_at: new Date(),
    };

    const result = await db.collection('reviews').insertOne(newReview);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Failed to create review:', error);
    return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
}
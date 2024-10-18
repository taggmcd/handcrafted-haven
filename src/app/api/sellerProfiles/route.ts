import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const sellerProfiles = await db.collection('sellerProfiles').find({}).toArray();
    return NextResponse.json(sellerProfiles, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/sellerProfiles/route:', error);
    return NextResponse.json({ error: 'Error fetching seller profiles' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const data = await req.json();
    const result = await db.collection('sellerProfiles').insertOne(data);
    const insertedDocument = await db.collection('sellerProfiles').findOne({ _id: result.insertedId });
    return NextResponse.json(insertedDocument, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/sellerProfiles/route:', error);
    return NextResponse.json({ error: 'Error creating seller profile' }, { status: 500 });
  }
}

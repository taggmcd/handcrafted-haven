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
    console.log('Received data:', data);
    const result = await db.collection('sellerProfiles').insertOne(data);
    console.log('Insert result:', result);
    // return NextResponse.json(result.ops[0], { status: 201 });
    return NextResponse.json({ id: result.insertedId, ...data }, { status: 201 });
  } catch (error) {
    const errorMessage = (error as Error).message || 'Error creating seller profile';
    console.error('Error in POST /api/sellerProfiles/route:', error);
    console.error('Error details:', errorMessage);
    return NextResponse.json({ error: 'Error creating seller profile' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const sellerProfiles = await db.collection('sellerProfiles').find({}).toArray();
    console.log('Fetched profiles:', sellerProfiles); // Add this line
    return NextResponse.json(sellerProfiles, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/sellerProfiles:', error);
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
    console.error('Error in POST /api/sellerProfiles:', error);
    return NextResponse.json({ error: 'Error creating seller profile' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { db } = await connectToDatabase();
    const { companyId } = await req.json(); // assuming companyId is sent in the body
    const result = await db.collection('sellerProfiles').deleteOne({ _id: new ObjectId(companyId) });
    if (result.deletedCount === 1) {
      return NextResponse.json({ message: 'Profile deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error in DELETE /api/sellerProfiles:', error);
    return NextResponse.json({ error: 'Failed to delete profile' }, { status: 500 });
  }
}

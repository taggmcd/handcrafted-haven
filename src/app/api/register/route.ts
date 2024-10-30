// app/api/register/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function POST(req: Request) {
  try {
    // console.log('Creating user...');
    const { db } = await connectToDatabase();
    const collection = db.collection('users');

    const body = await req.json();
    // console.log('Request body:', body);

    if (!body.email || !body.password || !body.name) {
        // console.log('Missing required fields');
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    body.password = await bcrypt.hash(body.password, 10);
    // console.log('Hashed password:', body.password);

    const newUser = await collection.insertOne(body);
    // console.log('New user:', newUser);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown Error' }, { status: 500 });
  }
}

export function OPTIONS() {
    return NextResponse.json({}, { status: 204, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } });
  }
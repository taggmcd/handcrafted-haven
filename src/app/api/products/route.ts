import { NextResponse } from 'next/server';
import connectDB from '../../lib/connectDB';
import { getPaginatedListings } from '../../lib/listingData'; // Adjust the import path as necessary

// This function handles the GET request
export async function GET(request: Request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 4;

  try {
    const paginatedListings = await getPaginatedListings(page, limit);
    return NextResponse.json(paginatedListings);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching listings', error }, { status: 500 });
  }
}
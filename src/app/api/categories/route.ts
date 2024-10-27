import { NextResponse } from 'next/server';
import Product from '../../models/Product'; // Adjust the import path

// Function to get unique categories
const getUniqueCategories = async () => {
  try {
    const categories = await Product.distinct('category');
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Error fetching categories');
  }
};

// Named export for the GET method
export async function GET() {
  try {
    const categories = await getUniqueCategories();
    return NextResponse.json(categories); // Send JSON response with unique categories
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

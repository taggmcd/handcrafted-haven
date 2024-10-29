import Product from '../models/Product';

export async function getPaginatedProducts (page: number, limit: number) {
  const skip = (page - 1) * limit;
  const products = await Product.find()
    .skip(skip)
    .limit(limit)
    .exec();

  const totalCount = await Product.countDocuments();
  const totalPages = Math.ceil(totalCount / limit);
  console.log('Fetched Products from DB:', products); // Log fetched products

  return {
    products,
    totalCount,
    totalPages,
    currentPage: page,
  };
};

// Get all the categories
export const getUniqueCategories = async () => {
  try {
    const categories = await Product.distinct('category');
    console.log('Unique Categories:', categories);
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

// validate the submited data and save it to the database

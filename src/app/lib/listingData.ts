import Listing from '../models/Product';

export async function getPaginatedListings (page: number, limit: number) {
  const skip = (page - 1) * limit;
  const listings = await Listing.find()
    .skip(skip)
    .limit(limit)
    .exec();

  const totalCount = await Listing.countDocuments();
  const totalPages = Math.ceil(totalCount / limit);

  return {
    listings,
    totalCount,
    totalPages,
    currentPage: page,
  };
};

// validate the submited data and save it to the database

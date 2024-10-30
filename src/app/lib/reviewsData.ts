import { connectToDatabase } from '@/app/lib/mongodb';

const ITEMS_PER_PAGE = 4;

export async function fetchFilteredReviews(query: string, productId: string, currentPage: number) {
    try {
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;

        // console.log('Query:', query);
        // console.log('Product ID:', productId);
        // console.log('Current Page:', currentPage);
        // console.log('Offset:', offset);

        const { db } = await connectToDatabase();

        const aggregation = [
            {
                $match: {
                    product_id: productId, // Filtra pelo product_id fornecido como string
                    $or: [
                        { rating: isNaN(Number(query)) ? null : Number(query) }, // Se query for numérico, filtra por rating
                        { comment: { $regex: query, $options: 'i' } }, // Filtra por comentário usando regex
                    ],
                },
            },
            
            {
                $addFields: {
                    userObjectId: {
                      $cond: {
                        if: { $regexMatch: { input: "$user_id", regex: /^[0-9a-fA-F]{24}$/ } },
                        then: { $toObjectId: "$user_id" },
                        else: null
                      }
                    }
                  }
            },

            {
                $lookup: {
                    from: 'users', // Coleção de usuários
                    localField: 'userObjectId', // user_id na coleção reviews
                    foreignField: '_id', // _id na coleção users
                    as: 'user', // Nome da junção dos dados do usuário
                },
            },
            
            {
                // $unwind: {
                //     path: '$user',
                //     preserveNullAndEmptyArrays: true, // Permite que reviews sem usuários ainda apareçam
                // },
                $unwind: '$user'
            },
            
            {
                $sort: { created_at: -1 }, // Ordena por data de criação descendente
            },
            {
                $skip: offset, // Paginação
            },
            {
                $limit: ITEMS_PER_PAGE, // Limita a quantidade de reviews por página
            },
            {
                $project: {
                    _id: 0,
                    product_id: 1,
                    rating: 1,
                    comment: 1,
                    created_at: 1,
                    user: {
                        _id: 1,
                        name: 1,
                        email: 1,
                    },
                },
            },
        ];

        // Executa a agregação
        const result = await db.collection('reviews').aggregate(aggregation).toArray();

        return result;

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch filtered reviews.');
    }
}

export async function fetchReviewsPages(query: string, productId: string) {
    try {
        const { db } = await connectToDatabase();

        const countAggregation = [
            {
                $match: {
                    product_id: productId, // Filtra por product_id
                    $or: [
                        { rating: isNaN(Number(query)) ? null : Number(query) }, // Filtro por rating se for número
                        { comment: { $regex: query, $options: 'i' } }, // Filtro por comentário usando regex
                    ],
                },
            },
            {
                $count: 'totalReviews', // Conta o número total de revisões correspondentes
            },
        ];

        const result = await db.collection('reviews').aggregate(countAggregation).toArray();

        const totalReviews = result.length > 0 ? result[0].totalReviews : 0;

        const totalPages = Math.ceil(totalReviews / ITEMS_PER_PAGE); // Calcula o total de páginas
        return totalPages;

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the total number of pages.');
    }
}

export async function fetchReviewsRatingAverage(productId: string): Promise<{ averageRating: number, totalRatings: number, sumRatings: number }> {
    try {
        const { db } = await connectToDatabase();

        // console.log('Product ID:', productId);

        // Verifique os documentos antes da agregação
        // const reviews = await db.collection('reviews').find({ product_id: productId }).toArray();
        // console.log('Reviews for Product:', reviews);

        const averageAggregation = [
            {
                $match: {
                    product_id: productId, // Filtra por product_id
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' },
                    totalRatings: { $sum: 1 },
                    sumRatings: { $sum: '$rating' },
                },
            },
        ];

        const result = await db.collection('reviews').aggregate(averageAggregation).toArray();

        // console.log('Aggregation Result:', result);

        if (result.length > 0) {
            const { averageRating, totalRatings, sumRatings } = result[0];
            // console.log(`Calculated Average Rating: ${averageRating}`);
            // console.log(`Calculated Total Ratings: ${totalRatings}`);
            // console.log(`Calculated Sum of Ratings: ${sumRatings}`);
            return { averageRating, totalRatings, sumRatings };
        } else {
            return { averageRating: 0, totalRatings: 0, sumRatings: 0 };
        }

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the average of reviews ratings.');
    }
}
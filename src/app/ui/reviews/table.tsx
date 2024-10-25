import { fetchFilteredReviews } from '@/app/lib/reviewsData';
import { formatDateToLocal } from '@/app/lib/utils';
import StarRating from './StarRating';
import React from 'react';

export default async function ReviewsTable({
  query,
  productId,
  currentPage,
}: {
  query: string;
  productId: string;
  currentPage: number;
}) {
  // console.log('ReviewsTable');
  // console.log('query', query);
  // console.log('productId', productId);
  // console.log('currentPage', currentPage);

  const reviews = await fetchFilteredReviews(query, productId, currentPage);
  // console.log('reviews', reviews);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {reviews?.map((review) => (
              <div
                key={review.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{review.comment}</p>
                    </div>
                    <p className="text-sm text-gray-500">{review.rating}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    {/* <p>{formatDateToLocal(review.created_at)}</p> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Rating
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Comment
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Author
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {reviews?.map((review) => (
                <tr
                  key={review.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <p>{review.rating}</p> */}
                      <StarRating rating={review.rating} />
                      </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {review.comment}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(review.created_at)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {review.user.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

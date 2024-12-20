// src/app/ui/reviews/create-form.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/ui/button';
import { roboto } from '@/app/ui/fonts';
import StarRatingInput from './StarRatingInput';


export default function Form({ 
  product_id,
  product_name
}: { 
  product_id: string;
  product_name: string
}) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    setErrorMessage(null);

    try {
        const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product_id, rating, comment }),
      });

      if (!response.ok) {
        throw new Error('Failed to create review');
      }

      router.push(`/reviews?productId=${product_id}`);	

    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsPending(false);
    }
  };

  const handleCancel = () => {
    router.back(); // Volta para a página anterior
  };

  return (
    <form onSubmit={handleSubmit} className=''>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Hidden Fields for product_id */}
        <input type="hidden" name="product_id" value={product_id} />
        <div className="flex w-full items-center justify-between">
          <h1 className={`${roboto.className} text-2xl text-gray-800`}>Add a Review for {product_name}</h1>
        </div>

        {/* Rating */}
        <div className="mb-4">
          <label htmlFor="rating" className="mb-2 block text-sm font-medium text-gray-900">
            Choose a rating
          </label>
          <StarRatingInput rating={rating} onRatingChange={setRating} />
        </div>

        {/* Comment */}
        <div className="mb-4">
          <label htmlFor="comment" className="mb-2 block text-sm font-medium text-gray-900">
            Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900 p-2"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex space-x-2 mt-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit Review'}
          </Button>

          <Button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cancel
          </Button>
        </div>
        
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </form>
  );
}
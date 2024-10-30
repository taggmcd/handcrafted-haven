// StarRating.tsx
import React from 'react';

interface StarRatingProps {
  rating: number; // The average rating as a number
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  // Round the rating to the nearest whole number for stars
  const roundedRating = Math.round(rating);

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <span key={index} className={index < roundedRating ? 'filled-star' : 'empty-star'}>
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;

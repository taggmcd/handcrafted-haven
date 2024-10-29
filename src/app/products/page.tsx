"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import StarRating from '@/app/ui/reviews/StarRating'; // Ensure correct import path
import styles from './Products.module.css';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  ratings: number[]; // Ensure ratings is an array of numbers
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      console.log('Fetched Products:', data);
      setProducts(data.products);
    };
    fetchProducts();
  }, []);

  const calculateAverageRating = (ratings: number[]): number => {
    if (!Array.isArray(ratings) || ratings.length === 0) return 0;
    const sum = ratings.reduce((a, b) => a + b, 0);
    return sum / ratings.length;
  };

  return (
    <div className={styles.container}>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className={styles.card}>
            <img src={product.imageUrl} alt={product.name} className={styles.image} />
            <div className={styles.details}>
              <h2 className={styles.title}>{product.name}</h2>
              <p className={styles.description}>{product.description}</p>
              <p className={styles.price}>Price: ${product.price}</p>
              <StarRating rating={Math.round(calculateAverageRating(product.ratings))} />
              <Link href={`/products/${product.id}`}>
                <span className={styles.link}>View Product</span>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default Products;

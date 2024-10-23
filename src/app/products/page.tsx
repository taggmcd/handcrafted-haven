"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Products.module.css';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

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

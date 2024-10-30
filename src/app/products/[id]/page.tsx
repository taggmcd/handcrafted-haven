"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  sellerId: string;
}

const ProductDetail = ({ params }: { params: { id: string } }) => {
  // const router = useRouter();
  // const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const id = params.id;
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        console.log('Fetched Product:', data);
        setProduct(data[0]);
      };

      fetchProduct();
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="mx-auto w-64 text-black">
      <img src={product.imageUrl} alt={product.name} style={{ width: '200px', height: '200px' }} />
      <h1>{product.name}</h1>
      <p>Description: {product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
    </div>
  );
};

export default ProductDetail;

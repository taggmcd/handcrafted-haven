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
  // const id  = router.query.id;
console.log(params.id);
  const [product, setProduct] = useState<Product | null>(null);

    const id = params.id;
  console.log(id);
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      };

      fetchProduct();
    }
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <img src={product.imageUrl} alt={product.name} style={{ width: '200px', height: '200px' }} />
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <Link href={`/seller/${product.sellerId}`}>More about the seller</Link>
    </div>
  );
};

export default ProductDetail;

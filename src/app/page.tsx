'use client'
import { useEffect, useState } from 'react';
import ProductList from "./ui/productList";
import ProductFilter from "./ui/productFilter";
export default function Home() {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState<string[]>([]);
  
    const fetchProducts = async (page: number) => {
      setLoading(true);
      const response = await fetch(`/api/products?page=${page}`);
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setLoading(false);
    };
    
    const fetchCategories = async () => {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data); // Assuming data is an array of categories

    };

    useEffect(() => {
      fetchProducts(page);
    }, [page]);

    useEffect(() => {
      fetchCategories();
    }, []);

  return (
    <>
      <ProductFilter categories={categories}/>
      {loading && <p>Loading Products...</p>}
      <ProductList products={products}/>

      
     
      <div>
        <button disabled={page <= 1} onClick={() => setPage((prev) => prev - 1)}>Previous</button>
        <span> Page {page} of {totalPages} </span>
        <button disabled={page >= totalPages} onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </>
  );
}
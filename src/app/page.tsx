'use client'
import { useEffect, useState } from 'react';
import ProductList from "./ui/productList";
import ProductFilter from "./ui/productFilter";
export default function Home() {

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
  
    const fetchProducts = async (page: number) => {
      setLoading(true);
      const response = await fetch(`/api/products?page=${page}`);
      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setLoading(false);
    };

    useEffect(() => {
      fetchProducts(page);
    }, [page]);

  return (
    <>
      <ProductFilter />
      {loading && <p className="bg-white text-center text-bold text-black text-2xl pt-10">Loading Products...</p>}
      <ProductList products={products}/>

      
     
      <div className='text-center bg-white text-black'>
        <button disabled={page <= 1} onClick={() => setPage((prev) => prev - 1)} className="underline hover:text-blue-500">Previous</button>
        <span> Page {page} of {totalPages} </span>
        <button className="underline hover:text-blue-500" disabled={page >= totalPages} onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </>
  );
}
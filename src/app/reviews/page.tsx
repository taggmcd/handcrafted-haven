import Link from 'next/link';
import Pagination from '@/app/ui/reviews/pagination';
// import Search from '@/app/ui/search';
import Table from '@/app/ui/reviews/table';
// import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { roboto } from '@/app/ui/fonts';
// import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
// import { Suspense } from 'react';
import { fetchReviewsPages } from '@/app/lib/reviewsData';
import { fetchProductName } from '@/app/lib/productData';

import { Button } from '@/app/ui/button'; // Certifique-se de importar o componente Button
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reviews',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    productId?: string;
    page?: string;
  };
}) {

  const query = searchParams?.query || '';
  const productId = searchParams?.productId || '';
  const currentPage = Number(searchParams?.page) || 1;

  if (!productId) {
    console.error('Product ID is required');
    return;
  }

  const productName = await fetchProductName(productId);
  const totalPages = await fetchReviewsPages(query, productId); 

  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-900">
      <div className="flex items-center justify-between px-4 py-6 h-10">
        <h1 className={`${roboto.className} text-2xl`}>Reviews for {productName}</h1>
        <Link href={`/reviews/create?productId=${productId}`}>
          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
            Add Review
          </Button>
        </Link>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* Componentes de busca ou ações adicionais */}
      </div>
      <Table query={query} currentPage={currentPage} productId={productId} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
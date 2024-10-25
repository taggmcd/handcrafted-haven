import Pagination from '@/app/ui/reviews/pagination';
// import Search from '@/app/ui/search';
import Table from '@/app/ui/reviews/table';
// import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { roboto } from '@/app/ui/fonts';
// import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
// import { Suspense } from 'react';
import { fetchReviewsPages } from '@/app/lib/reviewsData';
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

<<<<<<< HEAD
  // console.log('query', query);
  // console.log('productId', productId);
  // console.log('currentPage', currentPage);
=======
  console.log('query', query);
  console.log('productId', productId);
  console.log('currentPage', currentPage);
>>>>>>> 88765da0372620b93e037b5d20ddd359be07e060
  
  const totalPages = await fetchReviewsPages(query, productId);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${roboto.className} text-2xl`}>Reviews</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <Search placeholder="Search invoices..." /> */}
        {/* <CreateInvoice /> */}
      </div>
      {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}> */}
        <Table query={query} currentPage={currentPage} productId={productId} />
      {/* </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
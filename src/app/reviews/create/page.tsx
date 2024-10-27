import Form from '@/app/ui/reviews/create-form';
import { Metadata } from 'next';
import { fetchProductName } from '@/app/lib/productData';

export const metadata: Metadata = {
  title: 'Review Create',
};
 
export default async function Page( {
    searchParams,
  }: {
    searchParams?: {
      productId: string;
    };
  }){

  const product_id = searchParams?.productId || '';

  if (!product_id) {
    throw new Error('Product ID is required');
  }

  const productName = await fetchProductName(product_id);


  return (
    <main>
      <Form product_id={product_id} product_name={productName}/>
    </main>
  );
}
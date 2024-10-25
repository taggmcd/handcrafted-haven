import Form from '@/app/ui/reviews/create-form';
import { Metadata } from 'next';

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

  return (
    <main>
      <Form product_id={product_id} />
    </main>
  );
}
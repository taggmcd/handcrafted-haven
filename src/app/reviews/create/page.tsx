import Form from '@/app/ui/reviews/create-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preview Create',
};
 
export default async function Page( {
    searchParams,
  }: {
    searchParams?: {
      userId: string;
      productId: string;
    };
  }){
  const user_id = searchParams?.userId || '';
  const product_id = searchParams?.productId || '';

  return (
    <main>
      <Form user_id={ user_id} product_id={ product_id} />
    </main>
  );
}
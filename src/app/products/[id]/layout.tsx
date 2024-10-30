import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Details',
  description: 'Product page for Handcrafted Haven',
};

export default function ProductDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Products page for Handcrafted Haven',
};

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}

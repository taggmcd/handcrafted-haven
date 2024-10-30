import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seller Profile Create Page',
  description: 'Seller profile page for Handcrafted Haven',
};

export default function SellerCreateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
